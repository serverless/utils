'use strict';

const resolveIdToken = require('./resolve-id-token');

module.exports = async () => {
  try {
    await resolveIdToken();
    return true;
  } catch (error) {
    if (error.code === 'CONSOLE_LOGGED_OUT') return false;
    throw error;
  }
};
