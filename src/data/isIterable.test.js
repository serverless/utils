import isIterable from './isIterable'

describe('isIterable', () => {
  test('returns true for arrays', () => {
    expect(isIterable([])).toBe(true)
    expect(isIterable(new Array())).toBe(true)
    expect(isIterable([1, 2, 3])).toBe(true)
  })

  test('returns true for strings', () => {
    expect(isIterable('')).toBe(true)
    expect(isIterable('abc')).toBe(true)
    expect(isIterable(new String(''))).toBe(true)
  })

  test('returns true for generators', () => {
    expect(isIterable((function*() {})())).toBe(true)
  })

  test('returns true for Set', () => {
    expect(isIterable(new Set())).toBe(true)
  })

  test('returns false for plain objects', () => {
    expect(isIterable({})).toBe(false)
  })

  test('returns false for all other values', () => {
    expect(isIterable(undefined)).toBe(false)
    expect(isIterable(null)).toBe(false)
    expect(isIterable(false)).toBe(false)
    expect(isIterable(true)).toBe(false)
    expect(isIterable(0)).toBe(false)
    expect(isIterable(-1)).toBe(false)
    expect(isIterable(1)).toBe(false)
    expect(isIterable(NaN)).toBe(false)
    expect(isIterable(Infinity)).toBe(false)
    expect(isIterable(-Infinity)).toBe(false)
    expect(isIterable(/abc/)).toBe(false)
    expect(isIterable(async () => {})).toBe(false)
    expect(isIterable(() => {})).toBe(false)
    expect(isIterable(function() {})).toBe(false)
    expect(isIterable(function*() {})).toBe(false)
    expect(isIterable(new ArrayBuffer(2))).toBe(false)
    expect(isIterable(new Boolean(false))).toBe(false)
    expect(isIterable(new Boolean(true))).toBe(false)
    expect(isIterable(new Date())).toBe(false)
    expect(isIterable(new Error())).toBe(false)
    expect(isIterable(new Number(-1.2))).toBe(false)
    expect(isIterable(new Number(1.2))).toBe(false)
    expect(isIterable(new Number(NaN))).toBe(false)
    expect(isIterable(new Number(Infinity))).toBe(false)
    expect(isIterable(new Number(-Infinity))).toBe(false)
    expect(isIterable(new Promise(() => {}))).toBe(false)
    expect(isIterable(new Proxy({}, {}))).toBe(false)
    expect(isIterable(Symbol('abc'))).toBe(false)
    expect(isIterable(new WeakMap())).toBe(false)
    expect(isIterable(new WeakSet())).toBe(false)
  })
})
