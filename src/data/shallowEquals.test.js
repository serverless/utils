import shallowEquals from './shallowEquals'

describe('shallowEquals', () => {
  test('shallowEquals returns true if arguments are equal, without comparing properties', () => {
    const throwOnAccess = {
      get foo() {
        throw new Error('Property was accessed')
      }
    }
    expect(shallowEquals(throwOnAccess, throwOnAccess)).toBe(true)
  })

  test('shallowEquals returns true if arguments fields are equal', () => {
    expect(shallowEquals({ a: 1, b: 2, c: undefined }, { a: 1, b: 2, c: undefined })).toBe(true)

    expect(shallowEquals({ a: 1, b: 2, c: 3 }, { a: 1, b: 2, c: 3 })).toBe(true)

    const object = {}
    expect(shallowEquals({ a: 1, b: 2, c: object }, { a: 1, b: 2, c: object })).toBe(true)
  })

  test('shallowEquals returns false if either argument is null or undefined', () => {
    expect(shallowEquals(null, { a: 1, b: 2 })).toBe(false)
    expect(shallowEquals({ a: 1, b: 2 }, null)).toBe(false)
  })

  test('shallowEquals returns false if first argument has too many keys', () => {
    expect(shallowEquals({ a: 1, b: 2, c: 3 }, { a: 1, b: 2 })).toBe(false)
  })

  test('shallowEquals returns false if second argument has too many keys', () => {
    expect(shallowEquals({ a: 1, b: 2 }, { a: 1, b: 2, c: 3 })).toBe(false)
  })

  test('shallowEquals returns false if arguments have different keys', () => {
    expect(shallowEquals({ a: 1, b: 2, c: undefined }, { a: 1, bb: 2, c: undefined })).toBe(false)
  })
})
