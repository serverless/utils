import isArray from './isArray'

describe('isArray', () => {
  test('identifies arrays', () => {
    expect(isArray([])).toBe(true)
    expect(isArray(new Array(0))).toBe(true)
    expect(isArray([0])).toBe(true)
  })

  test('returns false for all other values', () => {
    expect(isArray(undefined)).toBe(false)
    expect(isArray(null)).toBe(false)
    expect(isArray('')).toBe(false)
    expect(isArray('abc')).toBe(false)
    expect(isArray(false)).toBe(false)
    expect(isArray(true)).toBe(false)
    expect(isArray(0)).toBe(false)
    expect(isArray(-1)).toBe(false)
    expect(isArray(1)).toBe(false)
    expect(isArray(NaN)).toBe(false)
    expect(isArray(Infinity)).toBe(false)
    expect(isArray(-Infinity)).toBe(false)
    expect(isArray({})).toBe(false)
    expect(isArray(() => {})).toBe(false)
  })
})
