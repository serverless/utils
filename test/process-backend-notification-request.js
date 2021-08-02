'use strict';

const { expect } = require('chai');
const overrideEnv = require('process-utils/override-env');
const fsp = require('fs').promises;
const wait = require('timers-ext/promise/sleep');
const proxyquire = require('proxyquire');
const configFileName = require('../config').CONFIG_FILE_NAME;

const processBackendNotificationRequest = proxyquire('../process-backend-notification-request', {
  'ci-info': { isCI: false },
});

const defaultFixture = [
  { code: 'CODE12', message: 'Some notification', visibilityInterval: 12, type: 'promotional' },
  { code: 'CODE0A', message: 'Some notification', visibilityInterval: 0, type: 'promotional' },
  { code: 'CODE6', message: 'Some notification', visibilityInterval: 6, type: 'promotional' },
  { code: 'CODE0B', message: 'Some notification', visibilityInterval: 0, type: 'promotional' },
  { code: 'CODE24', message: 'Some notification', visibilityInterval: 24, type: 'promotional' },
  { code: 'CODE0C', message: 'Some notification', visibilityInterval: 0, type: 'promotional' },
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
  afterEach(async () => fsp.unlink(configFileName));

  it('Should ignore invalid input', async () => {
    expect(await processTargetNotifications()).to.deep.equal({});
    expect(
      await processTargetNotifications([
        null,
        'foo',
        NaN,
        new Error(),
        { message: 'FOO' },
        { code: 'CODE1' },
      ])
    ).to.deep.equal({});
  });

  it('Should show not shown notification', async () => {
    const notifications = await processTargetNotifications([
      { code: 'CODE1', message: 'Some notification #1', type: 'promotional' },
      { code: 'CODE2', message: 'Some notification #2', type: 'promotional' },
    ]);

    expect(notifications.promotional.code).to.equal('CODE1');
  });

  it('Should skip shown notification', async () => {
    await processTargetNotifications([
      { code: 'CODE1', message: 'Some notification #1', type: 'promotional' },
      { code: 'CODE2', message: 'Some notification #2', type: 'promotional' },
    ]);
    const notification = await processTargetNotifications([
      { code: 'CODE1', message: 'Some notification #1', type: 'promotional' },
      { code: 'CODE2', message: 'Some notification #2', type: 'promotional' },
    ]);

    expect(notification.promotional.code).to.equal('CODE2');
  });

  it('Should skip shown notification correctly with multiple types', async () => {
    await processTargetNotifications([
      { code: 'CODE1', message: 'Some notification #1', type: 'promotional' },
      { code: 'CODE2', message: 'Some notification #2', type: 'promotional' },
      { code: 'CODE3', message: 'Some notification #3', type: 'other' },
      { code: 'CODE4', message: 'Some notification #3', type: 'other' },
    ]);
    const notification = await processTargetNotifications([
      { code: 'CODE1', message: 'Some notification #1', type: 'promotional' },
      { code: 'CODE2', message: 'Some notification #2', type: 'promotional' },
      { code: 'CODE3', message: 'Some notification #3', type: 'other' },
      { code: 'CODE4', message: 'Some notification #3', type: 'other' },
    ]);

    expect(notification.promotional.code).to.equal('CODE2');
    expect(notification.other.code).to.equal('CODE4');
  });

  it('Should favor notification to be shown least frequently', async () => {
    expect((await processTargetNotifications(defaultFixture)).promotional.code).to.equal('CODE24');
    expect((await processTargetNotifications(defaultFixture)).promotional.code).to.equal('CODE12');
    expect((await processTargetNotifications(defaultFixture)).promotional.code).to.equal('CODE6');
    expect((await processTargetNotifications(defaultFixture)).promotional.code).to.equal('CODE0A');
  });

  it('If notification is to be shown always, favor one shown least recently', async () => {
    const fixture = [
      { code: 'CODE0A', message: 'Some notification', visibilityInterval: 0, type: 'promotional' },
      { code: 'CODE0B', message: 'Some notification', visibilityInterval: 0, type: 'promotional' },
      { code: 'CODE0C', message: 'Some notification', visibilityInterval: 0, type: 'promotional' },
    ];
    expect((await processTargetNotifications(fixture)).promotional.code).to.equal('CODE0A');
    expect((await processTargetNotifications(fixture)).promotional.code).to.equal('CODE0B');
    expect((await processTargetNotifications(fixture)).promotional.code).to.equal('CODE0C');
    expect((await processTargetNotifications(fixture)).promotional.code).to.equal('CODE0A');
    expect((await processTargetNotifications(fixture)).promotional.code).to.equal('CODE0B');
    expect((await processTargetNotifications(fixture)).promotional.code).to.equal('CODE0C');
  });

  describe('Notifications mode', () => {
    const suite = (map) => {
      it(`Should ignore all notifications if SLS_NOTIFICATIONS_MODE set to ${map(
        'off'
      )}`, async () => {
        let notifications;
        await overrideEnv({ variables: { SLS_NOTIFICATIONS_MODE: map('off') } }, async () => {
          notifications = await processTargetNotifications([
            { code: 'CODE123', message: 'Some notification #1', type: 'promotional' },
            { code: 'CODE456', message: 'Some notification #2', type: 'anothertype' },
          ]);
        });

        expect(notifications).to.deep.equal({});
      });

      it(`Should only consider outdated version notifications if SLS_NOTIFICATIONS_MODE set to ${map(
        'upgrades-only'
      )}`, async () => {
        let notifications;
        await overrideEnv(
          { variables: { SLS_NOTIFICATIONS_MODE: map('upgrades-only') } },
          async () => {
            notifications = await processTargetNotifications([
              { code: 'CODE456', message: 'Some notification', type: 'promotional' },
              { code: 'OUTDATED_MINOR_VERSION', message: 'outdated', type: 'update' },
            ]);
          }
        );

        expect(notifications.promotional).to.be.undefined;
        expect(notifications.update.code).to.equal('OUTDATED_MINOR_VERSION');
      });

      it(`Should consider all notifications if SLS_NOTIFICATIONS_MODE set to ${map(
        'on'
      )}`, async () => {
        let notifications;
        await overrideEnv({ variables: { SLS_NOTIFICATIONS_MODE: map('on') } }, async () => {
          notifications = await processTargetNotifications([
            { code: 'CODE123', message: 'Some notification #1', type: 'promotional' },
            { code: 'CODE456', message: 'Some notification #2', type: 'promotional' },
          ]);
        });

        expect(notifications.promotional.code).to.equal('CODE123');
      });

      it(`Should force not shown or oldest shown with  SLS_NOTIFICATIONS_MODE set to ${map(
        'force'
      )}`, async () => {
        await overrideEnv({ variables: { SLS_NOTIFICATIONS_MODE: map('force') } }, async () => {
          expect((await processTargetNotifications(defaultFixture)).promotional.code).to.equal(
            'CODE24'
          );
          expect((await processTargetNotifications(defaultFixture)).promotional.code).to.equal(
            'CODE12'
          );
          expect((await processTargetNotifications(defaultFixture)).promotional.code).to.equal(
            'CODE6'
          );
          expect((await processTargetNotifications(defaultFixture)).promotional.code).to.equal(
            'CODE0A'
          );
          expect((await processTargetNotifications(defaultFixture)).promotional.code).to.equal(
            'CODE0B'
          );
          expect((await processTargetNotifications(defaultFixture)).promotional.code).to.equal(
            'CODE0C'
          );

          expect((await processTargetNotifications(defaultFixture)).promotional.code).to.equal(
            'CODE24'
          );
          expect((await processTargetNotifications(defaultFixture)).promotional.code).to.equal(
            'CODE12'
          );
          expect((await processTargetNotifications(defaultFixture)).promotional.code).to.equal(
            'CODE6'
          );
          expect((await processTargetNotifications(defaultFixture)).promotional.code).to.equal(
            'CODE0A'
          );
          expect((await processTargetNotifications(defaultFixture)).promotional.code).to.equal(
            'CODE0B'
          );
          expect((await processTargetNotifications(defaultFixture)).promotional.code).to.equal(
            'CODE0C'
          );
        });
      });
    };

    suite((mode) => mode);

    const oldNotationMap = { 'off': '0', 'upgrades-only': '1', 'on': '2', 'force': '3' };
    suite((mode) => oldNotationMap[mode]);
  });
});
