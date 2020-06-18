'use strict';

const isPlainObject = require('type/plain-object/is');
const coerceNaturalNumber = require('type/natural-number/coerce');
const coerceTimeValue = require('type/time-value/coerce');
const toShortString = require('type/lib/to-short-string');
const configUtils = require('./config');

const configPropertyName = 'shownNotificationsHistory';

const logError = (message) => {
  if (!process.env.SLS_ANALYTICS_DEBUG) return;
  process.stdout.write(`Notifications error: ${message}\n`);
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
      return null;
    }
  }
  const shownNotificationsHistory = configUtils.get(configPropertyName) || {};
  return (
    notifications.find((notification, index) => {
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
      const lastShown = coerceTimeValue(shownNotificationsHistory[notification.code]);
      if (lastShown) {
        if (
          lastShown >
          Date.now() - (coerceNaturalNumber(notification.visibilityInterval) || 24) * 60 * 60 * 1000
        ) {
          return false;
        }
      }
      shownNotificationsHistory[notification.code] = Date.now();
      configUtils.set(configPropertyName, shownNotificationsHistory);
      return true;
    }) || null
  );
};
