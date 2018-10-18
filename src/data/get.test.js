import get from './get'

describe('get', () => {
  test('get using a single key', () => {
    const value = {
      foo: 'bar'
    }
    expect(get('foo', value)).toBe('bar')
    expect(get(['foo'], value)).toBe('bar')
    expect(get('foo.bar', value)).toBe(undefined)
    expect(get('bim', value)).toBe(undefined)
    expect(get(undefined, value)).toBe(value)
  })

  test('select from a nested Map', () => {
    const value = {
      foo: new Map([
        [
          'bar',
          {
            bim: 'bop'
          }
        ]
      ])
    }
    expect(get('foo.bar.bim', value)).toBe('bop')
  })

  test('select from a nested object with get method uses prop only', () => {
    const foo = {
      data: {
        bar: {
          bim: 'bop'
        }
      },
      get(prop) {
        return this.data[prop]
      }
    }
    const value = {
      foo
    }
    expect(get('foo.bar.bim', value)).toBe('bop')
  })

  test('undefined returns current value', () => {
    const value = {}
    expect(get(undefined, value)).toBe(value)
    expect(get(undefined, null)).toBe(null)
  })

  test('null is not considered undefined', () => {
    const value = {}
    expect(get(null, value)).toBe(undefined)
    expect(get(null, null)).toBe(undefined)
  })

  test('supports non string values as keys', () => {
    const sym = Symbol('foo')
    const value = {
      [null]: 'foo',
      [0]: 'foo',
      [false]: 'foo',
      [true]: 'foo',
      [sym]: 'foo'
    }
    expect(get(null, value)).toBe('foo')
    expect(get(0, value)).toBe('foo')
    expect(get(false, value)).toBe('foo')
    expect(get(true, value)).toBe('foo')
    expect(get(sym, value)).toBe('foo')
  })

  test('converts dot props to paths', () => {
    const value = {
      foo: {
        bar: 'foobar'
      }
    }
    expect(get('foo.bar', value)).toBe('foobar')
  })

  test('works with props that have dots', () => {
    const value = {
      'foo.bar': 'foobar'
    }
    expect(get(['foo.bar'], value)).toBe('foobar')
  })

  test('supports array syntax', () => {
    const value = {
      foo: ['foobar']
    }
    expect(get('foo[0]', value)).toBe('foobar')
  })

  test('supports accessing arrays directly', () => {
    const value = ['foobar']
    expect(get('[0]', value)).toBe('foobar')
  })

  test('supports accessing arrays directly with number array path', () => {
    const value = ['foobar']
    expect(get([0], value)).toBe('foobar')
  })

  test('empty array returns the value', () => {
    expect(get([], { a: 'b' })).toEqual({ a: 'b' })
    expect(get([], {})).toEqual({})
    expect(get([], [])).toEqual([])
    expect(get([], 'foo')).toBe('foo')
    expect(get([], 123)).toBe(123)
    expect(get([], null)).toBe(null)
    expect(get([], undefined)).toBe(undefined)
  })

  test('curries the get method', () => {
    const value = {
      foo: 'bar'
    }
    const getFoo = get('foo')
    expect(getFoo(value)).toBe('bar')
  })

  test('dispatches to the get method of the last argument', () => {
    const value = {
      get(path) {
        return this.props[path]
      },
      props: {
        foo: 'bar'
      }
    }
    expect(get('foo', value)).toBe('bar')
  })

  test('dispatches to the get method of the last argument when curried', () => {
    const value = {
      get: jest.fn(function(path) {
        return get(path, this.props)
      }),
      props: {
        foo: {
          bar: 'baz'
        }
      }
    }
    const getFooBar = get('foo.bar')
    expect(getFooBar(value)).toBe('baz')
    expect(value.get).toHaveBeenCalledTimes(1)
    expect(value.get).toHaveBeenCalledWith('foo.bar', value)
  })
})
