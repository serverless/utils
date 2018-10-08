import isObject from './isObject'

describe('isObject', () => {
  test('returns true for plain object', () => {
    expect(isObject({})).toBe(true)
    expect(isObject(new Object())).toBe(true)
  })

  test('returns true for complex object', () => {
    const ComplexObject = function() {}
    expect(isObject(new ComplexObject())).toBe(true)
  })

  test('returns true for plain array', () => {
    expect(isObject([])).toBe(true)
    expect(isObject(new Array())).toBe(true)
  })

  test('returns true for function', () => {
    expect(isObject(() => {})).toBe(true)
    expect(isObject(function() {})).toBe(true)
    expect(isObject(async () => {})).toBe(true)
    expect(isObject(async function() {})).toBe(true)
    expect(isObject(function*() {})).toBe(true)
    // TODO BRN: Check for ES6 Proxy support
  })

  test('returns false for all other values', () => {
    expect(isObject(undefined)).toBe(false)
    expect(isObject(null)).toBe(false)
    expect(isObject('')).toBe(false)
    expect(isObject('abc')).toBe(false)
    expect(isObject(false)).toBe(false)
    expect(isObject(true)).toBe(false)
    expect(isObject(0)).toBe(false)
    expect(isObject(-1)).toBe(false)
    expect(isObject(1)).toBe(false)
    expect(isObject(NaN)).toBe(false)
    expect(isObject(Infinity)).toBe(false)
    expect(isObject(-Infinity)).toBe(false)
  })
})
