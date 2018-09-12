import getProp from './getProp'

describe('getProp', () => {
  test('get prop using a single key', () => {
    const value = {
      foo: 'bar'
    }
    expect(getProp('foo', value)).toBe('bar')
    expect(getProp('bar', value)).toBe(undefined)
  })

  test('get prop from nil values returns undefined', () => {
    expect(getProp('foo', undefined)).toBe(undefined)
    expect(getProp('foo', null)).toBe(undefined)
  })

  test('undefined props return the value', () => {
    const value = {}
    expect(getProp(undefined, value)).toBe(value)
    expect(getProp(null, value)).toBe(undefined)
    expect(getProp(undefined, null)).toBe(null)
    expect(getProp(null, null)).toBe(undefined)
  })

  test('does not convert props to paths', () => {
    const value = {
      foo: {
        bar: 'foobar'
      }
    }
    expect(getProp('foo.bar', value)).toBe(undefined)
  })

  test('works with props that have dots', () => {
    const value = {
      'foo.bar': 'foobar'
    }
    expect(getProp('foo.bar', value)).toBe('foobar')
  })

  test('get prop from Map', () => {
    const value = new Map([['foo', 'bar']])
    expect(getProp('foo', value)).toBe('bar')
    expect(getProp('bar', value)).toBe(undefined)
  })

  test('executes getter if prop is function', () => {
    const value = {
      foo: 'bar'
    }
    expect(getProp((val) => val.foo, value)).toBe('bar')
    expect(getProp((val) => val.bar, value)).toBe(undefined)
  })
})
