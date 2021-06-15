'use strict';

class StepHistory extends Map {
  set(key, value) {
    const valueWithTimestamp = {
      value,
      timestamp: Date.now(),
    };
    return super.set(key, valueWithTimestamp);
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
