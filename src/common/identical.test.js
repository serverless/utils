import identical from './identical'

describe('identical', () => {
  test('returns true for primitive values', () => {
    expect(identical(undefined, undefined)).toBe(true)
    expect(identical(null, null)).toBe(true)
    expect(identical('', '')).toBe(true)
    expect(identical('abc', 'abc')).toBe(true)
    expect(identical(0, 0)).toBe(true)
    expect(identical(-1, -1)).toBe(true)
    expect(identical(1, 1)).toBe(true)
    expect(identical(true, true)).toBe(true)

    expect(identical(false, false)).toBe(true)
    expect(identical(Infinity, Infinity)).toBe(true)
    expect(identical(-Infinity, -Infinity)).toBe(true)
  })

  test('primitives are not identical to native objects of the same value', () => {
    expect(identical(new Boolean(true), true)).toBe(false)
    expect(identical(new String(''), '')).toBe(false)
    expect(identical(new Number(0), 0)).toBe(false)
  })

  test('returns true for NaN', () => {
    expect(identical(NaN, NaN)).toBe(true)
  })

  test('returns true for two references to the same object instance', () => {
    const object = {}
    expect(identical(object, object)).toBe(true)
  })

  test('returns false for two equal objects that are different instances', () => {
    expect(identical({ foo: 'bar' }, { foo: 'bar' })).toBe(false)
  })

  test('returns false for 0 and -0', () => {
    expect(identical(0, -0)).toBe(false)
  })

  test('returns false for undefined and null', () => {
    expect(identical(undefined, null)).toBe(false)
  })
})
