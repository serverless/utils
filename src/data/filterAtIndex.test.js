import filterAtIndex from './filterAtIndex'

describe('filterAtIndex', () => {
  test('returns true when value in array asserts true', () => {
    const array = ['a', 'b', 'c']
    const result = filterAtIndex((val, index) => val === 'b' && index === 1, 0, array)
    expect(result).toEqual(['b'])
  })

  test('throws when passed a value that is not array like', () => {
    expect(() => filterAtIndex(() => true, 0, {})).toThrow(
      expect.objectContaining({
        message: expect.any(String),
        type: 'UnexpectedType'
      })
    )
    expect(() => filterAtIndex(() => true, 0, null)).toThrow(
      expect.objectContaining({
        message: expect.any(String),
        type: 'UnexpectedType'
      })
    )
  })

  test('returns empty array if no value is matched', () => {
    const array = ['a', 'b', 'c']
    const result = filterAtIndex((val) => val === 'd', 0, array)
    expect(result).toEqual([])
  })

  test('starts at the given index', () => {
    const array = ['a', 'b', 'c']
    const predicate = jest.fn((value) => value === 'd')
    const result = filterAtIndex(predicate, 1, array)
    expect(predicate).toHaveBeenNthCalledWith(1, 'b', 1)
    expect(predicate).toHaveBeenNthCalledWith(2, 'c', 2)
    expect(predicate).toHaveBeenCalledTimes(2)
    expect(result).toEqual([])
  })

  test('starts at the length minus the given index if index is negative', () => {
    const array = ['a', 'b', 'c']
    const predicate = jest.fn((value) => value === 'd')
    const result = filterAtIndex(predicate, -1, array)
    expect(predicate).toHaveBeenNthCalledWith(1, 'c', 2)
    expect(predicate).toHaveBeenCalledTimes(1)
    expect(result).toEqual([])
  })

  test('starts at 0 if the length minus the given index is still negative', () => {
    const array = ['a', 'b', 'c']
    const predicate = jest.fn((value) => value === 'd')
    const result = filterAtIndex(predicate, -4, array)
    expect(predicate).toHaveBeenNthCalledWith(1, 'a', 0)
    expect(predicate).toHaveBeenNthCalledWith(2, 'b', 1)
    expect(predicate).toHaveBeenNthCalledWith(3, 'c', 2)
    expect(predicate).toHaveBeenCalledTimes(3)
    expect(result).toEqual([])
  })

  test('upgrades to a Promise when an async predicate is used', async () => {
    const array = ['a', 'b', 'c']
    let result = filterAtIndex(
      (val, index) =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(val === 'b' && index === 1)
          }, 0)
        }),
      0,
      array
    )

    expect(result).toBeInstanceOf(Promise)

    result = await result
    expect(result).toEqual(['b'])
  })
})
