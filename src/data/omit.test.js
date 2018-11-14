import omit from './omit'

describe('omit', () => {
  test('omits the given props from an object', () => {
    expect(omit(['a', 'd'], { a: 1, b: 2, c: 3, d: 4 })).toEqual({ b: 2, c: 3 })
  })

  test('ignores properties that are not on the object', () => {
    expect(omit(['a', 'e', 'f'], { a: 1, b: 2, c: 3, d: 4 })).toEqual({ b: 2, c: 3, d: 4 })
  })

  test('upgrades to a Promise when a Promise is received as a parameter', async () => {
    expect(
      await omit(Promise.resolve(['a', 'd']), Promise.resolve({ a: 1, b: 2, c: 3, d: 4 }))
    ).toEqual({ b: 2, c: 3 })
  })
})
