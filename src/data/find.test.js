import find from './find'

describe('find', () => {
  test('finds value in array', () => {
    const array = ['a', 'b', 'c']
    const result = find((val, index) => val === 'b' && index === 1, array)
    expect(result).toBe('b')
  })

  test('finds value in object', () => {
    const object = { a: 'a', b: 'b', c: 'c' }
    const result = find((val, key) => val === 'b' && key === 'b', object)
    expect(result).toBe('b')
  })

  test('returns undefined if no value is found', () => {
    const array = ['a', 'b', 'c']
    const result = find((val) => val === 'd', array)
    expect(result).toBe(undefined)
  })

  test('upgrades to a Promise when an async predicate is used', async () => {
    const array = ['a', 'b', 'c']
    let result = find(
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
    expect(result).toBe('b')
  })
})
