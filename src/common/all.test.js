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

  test('resolves any other value to itself', () => {
    expect(all(undefined)).toBe(undefined)
    expect(all(null)).toBe(null)
    expect(all('')).toBe('')
    expect(all('abc')).toBe('abc')
    expect(all(false)).toBe(false)
    expect(all(true)).toBe(true)
    expect(all(0)).toBe(0)
    expect(all(-1)).toBe(-1)
    expect(all(1)).toBe(1)
    expect(all(NaN)).toBe(NaN)
    expect(all(Infinity)).toBe(Infinity)
    expect(all(-Infinity)).toBe(-Infinity)
    const fn = () => {}
    expect(all(fn)).toBe(fn)
  })
})
