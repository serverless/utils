'use strict';

const { expect } = require('chai');
const overrideEnv = require('process-utils/override-env');
const wait = require('timers-ext/promise/sleep');
const proxyquire = require('proxyquire');

const processBackendNotificationRequest = proxyquire('../process-backend-notification-request', {
  'ci-info': { isCI: false },
});

const testOrderFixture = [
  { code: 'CODE12', message: 'Some notification', visibilityInterval: 12 },
  { code: 'CODE0A', message: 'Some notification', visibilityInterval: 0 },
  { code: 'CODE6', message: 'Some notification', visibilityInterval: 6 },
  { code: 'CODE0B', message: 'Some notification', visibilityInterval: 0 },
  { code: 'CODE24', message: 'Some notification', visibilityInterval: 24 },
  { code: 'CODE0C', message: 'Some notification', visibilityInterval: 0 },
];

// Reason for enforcing time progress is that the test became flaky - in some situations two notifications
// had the same lastShown value in config
const processTargetNotifications = async (notifications) => {
  try {
    return processBackendNotificationRequest(notifications);
  } finally {
    await wait(1);
  }
};

describe('process-backend-notification-request', () => {
  it('Should ignore invalid input', async () => {
    expect(await processTargetNotifications()).to.equal(null);
    expect(
      await processTargetNotifications([
        null,
        'foo',
        NaN,
        new Error(),
        { message: 'FOO' },
        { code: 'CODE1' },
      ])
    ).to.equal(null);
  });

  it('Should show not shown notification', async () => {
    const notification = await processTargetNotifications([
      { code: 'CODE1', message: 'Some notification #1' },
      { code: 'CODE2', message: 'Some notification #2' },
    ]);

    expect(notification.code).to.equal('CODE1');
  });

  it('Should skip shown notification', async () => {
    const notification = await processTargetNotifications([
      { code: 'CODE1', message: 'Some notification #1' },
      { code: 'CODE2', message: 'Some notification #2' },
    ]);

    expect(notification.code).to.equal('CODE2');
  });

  it('Should favor notification to be shown least frequently', async () => {
    expect((await processTargetNotifications(testOrderFixture)).code).to.equal('CODE24');
    expect((await processTargetNotifications(testOrderFixture)).code).to.equal('CODE12');
    expect((await processTargetNotifications(testOrderFixture)).code).to.equal('CODE6');
  });

  it('If notification is to be shown always, favor one shown least recently', async () => {
    expect((await processTargetNotifications(testOrderFixture)).code).to.equal('CODE0A');
    expect((await processTargetNotifications(testOrderFixture)).code).to.equal('CODE0B');
    expect((await processTargetNotifications(testOrderFixture)).code).to.equal('CODE0C');
    expect((await processTargetNotifications(testOrderFixture)).code).to.equal('CODE0A');
    expect((await processTargetNotifications(testOrderFixture)).code).to.equal('CODE0B');
    expect((await processTargetNotifications(testOrderFixture)).code).to.equal('CODE0C');
  });

  it('Should ignore all notifications if SLS_NOTIFICATIONS_MODE set to 0', async () => {
    let notification;
    await overrideEnv({ variables: { SLS_NOTIFICATIONS_MODE: '0' } }, async () => {
      notification = await processTargetNotifications([
        { code: 'CODE123', message: 'Some notification #1' },
        { code: 'CODE456', message: 'Some notification #2' },
      ]);
    });

    expect(notification).to.be.null;
  });

  it('Should only consider outdated version notifs if SLS_NOTIFICATIONS_MODE set to 1', async () => {
    let notification;
    await overrideEnv({ variables: { SLS_NOTIFICATIONS_MODE: '1' } }, async () => {
      notification = await processTargetNotifications([
        { code: 'CODE456', message: 'Some notification' },
        { code: 'OUTDATED_MINOR_VERSION', message: 'outdated' },
      ]);
    });

    expect(notification.code).to.equal('OUTDATED_MINOR_VERSION');
  });

  it('Should consider all notifs if SLS_NOTIFICATIONS_MODE set to 2', async () => {
    let notification;
    await overrideEnv({ variables: { SLS_NOTIFICATIONS_MODE: '2' } }, async () => {
      notification = await processTargetNotifications([
        { code: 'CODE123', message: 'Some notification #1' },
        { code: 'CODE456', message: 'Some notification #2' },
      ]);
    });

    expect(notification.code).to.equal('CODE123');
  });
});
