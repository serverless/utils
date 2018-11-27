import mapAll from './mapAll'

describe('mapAll', () => {
  test('maps array left to right', () => {
    const values = ['foo', 'bar', 'baz']
    const result = mapAll((value) => value + '1', values)
    expect(result).toEqual(['foo1', 'bar1', 'baz1'])
  })

  test('calls iteratee with index', () => {
    const values = ['foo', 'bar', 'baz']
    const iteratee = jest.fn((identity) => identity)
    const result = mapAll(iteratee, values)
    expect(iteratee).toHaveBeenNthCalledWith(1, 'foo', 0)
    expect(iteratee).toHaveBeenNthCalledWith(2, 'bar', 1)
    expect(iteratee).toHaveBeenNthCalledWith(3, 'baz', 2)
    expect(result).toEqual(['foo', 'bar', 'baz'])
  })

  test('calls iteratee with key', () => {
    const object = {
      foo: 'bar',
      baz: 'bam',
      bim: 'bop'
    }
    const iteratee = jest.fn((identity) => identity)
    const result = mapAll(iteratee, object)
    expect(iteratee).toHaveBeenNthCalledWith(1, 'bar', 'foo')
    expect(iteratee).toHaveBeenNthCalledWith(2, 'bam', 'baz')
    expect(iteratee).toHaveBeenNthCalledWith(3, 'bop', 'bim')
    expect(result).toEqual({
      foo: 'bar',
      baz: 'bam',
      bim: 'bop'
    })
  })

  test('maps over objects symbols', () => {
    const symA = Symbol('a')
    const symB = Symbol.for('b')
    const object = {
      [symA]: 'a',
      [symB]: 'b'
    }
    const iteratee = jest.fn((value) => value)
    const result = mapAll(iteratee, object)
    expect(iteratee).toHaveBeenNthCalledWith(1, 'a', symA)
    expect(iteratee).toHaveBeenNthCalledWith(2, 'b', symB)
    expect(result).toEqual({
      [symA]: 'a',
      [symB]: 'b'
    })
  })

  test('upgrades to a Promise when an async iteratee is used', async () => {
    const array = ['a', 'b', 'c']
    let result = mapAll(
      (val, index) =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve([val, index])
          }, 0)
        }),
      array
    )

    expect(result).toBeInstanceOf(Promise)
    result = await result
    expect(result).toEqual([['a', 0], ['b', 1], ['c', 2]])
  })

  test('executes async in parallel', async () => {
    const array = ['a', 'b', 'c']
    const iteratee = jest.fn(
      (val, index) =>
        new Promise((resolve) => {
          setTimeout(() => {
            expect(iteratee).toHaveBeenCalledTimes(3)
            resolve([val, index])
          }, 0)
        })
    )
    let result = mapAll(iteratee, array)
    expect(iteratee).toHaveBeenCalledTimes(3)
    expect(result).toBeInstanceOf(Promise)
    result = await result
    expect(result).toEqual([['a', 0], ['b', 1], ['c', 2]])
  })
})
