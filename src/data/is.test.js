import is from './is'

describe('is', () => {
  test('identifies values using built in js constructors', () => {
    expect(is(Object, {})).toBe(true)
    expect(is(Number, 1)).toBe(true)
    expect(is(Object, 1)).toBe(false)
    expect(is(String, 's')).toBe(true)
    expect(is(String, new String(''))).toBe(true)
    expect(is(Object, new String(''))).toBe(true)
    expect(is(Object, 's')).toBe(false)
    expect(is(Number, {})).toBe(false)
  })
})
