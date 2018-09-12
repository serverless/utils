import hasProp from './hasProp'

describe('hasProp', () => {
  test('has prop using a single key', () => {
    const value = {
      foo: 'bar'
    }
    expect(hasProp('foo', value)).toBe(true)
    expect(hasProp('bar', value)).toBe(false)
  })

  test('has prop from nil values returns false', () => {
    expect(hasProp('foo', undefined)).toBe(false)
    expect(hasProp('foo', null)).toBe(false)
  })

  test('undefined props check the value', () => {
    expect(hasProp(undefined, {})).toBe(true)
    expect(hasProp(undefined, true)).toBe(true)
    expect(hasProp(undefined, null)).toBe(false)
    expect(hasProp(undefined, false)).toBe(false)
  })

  test('does not convert props to paths', () => {
    const value = {
      foo: {
        bar: 'foobar'
      }
    }
    expect(hasProp('foo.bar', value)).toBe(false)
  })

  test('works with props that have dots', () => {
    const value = {
      'foo.bar': 'foobar'
    }
    expect(hasProp('foo.bar', value)).toBe(true)
  })

  test('has prop using Map', () => {
    const value = new Map([['foo', 'bar']])
    expect(hasProp('foo', value)).toBe(true)
    expect(hasProp('bar', value)).toBe(false)
  })
})
