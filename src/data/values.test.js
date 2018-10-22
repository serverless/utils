import values from './values'

describe('values', () => {
  test('returns an array of values for an object', () => {
    expect(values({ foo: 'bar', bim: 'bop' })).toEqual(['bar', 'bop'])
  })

  test('returns an empty array of values for an empty object', () => {
    expect(values({})).toEqual([])
  })

  test('returns an array of values for a Map', () => {
    expect(values(new Map([['foo', 'bar'], ['bim', 'bop']]))).toEqual(['bar', 'bop'])
  })

  test('returns an empty array of values for an empty Map', () => {
    expect(values(new Map())).toEqual([])
  })

  test('returns an array of values for an array', () => {
    expect(values(['foo', 'bar'])).toEqual(['foo', 'bar'])
  })

  test('returns an empty array for an empty array', () => {
    expect(values([])).toEqual([])
  })

  test('returns an array of characters for a string', () => {
    expect(values('bar')).toEqual(['b', 'a', 'r'])
  })

  test('returns an empty array for an empty string', () => {
    expect(values('')).toEqual([])
  })

  test('dispatches to the values method of an object if present', () => {
    expect(
      values({
        values: () => ['a', 'b']
      })
    ).toEqual(['a', 'b'])
  })
})
