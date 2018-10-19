import isArrayLike from './isArrayLike'

describe('isArrayLike', () => {
  test('returns true for arrays', () => {
    expect(isArrayLike([])).toBe(true)
    expect(isArrayLike(new Array(0))).toBe(true)
    expect(isArrayLike([0])).toBe(true)
  })

  test('returns true for strings', () => {
    expect(isArrayLike('')).toBe(true)
    expect(isArrayLike('abc')).toBe(true)
    expect(isArrayLike(new String('abc'))).toBe(true)
  })

  test('returns true for object with length', () => {
    expect(isArrayLike({ length: 0 })).toBe(true)
    expect(isArrayLike({ length: 1 })).toBe(true)
  })

  test('returns false for functions with parameters', () => {
    // eslint-disable-next-line no-unused-vars
    expect(isArrayLike(function(foo, bar) {})).toBe(false)
  })

  test('returns false for all other values', () => {
    expect(isArrayLike(undefined)).toBe(false)
    expect(isArrayLike(null)).toBe(false)
    expect(isArrayLike(false)).toBe(false)
    expect(isArrayLike(true)).toBe(false)
    expect(isArrayLike(0)).toBe(false)
    expect(isArrayLike(-1)).toBe(false)
    expect(isArrayLike(1)).toBe(false)
    expect(isArrayLike(NaN)).toBe(false)
    expect(isArrayLike(Infinity)).toBe(false)
    expect(isArrayLike(-Infinity)).toBe(false)
    expect(isArrayLike({})).toBe(false)
    expect(isArrayLike(/abc/)).toBe(false)
    expect(isArrayLike(async () => {})).toBe(false)
    expect(isArrayLike(() => {})).toBe(false)
    expect(isArrayLike(function() {})).toBe(false)
    expect(isArrayLike((function*() {})())).toBe(false)
    expect(isArrayLike(new ArrayBuffer(2))).toBe(false)
    expect(isArrayLike(new Boolean(false))).toBe(false)
    expect(isArrayLike(new Boolean(true))).toBe(false)
    expect(isArrayLike(new Date())).toBe(false)
    expect(isArrayLike(new Error())).toBe(false)
    expect(isArrayLike(new Number(1))).toBe(false)
    expect(isArrayLike(new Promise(() => {}))).toBe(false)
    expect(isArrayLike(new Proxy({}, {}))).toBe(false)
    expect(isArrayLike(new Set())).toBe(false)
    expect(isArrayLike(Symbol('abc'))).toBe(false)
    expect(isArrayLike(new WeakMap())).toBe(false)
    expect(isArrayLike(new WeakSet())).toBe(false)
  })
})
