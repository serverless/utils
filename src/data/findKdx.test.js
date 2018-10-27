import findKdx from './findKdx'

describe('findKdx', () => {
  test('finds index in array', () => {
    const array = ['a', 'b', 'c']
    const result = findKdx((val) => val === 'b', array)
    expect(result).toBe(1)
  })

  test('sends index in array', () => {
    const array = ['a', 'b', 'c']
    const fn = jest.fn((val) => val === 'd')
    const result = findKdx(fn, array)
    expect(result).toBe(undefined)
    expect(fn).toHaveBeenNthCalledWith(1, 'a', 0)
    expect(fn).toHaveBeenNthCalledWith(2, 'b', 1)
    expect(fn).toHaveBeenNthCalledWith(3, 'c', 2)
  })

  test('finds key in object', () => {
    const object = { a: 1, b: 2, c: 3 }
    const result = findKdx((val) => val === 2, object)
    expect(result).toBe('b')
  })

  test('returns undefined if no index is found in array', () => {
    const array = ['a', 'b', 'c']
    const result = findKdx((val) => val === 'd', array)
    expect(result).toBe(undefined)
  })

  test('returns undefined if no key is found in object', () => {
    const object = { a: 1, b: 2, c: 3 }
    const result = findKdx((val) => val === 4, object)
    expect(result).toBe(undefined)
  })

  test('upgrades to a Promise when an async predicate is used', async () => {
    const array = ['a', 'b', 'c']
    let result = findKdx(
      (val) =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(val === 'b')
          }, 0)
        }),
      array
    )

    expect(result).toBeInstanceOf(Promise)

    result = await result
    expect(result).toBe(1)
  })
})
