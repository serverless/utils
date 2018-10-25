import arrayLikeReduceRight from './arrayLikeReduceRight'

describe('arrayLikeReduceRight', () => {
  test('reduces array right to left', () => {
    const values = ['foo', 'bar', 'baz']
    const result = arrayLikeReduceRight(values, '', (acc, value) => acc + value)
    expect(result).toEqual('bazbarfoo')
  })

  test('calls reducer with index', () => {
    const values = ['foo', 'bar', 'baz']
    const reducer = jest.fn((identity) => identity)
    const result = arrayLikeReduceRight(values, '', reducer)
    expect(reducer).toHaveBeenNthCalledWith(1, '', 'baz', 2)
    expect(reducer).toHaveBeenNthCalledWith(2, '', 'bar', 1)
    expect(reducer).toHaveBeenNthCalledWith(3, '', 'foo', 0)
    expect(result).toBe('')
  })

  test('upgrades to a Promise when an async iteratee is used', async () => {
    const array = ['a', 'b', 'c']
    let result = arrayLikeReduceRight(
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
    expect(result).toEqual([['c', 2], ['b', 1], ['a', 0]])
  })
})
