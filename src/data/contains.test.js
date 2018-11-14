import contains from './contains'

describe('contains', () => {
  test('returns true if value exists in array', () => {
    expect(contains('a', ['a', 'b', 'c'])).toBe(true)
  })

  test('upgrades to a Promise when a Promise is received as a parameter', async () => {
    expect(await contains(Promise.resolve(1), Promise.resolve([1, 2, 3]))).toBe(true)
  })
})
