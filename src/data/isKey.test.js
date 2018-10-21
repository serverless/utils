import isKey from './isKey'

describe('isKey', () => {
  test('returns true for plain prop', () => {
    expect(isKey('foo')).toBe(true)
    expect(isKey('bar-')).toBe(true)
    expect(isKey('bar1')).toBe(true)
    expect(isKey('1bar')).toBe(true)
  })

  test('returns false for arrays', () => {
    expect(isKey([])).toBe(false)
    expect(isKey(new Array())).toBe(false)
  })
})
