import objectKeys from './objectKeys'

describe('objectKeys', () => {
  test('returns an array of keys for an object', () => {
    expect(objectKeys({ foo: 'bar', bim: 'bop' })).toEqual(['foo', 'bim'])
  })

  test('returns an empty array of keys for an empty object', () => {
    expect(objectKeys({})).toEqual([])
  })
})
