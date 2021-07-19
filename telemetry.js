'use strict';

class StepHistory extends Map {
  // Deprecated, remove with next major
  set(key, value) {
    const newValueWithTimestamp = {
      value,
      timestamp: Date.now(),
    };
    return super.set(key, newValueWithTimestamp);
  }

  start(key) {
    const timestamp = Date.now();
    const valueObject = {
      timestamp,
      startedAt: timestamp,
    };
    return super.set(key, valueObject);
  }

  finalize(key, value) {
    const previousValueObject = super.get(key) || {};
    const timestamp = Date.now();
    const valueObject = {
      ...previousValueObject,
      value,
      timestamp,
      finalizedAt: timestamp,
    };
    return super.set(key, valueObject);
  }

  valuesMap() {
    return new Map(Array.from(this.entries()).map(([key, obj]) => [key, obj.value]));
  }

  toJSON() {
    return Array.from(this.entries()).map(([key, obj]) => ({ key, ...obj }));
  }
}

module.exports = {
  StepHistory,
};
