import compact from './compact'

describe('compact', () => {
  test('compacts values in array', () => {
    const array = ['a', null, 'b', undefined, 'c', 0, false]
    expect(compact(array)).toEqual(['a', null, 'b', 'c', 0, false])
  })

  test('returns empty array when all values are nil', () => {
    const array = [undefined]
    const result = compact(array)
    expect(result).toEqual([])
  })

  test('returns empty array when given an empty array', () => {
    const array = []
    const result = compact(array)
    expect(result).toEqual([])
  })

  test('upgrades to a Promise when a Promise is given as a parameter', async () => {
    const array = Promise.resolve(['a', 'b', 'c'])
    let result = compact(array)

    expect(result).toBeInstanceOf(Promise)

    result = await result
    expect(result).toEqual(['a', 'b', 'c'])
  })

  test('dispatches to the compact method of the last argument', () => {
    const value = {
      compact() {
        return compact(this.list)
      },
      list: ['a', null, undefined]
    }
    expect(compact(value)).toEqual(['a', null])
  })
})
