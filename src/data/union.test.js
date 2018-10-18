import union from './union'

describe('union', () => {
  test('unions two empty arrays as an empty array', () => {
    expect(union([], [])).toEqual([])
  })

  test('unions two arrays', () => {
    expect(union([1, 2], [3, 4])).toEqual([1, 2, 3, 4])
  })

  test('eliminates duplicates from left and right', () => {
    expect(union([1, 1, 2], [2, 3, 3])).toEqual([1, 2, 3])
  })

  test('upgrades to a Promise when a Promise is received as a parameter', async () => {
    expect(await union(Promise.resolve(['abc']), Promise.resolve(['def']))).toEqual(['abc', 'def'])
  })
})
