import stringToLowerCase from './stringToLowerCase'

describe('stringToLowerCase', () => {
  test('converts upper case string to lower case', () => {
    expect(stringToLowerCase('ABC')).toBe('abc')
  })

  test('preserves lower case', () => {
    expect(stringToLowerCase('abc')).toBe('abc')
  })
})
