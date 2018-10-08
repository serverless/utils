import all from './all'

describe('all', () => {
  test('resolves all async values in an array', async () => {
    const result = await all(['a', Promise.resolve('b'), (async () => 'c')()])

    expect(result).toEqual(['a', 'b', 'c'])
  })

  test('resolves all async values in an object', async () => {
    const result = await all({
      a: 1,
      b: Promise.resolve(2),
      c: (async () => 3)()
    })

    expect(result).toEqual({ a: 1, b: 2, c: 3 })
  })

  test('resolves any other value to itself', async () => {
    expect(await all(undefined)).toBe(undefined)
    expect(await all(null)).toBe(null)
    expect(await all('')).toBe('')
    expect(await all('abc')).toBe('abc')
    expect(await all(false)).toBe(false)
    expect(await all(true)).toBe(true)
    expect(await all(0)).toBe(0)
    expect(await all(-1)).toBe(-1)
    expect(await all(1)).toBe(1)
    expect(await all(NaN)).toBe(NaN)
    expect(await all(Infinity)).toBe(Infinity)
    expect(await all(-Infinity)).toBe(-Infinity)
    const fn = () => {}
    expect(await all(fn)).toBe(fn)
  })
})
