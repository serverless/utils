import toString from './toString'

describe('toString', () => {
  test('converts null and undefined to empty string', () => {
    expect(toString(null)).toBe('')
    expect(toString(undefined)).toBe('')
  })

  test('string is string', () => {
    expect(toString('abc')).toBe('abc')
    expect(toString(new String('abc'))).toBe('abc')
    expect(toString('')).toBe('')
  })

  test('preserves negative sign on negative 0', () => {
    expect(toString(-0)).toBe('-0')
  })

  test('converts Array to comma delimited string', () => {
    expect(toString([1, 2, 3])).toBe('1,2,3')
  })

  test('uses toString on objects', () => {
    expect(
      toString({
        toString() {
          return '{ test object }'
        }
      })
    ).toBe('{ test object }')
  })
})
