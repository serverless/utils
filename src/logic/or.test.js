import or from './or'

describe('or', () => {
  test('returns truthy left value when both are true', () => {
    expect(or(true, true)).toBe(true)
    expect(or(1, true)).toBe(1)
    expect(or('abc', true)).toBe('abc')
    const object = {}
    expect(or(object, true)).toBe(object)
    const array = []
    expect(or(array, true)).toBe(array)
  })

  test('returns truthy right value when left is falsy and right is truthy', () => {
    expect(or(false, true)).toBe(true)
    expect(or(undefined, true)).toBe(true)
    expect(or(null, true)).toBe(true)
    expect(or(0, true)).toBe(true)
    expect(or('', true)).toBe(true)
    expect(or(NaN, true)).toBe(true)
  })

  test('returns truthy left value when left is truthy and right is falsy', () => {
    expect(or(true, false)).toBe(true)
    expect(or(true, undefined)).toBe(true)
    expect(or(true, null)).toBe(true)
    expect(or(true, 0)).toBe(true)
    expect(or(true, '')).toBe(true)
    expect(or(true, NaN)).toBe(true)
  })

  test('or returns falsey right value when both are false', () => {
    expect(or(false, false)).toBe(false)
    expect(or(false, undefined)).toBe(undefined)
    expect(or(false, null)).toBe(null)
    expect(or(false, 0)).toBe(0)
    expect(or(false, '')).toBe('')
    expect(or(false, NaN)).toBe(NaN)
  })

  test('handles multiple values', () => {
    expect(or(false, false)).toBe(false)
    expect(or(false, false, undefined)).toBe(undefined)
    expect(or(false, false, false, null)).toBe(null)
    expect(or(false, false, false, false, 0)).toBe(0)
  })

  test('curries method', () => {
    const alwaysTrue = or(true)
    expect(alwaysTrue(1)).toBe(true)
  })

  test('upgrades to async when a Promise is received', async () => {
    const result = or(Promise.resolve(false), false)
    expect(result).toBeInstanceOf(Promise)
    expect(await result).toBe(false)
  })

  test('returns the last Promise value if all resolve to false', async () => {
    const result = or(Promise.resolve(false), Promise.resolve(false), Promise.resolve(null))
    expect(result).toBeInstanceOf(Promise)
    expect(await result).toBe(null)
  })
})
