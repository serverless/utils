import isUndefined from './isUndefined'

describe('isUndefined', () => {
  test('returns true for undefined', () => {
    expect(isUndefined(undefined)).toBe(true)
  })

  test('returns false for all other values', () => {
    expect(isUndefined(null)).toBe(false)
    expect(isUndefined('')).toBe(false)
    expect(isUndefined('abc')).toBe(false)
    expect(isUndefined(false)).toBe(false)
    expect(isUndefined(true)).toBe(false)
    expect(isUndefined(0)).toBe(false)
    expect(isUndefined(-1)).toBe(false)
    expect(isUndefined(1)).toBe(false)
    expect(isUndefined(NaN)).toBe(false)
    expect(isUndefined(Infinity)).toBe(false)
    expect(isUndefined(-Infinity)).toBe(false)
    expect(isUndefined([])).toBe(false)
    expect(isUndefined({})).toBe(false)
    expect(isUndefined(() => {})).toBe(false)
  })
})
