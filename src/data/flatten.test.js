import __ from '../common/__'
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

  test('handles strings', () => {
    const result = flatten(['foo', 'bar', ['baz', ['bim', 'bop']]])
    expect(result).toEqual(['foo', 'bar', 'baz', 'bim', 'bop'])
  })

  test('upgrades to promise when given a Promise', async () => {
    let result = flatten(Promise.resolve(['foo', ['bar', [1, 'baz']]]))
    expect(result).toBeInstanceOf(Promise)
    result = await result
    expect(result).toEqual(['foo', 'bar', 1, 'baz'])
  })

  test('curries method with a placeholder', () => {
    const flattenP = flatten(__)
    expect(flattenP([123, 'bar', ['baz']])).toEqual([123, 'bar', 'baz'])
  })
})
