import isTransformer from './isTransformer'

describe('isTransformer', () => {
  test('identifies a transformer from basic object', () => {
    const testTransformer = {
      ['@@transducer/step']: () => {}
    }
    expect(isTransformer(testTransformer)).toBe(true)
  })

  test('returns false for all other values', () => {
    expect(isTransformer(undefined)).toBe(false)
    expect(isTransformer(null)).toBe(false)
    expect(isTransformer('')).toBe(false)
    expect(isTransformer('abc')).toBe(false)
    expect(isTransformer(false)).toBe(false)
    expect(isTransformer(true)).toBe(false)
    expect(isTransformer(0)).toBe(false)
    expect(isTransformer(-1)).toBe(false)
    expect(isTransformer(1)).toBe(false)
    expect(isTransformer(NaN)).toBe(false)
    expect(isTransformer(Infinity)).toBe(false)
    expect(isTransformer(-Infinity)).toBe(false)
    expect(isTransformer([])).toBe(false)
    expect(isTransformer({})).toBe(false)
    expect(isTransformer(() => {})).toBe(false)
  })
})
