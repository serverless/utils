import isPromise from './isPromise'

describe('isPromise', () => {
  test('returns true for Promise', () => {
    expect(isPromise(new Promise(() => {}))).toBe(true)
  })

  test('returns true for object with then method', () => {
    expect(
      isPromise({
        then: () => {}
      })
    ).toBe(true)
  })

  test('returns false for all other values', () => {
    expect(isPromise(undefined)).toBe(false)
    expect(isPromise(null)).toBe(false)
    expect(isPromise('')).toBe(false)
    expect(isPromise('abc')).toBe(false)
    expect(isPromise(false)).toBe(false)
    expect(isPromise(true)).toBe(false)
    expect(isPromise(0)).toBe(false)
    expect(isPromise(-1)).toBe(false)
    expect(isPromise(1)).toBe(false)
    expect(isPromise(NaN)).toBe(false)
    expect(isPromise(Infinity)).toBe(false)
    expect(isPromise(-Infinity)).toBe(false)
    expect(isPromise({})).toBe(false)
    expect(isPromise([])).toBe(false)
    expect(isPromise(new Array(0))).toBe(false)
    expect(isPromise([0])).toBe(false)
    expect(isPromise(/abc/)).toBe(false)
    expect(isPromise(async () => {})).toBe(false)
    expect(isPromise(() => {})).toBe(false)
    expect(isPromise(function() {})).toBe(false)
    expect(isPromise((function*() {})())).toBe(false)
    expect(isPromise(new ArrayBuffer(2))).toBe(false)
    expect(isPromise(new Boolean(false))).toBe(false)
    expect(isPromise(new Boolean(true))).toBe(false)
    expect(isPromise(new Date())).toBe(false)
    expect(isPromise(new Error())).toBe(false)
    expect(isPromise(new Map())).toBe(false)
    expect(isPromise(new Number(1))).toBe(false)
    expect(isPromise(new Proxy({}, {}))).toBe(false)
    expect(isPromise(new Set())).toBe(false)
    expect(isPromise(new String('abc'))).toBe(false)
    expect(isPromise(Symbol('abc'))).toBe(false)
    expect(isPromise(new WeakMap())).toBe(false)
    expect(isPromise(new WeakSet())).toBe(false)
  })
})
