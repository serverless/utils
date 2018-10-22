import isInteger from './isInteger'

describe('isInteger', () => {
  test('returns true for primitive numbers that are integers', () => {
    expect(isInteger(0)).toBe(true)
    expect(isInteger(-1)).toBe(true)
    expect(isInteger(1)).toBe(true)
  })

  test('returns true for Number objects that are integers', () => {
    expect(isInteger(new Number(0))).toBe(true)
    expect(isInteger(new Number(-1))).toBe(true)
    expect(isInteger(new Number(1))).toBe(true)
  })

  test('returns false for primitive numbers that are not integers', () => {
    expect(isInteger(-1.2)).toBe(false)
    expect(isInteger(1.2)).toBe(false)
  })

  test('returns false for NaN', () => {
    expect(isInteger(NaN)).toBe(false)
  })

  test('returns false for Infinity', () => {
    expect(isInteger(Infinity)).toBe(false)
    expect(isInteger(-Infinity)).toBe(false)
  })

  test('returns false for MIN_VALUE', () => {
    expect(isInteger(Number.MIN_VALUE)).toBe(false)
  })

  test('returns false for string values that are string integers', () => {
    expect(isInteger('3')).toBe(false)
  })

  test('returns false for Number objects that are not integers', () => {
    expect(isInteger(new Number(-1.2))).toBe(false)
    expect(isInteger(new Number(1.2))).toBe(false)
    expect(isInteger(new Number(NaN))).toBe(false)
    expect(isInteger(new Number(Infinity))).toBe(false)
    expect(isInteger(new Number(-Infinity))).toBe(false)
  })

  test('returns false for all other values', () => {
    expect(isInteger(undefined)).toBe(false)
    expect(isInteger(null)).toBe(false)
    expect(isInteger(false)).toBe(false)
    expect(isInteger(true)).toBe(false)
    expect(isInteger('')).toBe(false)
    expect(isInteger('abc')).toBe(false)
    expect(isInteger(/abc/)).toBe(false)
    expect(isInteger([])).toBe(false)
    expect(isInteger({})).toBe(false)
    expect(isInteger(async () => {})).toBe(false)
    expect(isInteger(() => {})).toBe(false)
    expect(isInteger(function() {})).toBe(false)
    expect(isInteger(function*() {})).toBe(false)
    expect(isInteger((function*() {})())).toBe(false)
    expect(isInteger(new Array(0))).toBe(false)
    expect(isInteger(new ArrayBuffer(2))).toBe(false)
    expect(isInteger(new Boolean(false))).toBe(false)
    expect(isInteger(new Boolean(true))).toBe(false)
    expect(isInteger(new Date())).toBe(false)
    expect(isInteger(new Error())).toBe(false)
    expect(isInteger(new Promise(() => {}))).toBe(false)
    expect(isInteger(new Proxy({}, {}))).toBe(false)
    expect(isInteger(new Set())).toBe(false)
    expect(isInteger(new String())).toBe(false)
    expect(isInteger(new String(''))).toBe(false)
    expect(isInteger(new String('abc'))).toBe(false)
    expect(isInteger(Symbol('abc'))).toBe(false)
    expect(isInteger(new WeakMap())).toBe(false)
    expect(isInteger(new WeakSet())).toBe(false)
  })
})
