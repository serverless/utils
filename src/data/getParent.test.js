import getParent from './getParent'

describe('getParent', () => {
  test('getParent using a single key returns the original value', () => {
    const value = {
      foo: 'bar'
    }
    expect(getParent('foo', value)).toBe(value)
    expect(getParent(['foo'], value)).toBe(value)
    expect(getParent('bim', value)).toBe(value)
  })

  test('getParent when access arrays directly returns array', () => {
    const value = ['foobar']
    expect(getParent('[0]', value)).toBe(value)
    expect(getParent([0], value)).toBe(value)
  })

  test('getParent using a undefined returns undefined', () => {
    expect(getParent(undefined, { a: 'b' })).toBe(undefined)
    expect(getParent(undefined, {})).toBe(undefined)
    expect(getParent(undefined, [])).toBe(undefined)
    expect(getParent(undefined, 'foo')).toBe(undefined)
    expect(getParent(undefined, 123)).toBe(undefined)
    expect(getParent(undefined, null)).toBe(undefined)
    expect(getParent(undefined, undefined)).toBe(undefined)
  })

  test('getParent using am empty array returns undefined', () => {
    expect(getParent([], { a: 'b' })).toBe(undefined)
    expect(getParent([], {})).toBe(undefined)
    expect(getParent([], [])).toBe(undefined)
    expect(getParent([], 'foo')).toBe(undefined)
    expect(getParent([], 123)).toBe(undefined)
    expect(getParent([], null)).toBe(undefined)
    expect(getParent([], undefined)).toBe(undefined)
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
    expect(getParent('foo.bar.bim', value)).toEqual({
      bim: 'bop'
    })
  })

  test('select from a nested object with getParent method', () => {
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
    expect(getParent('foo.bar.bim', value)).toBe(foo.data.bar)
  })

  test('converts dot props to paths and gets parent', () => {
    const value = {
      foo: {
        bar: 'foobar'
      }
    }
    expect(getParent('foo.bar', value)).toBe(value.foo)
  })

  test('works with props that have dots', () => {
    const value = {
      'foo.bar': 'foobar'
    }
    expect(getParent(['foo.bar'], value)).toBe(value)
  })

  test('supports array syntax', () => {
    const value = {
      foo: ['foobar']
    }
    expect(getParent('foo[0]', value)).toBe(value.foo)
  })

  test('curries the getParent method', () => {
    const value = {
      foo: 'bar'
    }
    const getParentFoo = getParent('foo')
    expect(getParentFoo(value)).toBe(value)
  })

  test('dispatches to the getParent method of the last argument', () => {
    const value = {
      getParent(path) {
        return getParent(path, this.props)
      },
      props: {
        foo: 'bar'
      }
    }
    expect(getParent('foo', value)).toEqual({ foo: 'bar' })
  })

  test('dispatches to the getParent method of the last argument when curried', () => {
    const value = {
      getParent: jest.fn(function(path) {
        return getParent(path, this.props)
      }),
      props: {
        foo: {
          bar: 'baz'
        }
      }
    }
    const getParentFooBar = getParent('foo.bar')
    expect(getParentFooBar(value)).toBe(value.props.foo)
    expect(value.getParent).toHaveBeenCalledTimes(1)
    expect(value.getParent).toHaveBeenCalledWith('foo.bar', value)
  })
})
