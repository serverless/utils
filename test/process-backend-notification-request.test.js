'use strict';

const { expect } = require('chai');
const processTargetNotifications = require('../process-backend-notification-request');

describe('lib/utils/processBackendNotificationRequest', () => {
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
});
