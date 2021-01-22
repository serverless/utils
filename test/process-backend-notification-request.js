'use strict';

const { expect } = require('chai');
const processTargetNotifications = require('../process-backend-notification-request');
const wait = require('timers-ext/promise/sleep');

const testOrderFixture = [
  { code: 'CODE12', message: 'Some notification', visibilityInterval: 12 },
  { code: 'CODE0A', message: 'Some notification', visibilityInterval: 0 },
  { code: 'CODE6', message: 'Some notification', visibilityInterval: 6 },
  { code: 'CODE0B', message: 'Some notification', visibilityInterval: 0 },
  { code: 'CODE24', message: 'Some notification', visibilityInterval: 24 },
  { code: 'CODE0C', message: 'Some notification', visibilityInterval: 0 },
].sort();

describe('process-backend-notification-request', () => {
  // Reason for enforcing time progress is that the test became flaky - in some situations two notifications
  // had the same lastShown value in config
  const validateNotificationAndEnsureClockProgress = async (notificationCode) => {
    expect(processTargetNotifications(testOrderFixture).code).to.equal(notificationCode);
    await wait(1);
  };

  it('Should ignore invalid input', () => {
    expect(processTargetNotifications()).to.equal(null);
    expect(
      processTargetNotifications([
        null,
        'foo',
        NaN,
        new Error(),
        { message: 'FOO' },
        { code: 'CODE1' },
      ])
    ).to.equal(null);
  });

  it('Should show not shown notification', () => {
    const notification = processTargetNotifications([
      { code: 'CODE1', message: 'Some notification #1' },
      { code: 'CODE2', message: 'Some notification #2' },
    ]);

    expect(notification.code).to.equal('CODE1');
  });

  it('Should skip shown notification', () => {
    const notification = processTargetNotifications([
      { code: 'CODE1', message: 'Some notification #1' },
      { code: 'CODE2', message: 'Some notification #2' },
    ]);

    expect(notification.code).to.equal('CODE2');
  });

  it('Should favor notification to be shown least frequently', () => {
    expect(processTargetNotifications(testOrderFixture).code).to.equal('CODE24');
    expect(processTargetNotifications(testOrderFixture).code).to.equal('CODE12');
    expect(processTargetNotifications(testOrderFixture).code).to.equal('CODE6');
  });

  it('If notification is to be shown always, favor one shown least recently', async () => {
    await validateNotificationAndEnsureClockProgress('CODE0A');
    await validateNotificationAndEnsureClockProgress('CODE0B');
    await validateNotificationAndEnsureClockProgress('CODE0C');
    await validateNotificationAndEnsureClockProgress('CODE0A');
    await validateNotificationAndEnsureClockProgress('CODE0B');
    await validateNotificationAndEnsureClockProgress('CODE0C');
  });
});
