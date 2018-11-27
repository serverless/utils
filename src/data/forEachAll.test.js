import forEachAll from './forEachAll'

describe('forEachAll', () => {
  test('forEachAll value in array', () => {
    const array = ['a', 'b', 'c']
    const acc = []
    const result = forEachAll((val, index) => acc.push([val, index]), array)
    expect(acc).toEqual([['a', 0], ['b', 1], ['c', 2]])
    expect(result).toBe(array)
  })

  test('forEachAll value in object', () => {
    const object = { a: 'valueA', b: 'valueB', c: 'valueC' }
    const acc = []
    const result = forEachAll((val, key) => acc.push([val, key]), object)
    expect(acc).toEqual([['valueA', 'a'], ['valueB', 'b'], ['valueC', 'c']])
    expect(result).toBe(object)
  })

  test('forEachAll value in object with symbols as keys', () => {
    const symA = Symbol('a')
    const symB = Symbol('b')
    const object = { [symA]: 'valueA', [symB]: 'valueB' }
    const acc = []
    const result = forEachAll((val, key) => acc.push([val, key]), object)
    expect(acc).toEqual([['valueA', symA], ['valueB', symB]])
    expect(result).toBe(object)
  })

  test('upgrades to a Promise when an async iteratee is used', async () => {
    const array = ['a', 'b', 'c']
    const acc = []
    let result = forEachAll(
      (val, index) =>
        new Promise((resolve) => {
          setTimeout(() => {
            acc.push([val, index])
            resolve()
          }, 0)
        }),
      array
    )

    expect(result).toBeInstanceOf(Promise)
    result = await result
    expect(acc).toEqual([['a', 0], ['b', 1], ['c', 2]])
    expect(result).toBe(array)
  })

  test('executes async in parallel', async () => {
    const array = ['a', 'b', 'c']
    const acc = []
    const iteratee = jest.fn(
      (val, index) =>
        new Promise((resolve) => {
          setTimeout(() => {
            expect(iteratee).toHaveBeenCalledTimes(3)
            acc.push([val, index])
            resolve()
          }, 0)
        })
    )
    let result = forEachAll(iteratee, array)
    expect(iteratee).toHaveBeenCalledTimes(3)
    expect(result).toBeInstanceOf(Promise)
    result = await result
    expect(acc).toEqual([['a', 0], ['b', 1], ['c', 2]])
    expect(result).toBe(array)
  })
})
