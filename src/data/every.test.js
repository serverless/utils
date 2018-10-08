import every from './every'

describe('every', () => {
  test('returns true for case where every element in an array asserts true', () => {
    const array = [0, 1, 2, 3, 4]
    const result = every((value) => value <= 4, array)
    expect(result).toBe(true)
  })

  test('returns false for case where not every element in an array asserts true', () => {
    const array = [0, 1, 2, 3, 4, 5]
    const result = every((value) => value <= 4, array)
    expect(result).toBe(false)
  })

  test('returns true for empty array', () => {
    const array = []
    const result = every((value) => value === 'd', array)
    expect(result).toBe(true)
  })

  test('returns true for case where every value in an object asserts true', () => {
    const object = { a: 0, b: 1, c: 2, d: 3 }
    const result = every((value) => value < 4, object)
    expect(result).toBe(true)
  })

  test('returns false for case where not every value in an object asserts true', () => {
    const object = { a: 0, b: 1, c: 2, d: 3, e: 4 }
    const result = every((value) => value < 4, object)
    expect(result).toBe(false)
  })

  test('returns true for empty object', () => {
    const object = {}
    const result = every((value) => value === 'd', object)
    expect(result).toBe(true)
  })

  test('upgrades to a Promise when an async predicate is used', async () => {
    const array = ['b', 'b', 'b']
    let result = every(
      (value, index) =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(value === 'b' && index <= 2)
          }, 0)
        }),
      array
    )

    expect(result).toBeInstanceOf(Promise)

    result = await result
    expect(result).toBe(true)
  })
})
