import allWith from './allWith'

describe('allWith', () => {
  test('resolves basic values with sync identity function to themselves', () => {
    expect(allWith((value) => value, 0)).toBe(0)
    expect(allWith((value) => value, 1)).toBe(1)
    expect(allWith((value) => value, -1)).toBe(-1)
    expect(allWith((value) => value, '')).toBe('')
    expect(allWith((value) => value, 'abc')).toBe('abc')
    expect(allWith((value) => value, null)).toBe(null)
    expect(allWith((value) => value, undefined)).toBe(undefined)
    expect(allWith((value) => value, true)).toBe(true)
    expect(allWith((value) => value, false)).toBe(false)
    expect(allWith((value) => value, [])).toEqual([])
    expect(allWith((value) => value, {})).toEqual({})
  })

  test('resolves Promise to a Promise', async () => {
    const promise = new Promise((pResolve) => {
      pResolve('foo')
    })
    const handler = jest.fn(() => 'bar')
    const resolver = allWith(handler, promise)
    expect(resolver).toBeInstanceOf(Promise)
    const result = await resolver
    expect(handler).toHaveBeenCalledWith('foo')
    expect(handler).toHaveBeenCalledTimes(1)
    expect(result).toBe('bar')
  })
})
