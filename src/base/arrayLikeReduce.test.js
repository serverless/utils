import arrayLikeReduce from './arrayLikeReduce'

describe('arrayLikeReduce', () => {
  test('reduces array left to right', () => {
    const values = ['foo', 'bar', 'baz']
    const result = arrayLikeReduce(values, '', (acc, value) => acc + value)
    expect(result).toEqual('foobarbaz')
  })

  test('calls reducer with index', () => {
    const values = ['foo', 'bar', 'baz']
    const reducer = jest.fn((identity) => identity)
    const result = arrayLikeReduce(values, '', reducer)
    expect(reducer).toHaveBeenNthCalledWith(1, '', 'foo', 0)
    expect(reducer).toHaveBeenNthCalledWith(2, '', 'bar', 1)
    expect(reducer).toHaveBeenNthCalledWith(3, '', 'baz', 2)
    expect(result).toBe('')
  })

  test('upgrades to a Promise when an async iteratee is used', async () => {
    const array = ['a', 'b', 'c']
    let result = arrayLikeReduce(
      array,
      [],
      (acc, val, index) =>
        new Promise((resolve) => {
          setTimeout(() => {
            acc.push([val, index])
            resolve(acc)
          }, 0)
        })
    )

    expect(result).toBeInstanceOf(Promise)
    result = await result
    expect(result).toEqual([['a', 0], ['b', 1], ['c', 2]])
  })
})
