import isResolved from './isResolved'

describe('isResolved', () => {
  test('returns false for Op', () => {
    expect(
      isResolved({
        ['@@redux-saga/IO']: 'op'
      })
    ).toBe(false)
  })

  test('returns false for Generator', () => {
    const generator = (function*() {})()
    expect(isResolved(generator)).toBe(false)
  })

  test('returns false for Promise', () => {
    const promise = new Promise(() => {})
    expect(isResolved(promise)).toBe(false)
  })

  test('returns false for object with resolve method', () => {
    expect(isResolved({ resolve: () => 'foo' })).toBe(false)
  })

  test('returns true for all other values', () => {
    expect(isResolved(null)).toBe(true)
    expect(isResolved(undefined)).toBe(true)
    expect(isResolved('')).toBe(true)
    expect(isResolved('abc')).toBe(true)
    expect(isResolved(false)).toBe(true)
    expect(isResolved(true)).toBe(true)
    expect(isResolved(0)).toBe(true)
    expect(isResolved(-1)).toBe(true)
    expect(isResolved(1)).toBe(true)
    expect(isResolved(NaN)).toBe(true)
    expect(isResolved(Infinity)).toBe(true)
    expect(isResolved(-Infinity)).toBe(true)
    expect(isResolved([])).toBe(true)
    expect(isResolved({})).toBe(true)
    expect(isResolved(() => {})).toBe(true)
  })
})
