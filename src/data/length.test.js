import length from './length'

describe('length', () => {
  test('returns the length of an array', () => {
    expect(length([])).toBe(0)
    expect(length(['a'])).toBe(1)
    expect(length(['a', 'b'])).toBe(2)
  })

  test('returns the length of a string', () => {
    expect(length('')).toBe(0)
    expect(length('a')).toBe(1)
    expect(length('ab')).toBe(2)
  })

  test('returns the length of a object with a length property that has a valid length integer', () => {
    expect(length({ length: 0 })).toBe(0)
    expect(length({ length: 1 })).toBe(1)
    expect(length({ length: 2 })).toBe(2)
  })

  test('throws for non array like values', () => {
    expect(() => length(false)).toThrow(/^length method expects list to be ArrayLike/)
    expect(() => length(null)).toThrow(/^length method expects list to be ArrayLike/)
    expect(() => length(undefined)).toThrow(/^length method expects list to be ArrayLike/)
    expect(() => length(123)).toThrow(/^length method expects list to be ArrayLike/)
    expect(() => length({ length: -1 })).toThrow(/^length method expects list to be ArrayLike/)
  })

  test('dispatches to the length method if present', () => {
    expect(length({ length: () => 0 })).toBe(0)
  })
})
