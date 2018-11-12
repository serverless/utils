import arrayLikeSlice from './arrayLikeSlice'

describe('arrayLikeSlice', () => {
  test('slices from an array', () => {
    expect(arrayLikeSlice([1, 2, 3], 0, 0)).toEqual([])
    expect(arrayLikeSlice([1, 2, 3], 0, 1)).toEqual([1])
    expect(arrayLikeSlice([1, 2, 3], 0, 2)).toEqual([1, 2])
    expect(arrayLikeSlice([1, 2, 3], 0, 3)).toEqual([1, 2, 3])
    expect(arrayLikeSlice([1, 2, 3], 1, 1)).toEqual([])
    expect(arrayLikeSlice([1, 2, 3], 1, 2)).toEqual([2])
    expect(arrayLikeSlice([1, 2, 3], 1, 3)).toEqual([2, 3])
    expect(arrayLikeSlice([1, 2, 3], 2, 2)).toEqual([])
    expect(arrayLikeSlice([1, 2, 3], 2, 3)).toEqual([3])
    expect(arrayLikeSlice([1, 2, 3], 3, 3)).toEqual([])
  })

  test('slices from a string', () => {
    expect(arrayLikeSlice('abc', 0, 0)).toEqual('')
    expect(arrayLikeSlice('abc', 0, 1)).toEqual('a')
    expect(arrayLikeSlice('abc', 0, 2)).toEqual('ab')
    expect(arrayLikeSlice('abc', 0, 3)).toEqual('abc')
    expect(arrayLikeSlice('abc', 1, 1)).toEqual('')
    expect(arrayLikeSlice('abc', 1, 2)).toEqual('b')
    expect(arrayLikeSlice('abc', 1, 3)).toEqual('bc')
    expect(arrayLikeSlice('abc', 2, 2)).toEqual('')
    expect(arrayLikeSlice('abc', 2, 3)).toEqual('c')
    expect(arrayLikeSlice('abc', 3, 3)).toEqual('')
  })

  test('Throws when arrayLike parameter is not an array like value', () => {
    const errorRegex = /^arrayLikeSlice method expected/
    expect(() => arrayLikeSlice({})).toThrow(errorRegex)
    expect(() => arrayLikeSlice(undefined)).toThrow(errorRegex)
  })
})
