import keys from './keys'

describe('keys', () => {
  test('returns an array of keys for an object', () => {
    expect(keys({ foo: 'bar', bim: 'bop' })).toEqual(['foo', 'bim'])
  })

  test('returns an empty array of keys for an empty object', () => {
    expect(keys({})).toEqual([])
  })

  test('returns an array of keys for a Map', () => {
    expect(keys(new Map([['foo', 'bar'], ['bim', 'bop']]))).toEqual(['foo', 'bim'])
  })

  test('returns an empty array of keys for an empty Map', () => {
    expect(keys(new Map())).toEqual([])
  })

  test('returns an array of indexes for an array', () => {
    expect(keys(['foo', 'bar'])).toEqual(['0', '1'])
  })

  test('returns an empty array for an empty array', () => {
    expect(keys([])).toEqual([])
  })

  test('returns an array of indexes for a string', () => {
    expect(keys('bar')).toEqual(['0', '1', '2'])
  })

  test('returns an empty array for an empty string', () => {
    expect(keys('')).toEqual([])
  })

  test('dispatches to the keys method of an object if present', () => {
    expect(
      keys({
        keys: () => ['a', 'b']
      })
    ).toEqual(['a', 'b'])
  })

  test('upgrades to a Promise when a Promise is passed as the collection', async () => {
    let result = keys(Promise.resolve({ a: 1, b: 2, c: 3 }))

    expect(result).toBeInstanceOf(Promise)

    result = await result
    expect(result).toEqual(['a', 'b', 'c'])
  })
})
