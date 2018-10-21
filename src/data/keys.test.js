import keys from './keys'

describe('keys', () => {
  test('returns an array of keys for an object', () => {
    expect(keys({ foo: 'bar', bim: 'bop' })).toEqual(['foo', 'bim'])
  })

  test('returns an empty array of keys for an empty object', () => {
    expect(keys({})).toEqual([])
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
})
