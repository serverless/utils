import isNumber from './isNumber'

describe('isNumber', () => {
  test('returns true for primitive numbers', () => {
    expect(isNumber(0)).toBe(true)
    expect(isNumber(-1)).toBe(true)
    expect(isNumber(1)).toBe(true)
    expect(isNumber(-1.2)).toBe(true)
    expect(isNumber(1.2)).toBe(true)
  })

  test('returns true for NaN', () => {
    expect(isNumber(NaN)).toBe(true)
  })

  test('returns true for Infinity', () => {
    expect(isNumber(Infinity)).toBe(true)
    expect(isNumber(-Infinity)).toBe(true)
  })

  test('returns true for Number objects', () => {
    expect(isNumber(new Number(0))).toBe(true)
    expect(isNumber(new Number(-1))).toBe(true)
    expect(isNumber(new Number(1))).toBe(true)
    expect(isNumber(new Number(-1.2))).toBe(true)
    expect(isNumber(new Number(1.2))).toBe(true)
    expect(isNumber(new Number(NaN))).toBe(true)
    expect(isNumber(new Number(Infinity))).toBe(true)
    expect(isNumber(new Number(-Infinity))).toBe(true)
  })

  test('returns false for all other values', () => {
    expect(isNumber(undefined)).toBe(false)
    expect(isNumber(null)).toBe(false)
    expect(isNumber(false)).toBe(false)
    expect(isNumber(true)).toBe(false)
    expect(isNumber('')).toBe(false)
    expect(isNumber('abc')).toBe(false)
    expect(isNumber(/abc/)).toBe(false)
    expect(isNumber([])).toBe(false)
    expect(isNumber({})).toBe(false)
    expect(isNumber(async () => {})).toBe(false)
    expect(isNumber(() => {})).toBe(false)
    expect(isNumber(function() {})).toBe(false)
    expect(isNumber(function*() {})).toBe(false)
    expect(isNumber((function*() {})())).toBe(false)
    expect(isNumber(new Array(0))).toBe(false)
    expect(isNumber(new ArrayBuffer(2))).toBe(false)
    expect(isNumber(new Boolean(false))).toBe(false)
    expect(isNumber(new Boolean(true))).toBe(false)
    expect(isNumber(new Date())).toBe(false)
    expect(isNumber(new Error())).toBe(false)
    expect(isNumber(new Promise(() => {}))).toBe(false)
    expect(isNumber(new Proxy({}, {}))).toBe(false)
    expect(isNumber(new Set())).toBe(false)
    expect(isNumber(new String())).toBe(false)
    expect(isNumber(new String(''))).toBe(false)
    expect(isNumber(new String('abc'))).toBe(false)
    expect(isNumber(Symbol('abc'))).toBe(false)
    expect(isNumber(new WeakMap())).toBe(false)
    expect(isNumber(new WeakSet())).toBe(false)
  })
})
