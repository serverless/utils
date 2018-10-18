import reject from './reject'

describe('reject', () => {
  test('rejects values in array', () => {
    const array = ['a', 'b', 'c']
    const result = reject((val, index) => val === 'b' && index === 1, array)
    expect(result).toEqual(['a', 'c'])
  })

  test('rejects values in string', () => {
    const string = 'abcbd'
    const result = reject((val) => val !== 'b', string)
    expect(result).toBe('bb')
  })

  test('rejects values in object', () => {
    const object = { a: 'a', b: 'b', c: 'c' }
    const result = reject((val, key) => val === 'b' && key === 'b', object)
    expect(result).toEqual({
      a: 'a',
      c: 'c'
    })
  })

  test('returns array with original values when no values are rejected in an array', () => {
    const array = ['a', 'b', 'c']
    const result = reject((val) => val === 'd', array)
    expect(result).toEqual(['a', 'b', 'c'])
  })

  test('returns original string when no values are rejected in a string', () => {
    const string = 'abc'
    const result = reject((val) => val === 'd', string)
    expect(result).toBe('abc')
  })

  test('returns object with original keys and values when no values are rejected in an object', () => {
    const object = { a: 'a', b: 'b', c: 'c' }
    const result = reject((val) => val === 'd', object)
    expect(result).toEqual({ a: 'a', b: 'b', c: 'c' })
  })

  test('upgrades to a Promise when an async predicate is used', async () => {
    const array = ['a', 'b', 'c']
    let result = reject(
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
    expect(result).toEqual(['a', 'c'])
  })
})
