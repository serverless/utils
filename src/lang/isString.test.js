import isString from './isString'

describe('isString', () => {
  test('returns true for plain strings', () => {
    expect(isString('')).toBe(true)
    expect(isString('abc')).toBe(true)
  })

  test('returns true for String objects', () => {
    expect(isString(new String())).toBe(true)
    expect(isString(new String(''))).toBe(true)
    expect(isString(new String('abc'))).toBe(true)
  })

  test('returns false for all other values', () => {
    expect(isString(undefined)).toBe(false)
    expect(isString(null)).toBe(false)
    expect(isString(false)).toBe(false)
    expect(isString(true)).toBe(false)
    expect(isString(0)).toBe(false)
    expect(isString(-1)).toBe(false)
    expect(isString(1)).toBe(false)
    expect(isString(-1.2)).toBe(false)
    expect(isString(1.2)).toBe(false)
    expect(isString(NaN)).toBe(false)
    expect(isString(Infinity)).toBe(false)
    expect(isString(-Infinity)).toBe(false)
    expect(isString(new Date())).toBe(false)
    expect(isString(/.*/)).toBe(false)
    expect(isString([])).toBe(false)
    expect(isString({})).toBe(false)
    expect(isString(() => {})).toBe(false)
  })
})
