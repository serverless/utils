import and from './and'

describe('and', () => {
  test('and returns truthy right value when both are true', () => {
    expect(and(true, true)).toBe(true)
    expect(and(true, 1)).toBe(1)
    expect(and(true, 'abc')).toBe('abc')
    const object = {}
    expect(and(true, object)).toBe(object)
    const array = []
    expect(and(true, array)).toBe(array)
  })

  test('and returns falsy left value when left is falsy and right is truthy', () => {
    expect(and(false, true)).toBe(false)
    expect(and(undefined, true)).toBe(undefined)
    expect(and(null, true)).toBe(null)
    expect(and(0, true)).toBe(0)
    expect(and('', true)).toBe('')
    expect(and(NaN, true)).toBe(NaN)
  })

  test('and returns falsy right value when left is truthy and right is falsy', () => {
    expect(and(true, false)).toBe(false)
    expect(and(true, undefined)).toBe(undefined)
    expect(and(true, null)).toBe(null)
    expect(and(true, 0)).toBe(0)
    expect(and(true, '')).toBe('')
    expect(and(true, NaN)).toBe(NaN)
  })

  test('and returns falsey left value when both are false', () => {
    expect(and(false, null)).toBe(false)
    expect(and(undefined, false)).toBe(undefined)
    expect(and(null, false)).toBe(null)
    expect(and(0, false)).toBe(0)
    expect(and('', false)).toBe('')
    expect(and(NaN, false)).toBe(NaN)
  })

  test('curries method', () => {
    const identity = and(true)
    expect(identity(1)).toBe(1)
  })

  test('upgrades to async with a Promise is received', async () => {
    const result = and(Promise.resolve(true), false)
    expect(result).toBeInstanceOf(Promise)
    expect(await result).toBe(false)
  })
})
