'use strict';

const _ = require('lodash');
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

const NOTIFICATIONS_MODE_OFF = 'off';
const NOTIFICATIONS_MODE_ONLY_OUTDATED_VERSION = 'upgrades-only';
const NOTIFICATIONS_MODE_ON = 'on';
const NOTIFICATIONS_MODE_FORCE = 'force';

const oldNotationMap = [
  NOTIFICATIONS_MODE_OFF,
  NOTIFICATIONS_MODE_ONLY_OUTDATED_VERSION,
  NOTIFICATIONS_MODE_ON,
  NOTIFICATIONS_MODE_FORCE,
];

const ALLOWED_NOTIFICATIONS_MODES = new Set([
  NOTIFICATIONS_MODE_ON,
  NOTIFICATIONS_MODE_ONLY_OUTDATED_VERSION,
  NOTIFICATIONS_MODE_OFF,
  NOTIFICATIONS_MODE_FORCE,
]);

const getNotificationsMode = () => {
  const modeFromEnv =
    oldNotationMap[Number(process.env.SLS_NOTIFICATIONS_MODE)] ||
    process.env.SLS_NOTIFICATIONS_MODE;

  if (modeFromEnv && ALLOWED_NOTIFICATIONS_MODES.has(modeFromEnv)) return modeFromEnv;

  if (ci.isCI) return NOTIFICATIONS_MODE_ONLY_OUTDATED_VERSION;

  return NOTIFICATIONS_MODE_ON;
};

const resolveNotificationToShow = (notifications, shownNotificationsHistory) => {
  const notificationsMode = getNotificationsMode();

  const notificationsOrderedByPriority = notifications
    .filter((notification) => {
      if (notificationsMode === NOTIFICATIONS_MODE_OFF) return false;

      if (
        notificationsMode === NOTIFICATIONS_MODE_ONLY_OUTDATED_VERSION &&
        !(notification.type === 'update')
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
    });

  if (notificationsMode === NOTIFICATIONS_MODE_FORCE) {
    const notification = notificationsOrderedByPriority.sort((notification1, notification2) => {
      const lastShown1 = shownNotificationsHistory[notification1.code];
      const lastShown2 = shownNotificationsHistory[notification2.code];
      if (lastShown1) {
        if (lastShown2) return lastShown1 - lastShown2;
        return 1;
      } else if (lastShown2) {
        return -1;
      }
      return 0;
    })[0];
    shownNotificationsHistory[notification.code] = Date.now();
    configUtils.set(configPropertyName, shownNotificationsHistory);
    return notification;
  }

  return (
    notificationsOrderedByPriority.find((notification) => {
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

module.exports = (notifications) => {
  if (!Array.isArray(notifications)) {
    if (notifications && Array.isArray(notifications.notifications)) {
      // If in a future we'd decide to extend response payload
      // (so notifications are not returned dirctly but exposed on `notifications` property)
      // this patch ensures it's compatible with old versions
      ({ notifications } = notifications);
    } else {
      logError(`Expected array, got ${toShortString(notifications)}`);
      return {};
    }
  }

  if (!notifications.length) return {};

  const validatedNotifications = notifications.filter((notification, index) => {
    if (!isPlainObject(notification)) {
      logError(`Expected plain object at [${index}] got ${toShortString(notification)}`);
      return false;
    }
    if (!notification.code || typeof notification.code !== 'string') {
      logError(`Expected string at [${index}].code got ${toShortString(notification.code)}`);
      return false;
    }
    if (!notification.message || typeof notification.message !== 'string') {
      logError(`Expected string at [${index}].message got ${toShortString(notification.message)}`);
      return false;
    }
    if (!notification.type || typeof notification.type !== 'string') {
      logError(`Expected string at [${index}].type got ${toShortString(notification.message)}`);
      return false;
    }

    return true;
  });

  const notificationsByType = {};
  for (const notification of validatedNotifications) {
    if (!notificationsByType[notification.type]) {
      notificationsByType[notification.type] = [];
    }
    notificationsByType[notification.type].push(notification);
  }

  const shownNotificationsHistory = configUtils.get(configPropertyName) || {};
  Object.keys(shownNotificationsHistory).forEach((code) => {
    const timeValue = coerceTimeValue(shownNotificationsHistory[code]);
    if (!timeValue) delete shownNotificationsHistory[code];
    else shownNotificationsHistory[code] = timeValue;
  });

  const res = _.fromPairs(
    Object.entries(notificationsByType)
      .map(([type, notifs]) => [type, resolveNotificationToShow(notifs, shownNotificationsHistory)])
      .filter((entry) => Boolean(entry[1]))
  );
  return res;
};
