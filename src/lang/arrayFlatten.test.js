import arrayFlatten from './arrayFlatten'

describe('arrayFlatten', () => {
  test('flattens deep arrays', () => {
    const result = arrayFlatten([1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]])
    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
  })

  test('handles empty array', () => {
    const result = arrayFlatten([])
    expect(result).toEqual([])
  })

  test('handles strings in arrays', () => {
    const result = arrayFlatten(['foo', 'bar', ['baz', ['bim', 'bop']]])
    expect(result).toEqual(['foo', 'bar', 'baz', 'bim', 'bop'])
  })

  test('Throws when array parameter is not an array', () => {
    const errorRegex = /^arrayFlatten method expected/
    expect(() => arrayFlatten({})).toThrow(errorRegex)
    expect(() => arrayFlatten(undefined)).toThrow(errorRegex)
    expect(() => arrayFlatten('abc')).toThrow(errorRegex)
  })
})
