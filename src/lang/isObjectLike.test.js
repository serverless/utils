import isObjectLike from './isObjectLike'

describe('isObjectLike', () => {
  test('returns true for plain object', () => {
    expect(isObjectLike({})).toBe(true)
    expect(isObjectLike(new Object())).toBe(true)
  })

  test('returns true for complex object', () => {
    const ComplexObject = function() {}
    expect(isObjectLike(new ComplexObject())).toBe(true)
  })

  test('returns true for plain array', () => {
    expect(isObjectLike([])).toBe(true)
    expect(isObjectLike(new Array())).toBe(true)
  })

  test('returns true for object versions of native values', () => {
    expect(isObjectLike(new String('abc'))).toBe(true)
    expect(isObjectLike(new Number(3.2))).toBe(true)
    expect(isObjectLike(new Boolean(false))).toBe(true)
    expect(isObjectLike(new Date())).toBe(true)
  })

  test('returns false for all other values', () => {
    expect(isObjectLike(undefined)).toBe(false)
    expect(isObjectLike(null)).toBe(false)
    expect(isObjectLike('')).toBe(false)
    expect(isObjectLike('abc')).toBe(false)
    expect(isObjectLike(false)).toBe(false)
    expect(isObjectLike(true)).toBe(false)
    expect(isObjectLike(0)).toBe(false)
    expect(isObjectLike(-1)).toBe(false)
    expect(isObjectLike(1)).toBe(false)
    expect(isObjectLike(NaN)).toBe(false)
    expect(isObjectLike(Infinity)).toBe(false)
    expect(isObjectLike(-Infinity)).toBe(false)
    expect(isObjectLike(function() {})).toBe(false)
    expect(isObjectLike(async () => {})).toBe(false)
    expect(isObjectLike(async function() {})).toBe(false)
    expect(isObjectLike(function*() {})).toBe(false)
    expect(isObjectLike(new Function('a', 'b', 'return a + b'))).toBe(false)
  })
})
