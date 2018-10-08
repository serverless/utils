import filter from './filter'

describe('filter', () => {
  test('filters values in array', () => {
    const array = ['a', 'b', 'c']
    const result = filter((val, index) => val === 'b' && index === 1, array)
    expect(result).toEqual(['b'])
  })

  test('filters values in string', () => {
    const string = 'abcbd'
    const result = filter((val) => val !== 'b', string)
    expect(result).toBe('acd')
  })

  test('filters values in object', () => {
    const object = { a: 'a', b: 'b', c: 'c' }
    const result = filter((val, key) => val === 'b' && key === 'b', object)
    expect(result).toEqual({
      b: 'b'
    })
  })

  test('returns empty array when no values are matched in an array', () => {
    const array = ['a', 'b', 'c']
    const result = filter((val) => val === 'd', array)
    expect(result).toEqual([])
  })

  test('returns empty string when no values are matched in a string', () => {
    const string = 'abc'
    const result = filter((val) => val === 'd', string)
    expect(result).toBe('')
  })

  test('returns empty object when no values are matched in an object', () => {
    const object = { a: 'a', b: 'b', c: 'c' }
    const result = filter((val) => val === 'd', object)
    expect(result).toEqual({})
  })

  test('upgrades to a Promise when an async predicate is used', async () => {
    const array = ['a', 'b', 'c']
    let result = filter(
      (val, index) =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(val === 'b' && index === 1)
          }, 0)
        }),
      array
    )

    expect(result).toBeInstanceOf(Promise)

    result = await result
    expect(result).toEqual(['b'])
  })
})
