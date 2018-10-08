import pick from './pick'

describe('pick', () => {
  test('picks the given props from an object', () => {
    expect(pick(['a', 'd'], { a: 1, b: 2, c: 3, d: 4 })).toEqual({ a: 1, d: 4 })
  })

  test('does not include properties that are not found in the object', () => {
    expect(pick(['a', 'e', 'f'], { a: 1, b: 2, c: 3, d: 4 })).toEqual({ a: 1 })
  })

  test('upgrades to a Promise when a Promise is received as a parameter', async () => {
    expect(
      await pick(Promise.resolve(['a', 'd']), Promise.resolve({ a: 1, b: 2, c: 3, d: 4 }))
    ).toEqual({ a: 1, d: 4 })
  })
})
