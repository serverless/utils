import any from './any'

describe('any', () => {
  test('any matches value in array', () => {
    const array = ['a', 'b', 'c']
    const result = any((val, index) => val === 'b' && index === 1, array)
    expect(result).toBe(true)
  })

  test('any matches value in object', () => {
    const object = { a: 'a', b: 'b', c: 'c' }
    const result = any((val, key) => val === 'b' && key === 'b', object)
    expect(result).toBe(true)
  })

  test('returns false if no value is matched', () => {
    const array = ['a', 'b', 'c']
    const result = any((val) => val === 'd', array)
    expect(result).toBe(false)
  })

  test('upgrades to a Promise when an async predicate is used', async () => {
    const array = ['a', 'b', 'c']
    let result = any(
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
    expect(result).toBe(true)
  })
})
