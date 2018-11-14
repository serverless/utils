import objectToString from './objectToString'

describe('objectToString', () => {
  test('converts basic object to string ', () => {
    expect(objectToString({})).toBe('[object Object]')
  })
})
