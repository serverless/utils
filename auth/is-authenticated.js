'use strict';

const resolveAuthToken = require('./resolve-token');

module.exports = async () => {
  try {
    await resolveAuthToken();
    return true;
  } catch (error) {
    if (error.code === 'CONSOLE_LOGGED_OUT') return false;
    throw error;
  }
};
