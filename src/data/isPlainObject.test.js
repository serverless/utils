import isPlainObject from './isPlainObject'

describe('isPlainObject', () => {
  test('returns true for plain object', () => {
    expect(isPlainObject({})).toBe(true)
    expect(isPlainObject(new Object())).toBe(true)
    expect(isPlainObject(Object.create(null))).toBe(true)
  })

  test('returns false for all other values', () => {
    expect(isPlainObject(undefined)).toBe(false)
    expect(isPlainObject(null)).toBe(false)
    expect(isPlainObject('')).toBe(false)
    expect(isPlainObject('abc')).toBe(false)
    expect(isPlainObject(false)).toBe(false)
    expect(isPlainObject(true)).toBe(false)
    expect(isPlainObject(0)).toBe(false)
    expect(isPlainObject(-1)).toBe(false)
    expect(isPlainObject(1)).toBe(false)
    expect(isPlainObject(NaN)).toBe(false)
    expect(isPlainObject(Infinity)).toBe(false)
    expect(isPlainObject(-Infinity)).toBe(false)
    expect(isPlainObject(-Infinity)).toBe(false)
    expect(isPlainObject([])).toBe(false)
    expect(isPlainObject(new Array())).toBe(false)
    expect(isPlainObject(() => {})).toBe(false)
    expect(isPlainObject(function() {})).toBe(false)
    expect(isPlainObject(async () => {})).toBe(false)
    expect(isPlainObject(async function() {})).toBe(false)
    expect(isPlainObject(function*() {})).toBe(false)
    const ComplexObject = function() {}
    expect(isPlainObject(new ComplexObject())).toBe(false)
  })
})
