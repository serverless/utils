'use strict';

const isPlainObject = require('type/plain-object/is');
const coerceNaturalNumber = require('type/natural-number/coerce');
const coerceTimeValue = require('type/time-value/coerce');
const toShortString = require('type/lib/to-short-string');
const ci = require('ci-info');
const configUtils = require('./config');

const configPropertyName = 'shownNotificationsHistory';

const logError = (message) => {
  if (!process.env.SLS_ANALYTICS_DEBUG) return;
  process.stdout.write(`Notifications error: ${message}\n`);
};

const NOTIFICATIONS_MODE_OFF = '0';
const NOTIFICATIONS_MODE_ONLY_OUTDATED_VERSION = '1';
const NOTIFICATIONS_MODE_ON = '2';

const ALLOWED_NOTIFICATIONS_MODES = new Set([
  NOTIFICATIONS_MODE_ON,
  NOTIFICATIONS_MODE_ONLY_OUTDATED_VERSION,
  NOTIFICATIONS_MODE_OFF,
]);

const getNotificationsMode = () => {
  const modeFromEnv = process.env.SLS_NOTIFICATIONS_MODE;

  if (modeFromEnv && ALLOWED_NOTIFICATIONS_MODES.has(modeFromEnv)) return modeFromEnv;

  if (ci.isCI) return NOTIFICATIONS_MODE_ONLY_OUTDATED_VERSION;

  return NOTIFICATIONS_MODE_ON;
};

const OUTDATED_VERSION_NOTIFICATION_CODES = new Set([
  'OUTDATED_MINOR_VERSION',
  'OUTDATED_MAJOR_VERSION',
]);

module.exports = (notifications) => {
  if (!Array.isArray(notifications)) {
    if (notifications && Array.isArray(notifications.notifications)) {
      // If in a future we'd decide to extend response payload
      // (so notifications are not returned dirctly but exposed on `notifications` property)
      // this patch ensures it's compatible with old versions
      ({ notifications } = notifications);
    } else {
      logError(`Expected array, got ${toShortString(notifications)}`);
      return null;
    }
  }

  const shownNotificationsHistory = configUtils.get(configPropertyName) || {};
  Object.keys(shownNotificationsHistory).forEach((code) => {
    const timeValue = coerceTimeValue(shownNotificationsHistory[code]);
    if (!timeValue) delete shownNotificationsHistory[code];
    else shownNotificationsHistory[code] = timeValue;
  });

  const notificationsMode = getNotificationsMode();

  return (
    notifications
      .filter((notification, index) => {
        if (!isPlainObject(notification)) {
          logError(`Expected plain object at [${index}] got ${toShortString(notification)}`);
          return false;
        }
        if (!notification.code || typeof notification.code !== 'string') {
          logError(`Expected string at [${index}].code got ${toShortString(notification.code)}`);
          return false;
        }
        if (!notification.message || typeof notification.message !== 'string') {
          logError(
            `Expected string at [${index}].message got ${toShortString(notification.message)}`
          );
          return false;
        }

        if (notificationsMode === NOTIFICATIONS_MODE_OFF) return false;

        if (
          notificationsMode === NOTIFICATIONS_MODE_ONLY_OUTDATED_VERSION &&
          !OUTDATED_VERSION_NOTIFICATION_CODES.has(notification.code)
        ) {
          return false;
        }

        notification.visibilityInterval = coerceNaturalNumber(notification.visibilityInterval);
        if (notification.visibilityInterval == null) notification.visibilityInterval = 24;
        return true;
      })
      .sort((notification1, notification2) => {
        // 1. Notifications to be shown on intervals
        if (notification1.visibilityInterval || notification2.visibilityInterval) {
          // Favor those to be shown most rarely
          return notification2.visibilityInterval - notification1.visibilityInterval;
        }
        // 2.Notifications to be shown always
        // Favor shown least recently
        return (
          (shownNotificationsHistory[notification1.code] || 0) -
          (shownNotificationsHistory[notification2.code] || 0)
        );
      })
      .find((notification) => {
        if (notification.visibilityInterval) {
          const lastShown = shownNotificationsHistory[notification.code];
          if (lastShown) {
            if (lastShown > Date.now() - (notification.visibilityInterval || 24) * 60 * 60 * 1000) {
              return false;
            }
          }
        }
        shownNotificationsHistory[notification.code] = Date.now();
        configUtils.set(configPropertyName, shownNotificationsHistory);
        return true;
      }) || null
  );
};
