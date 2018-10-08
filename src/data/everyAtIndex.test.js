import everyAtIndex from './everyAtIndex'

describe('everyAtIndex', () => {
  test('returns true when every element in array asserts true', () => {
    const array = ['b', 'b', 'b']
    const result = everyAtIndex((val, index) => val === 'b' && index <= 2, 0, array)
    expect(result).toBe(true)
  })

  test('throws when passed a value that is not array like', () => {
    expect(() => everyAtIndex(() => true, 0, {})).toThrow(
      expect.objectContaining({
        message: expect.any(String),
        type: 'UnexpectedType'
      })
    )
    expect(() => everyAtIndex(() => true, 0, null)).toThrow(
      expect.objectContaining({
        message: expect.any(String),
        type: 'UnexpectedType'
      })
    )
  })

  test('returns false if one value is does not pass predicate', () => {
    const array = ['b', 'b', 'c']
    const result = everyAtIndex((val) => val === 'b', 0, array)
    expect(result).toBe(false)
  })

  test('starts at the given index', () => {
    const array = ['b', 'b', 'b']
    const predicate = jest.fn((value) => value === 'b')
    const result = everyAtIndex(predicate, 1, array)
    expect(predicate).toHaveBeenNthCalledWith(1, 'b', 1)
    expect(predicate).toHaveBeenNthCalledWith(2, 'b', 2)
    expect(predicate).toHaveBeenCalledTimes(2)
    expect(result).toBe(true)
  })

  test('stops when a false assertion is found', () => {
    const array = ['b', 'c', 'b']
    const predicate = jest.fn((value) => value === 'b')
    const result = everyAtIndex(predicate, 0, array)
    expect(predicate).toHaveBeenNthCalledWith(1, 'b', 0)
    expect(predicate).toHaveBeenNthCalledWith(2, 'c', 1)
    expect(predicate).toHaveBeenCalledTimes(2)
    expect(result).toBe(false)
  })

  test('starts at the length minus the given index if index is negative', () => {
    const array = ['b', 'b', 'c']
    const predicate = jest.fn((value) => value === 'd')
    const result = everyAtIndex(predicate, -1, array)
    expect(predicate).toHaveBeenNthCalledWith(1, 'c', 2)
    expect(predicate).toHaveBeenCalledTimes(1)
    expect(result).toBe(false)
  })

  test('starts at 0 if the length minus the given index is still negative', () => {
    const array = ['b', 'b', 'b']
    const predicate = jest.fn((value) => value === 'b')
    const result = everyAtIndex(predicate, -4, array)
    expect(predicate).toHaveBeenNthCalledWith(1, 'b', 0)
    expect(predicate).toHaveBeenNthCalledWith(2, 'b', 1)
    expect(predicate).toHaveBeenNthCalledWith(3, 'b', 2)
    expect(predicate).toHaveBeenCalledTimes(3)
    expect(result).toBe(true)
  })

  test('upgrades to a Promise when an async predicate is used', async () => {
    const array = ['b', 'b', 'b']
    let result = everyAtIndex(
      (val, index) =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(val === 'b' && index <= 2)
          }, 0)
        }),
      0,
      array
    )

    expect(result).toBeInstanceOf(Promise)

    result = await result
    expect(result).toBe(true)
  })
})
