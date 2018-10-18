import flatten from './flatten'

describe('flatten', () => {
  test('flattens deep arrays', () => {
    const result = flatten([1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]])
    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
  })

  test('handles empty array', () => {
    const result = flatten([])
    expect(result).toEqual([])
  })
})
