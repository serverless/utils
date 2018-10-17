import getParentPath from './getParentPath'

describe('getParentPath', () => {
  test('getParentPath using a single key returns original value', () => {
    const value = {
      foo: 'bar'
    }
    expect(getParentPath(['foo'], value)).toBe(value)
    expect(getParentPath(['bim'], value)).toBe(value)
  })

  test('getParentPath when access arrays directly returns array', () => {
    const value = ['foobar']
    expect(getParentPath([0], value)).toBe(value)
  })

  test('getParentPath using am empty array returns undefined', () => {
    expect(getParentPath([], { a: 'b' })).toBe(undefined)
    expect(getParentPath([], {})).toBe(undefined)
    expect(getParentPath([], [])).toBe(undefined)
    expect(getParentPath([], 'foo')).toBe(undefined)
    expect(getParentPath([], 123)).toBe(undefined)
    expect(getParentPath([], null)).toBe(undefined)
    expect(getParentPath([], undefined)).toBe(undefined)
  })

  test('get parent path from a nested Map', () => {
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
    expect(getParentPath(['foo', 'bar', 'bim'], value)).toEqual({
      bim: 'bop'
    })
  })

  test('undefined path parts are considered empty paths and return undefined', () => {
    expect(getParentPath([undefined], {})).toBe(undefined)
    expect(getParentPath([undefined], null)).toBe(undefined)
  })

  test('does not convert props to paths', () => {
    const value = {
      foo: {
        bar: 'foobar'
      }
    }
    expect(getParentPath(['foo.bar'], value)).toBe(value)
  })

  test('works with props that have dots', () => {
    const value = {
      'foo.bar': {
        baz: 'foobar'
      }
    }
    expect(getParentPath(['foo.bar', 'baz'], value)).toBe(value['foo.bar'])
  })

  test('curries the getParentPath method', () => {
    const value = {
      foo: 'bar'
    }
    const getFoo = getParentPath(['foo'])
    expect(getFoo(value)).toBe(value)
  })

  test('dispatches to the getParentPath method of the last argument', () => {
    const value = {
      getParentPath(path) {
        return getParentPath(path, this.props)
      },
      props: {
        foo: 'bar'
      }
    }
    expect(getParentPath(['foo'], value)).toEqual({ foo: 'bar' })
  })

  test('dispatches to the getParentPath method of the last argument when curried', () => {
    const value = {
      getParentPath: jest.fn(function(path) {
        return getParentPath(path, this.props)
      }),
      props: {
        foo: {
          bar: 'baz'
        }
      }
    }
    const getFooBar = getParentPath(['foo', 'bar'])
    expect(getFooBar(value)).toBe(value.props.foo)
    expect(value.getParentPath).toHaveBeenCalledTimes(1)
    expect(value.getParentPath).toHaveBeenCalledWith(['foo', 'bar'], value)
  })
})
