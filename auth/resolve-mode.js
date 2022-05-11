'use strict';

const resolveAuthToken = require('./resolve-token');

const isOrgAuthentication = Boolean(process.env.SLS_ORG_TOKEN);

module.exports = async () => {
  try {
    await resolveAuthToken();
    return isOrgAuthentication ? 'org' : 'user';
  } catch (error) {
    if (error.code === 'CONSOLE_LOGGED_OUT') return null;
    throw error;
  }
};
