import getPath from './getPath'

describe('getPath', () => {
  test('get path using a single key', () => {
    const value = {
      foo: 'bar'
    }
    expect(getPath(['foo'], value)).toBe('bar')
    expect(getPath(['foo', 'bar'], value)).toBe(undefined)
    expect(getPath(['bim'], value)).toBe(undefined)
    expect(getPath([], value)).toBe(value)
  })

  test('throws if path is not an array', () => {
    expect(() => getPath(undefined, {})).toThrow(/^getPath expected path to be an Array/)
    expect(() => getPath('', {})).toThrow(/^getPath expected path to be an Array/)
    expect(() => getPath({}, {})).toThrow(/^getPath expected path to be an Array/)
    expect(() => getPath(0, {})).toThrow(/^getPath expected path to be an Array/)
  })

  test('get path from a nested Map', () => {
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
    expect(getPath(['foo', 'bar', 'bim'], value)).toBe('bop')
  })

  test('undefined path parts retain current value', () => {
    const value = {}
    expect(getPath([undefined], value)).toBe(value)
    expect(getPath([null], value)).toBe(undefined)
    expect(getPath([undefined], null)).toBe(null)
    expect(getPath([null], null)).toBe(undefined)
  })

  test('does not convert props to paths', () => {
    const value = {
      foo: {
        bar: 'foobar'
      }
    }
    expect(getPath(['foo.bar'], value)).toBe(undefined)
  })

  test('works with props that have dots', () => {
    const value = {
      'foo.bar': 'foobar'
    }
    expect(getPath(['foo.bar'], value)).toBe('foobar')
  })

  test('curries the getPath method', () => {
    const value = {
      foo: 'bar'
    }
    const getFoo = getPath(['foo'])
    expect(getFoo(value)).toBe('bar')
  })

  test('dispatches to the getPath method of the last argument', () => {
    const value = {
      getPath(path) {
        return this.props[path[0]]
      },
      props: {
        foo: 'bar'
      }
    }
    expect(getPath(['foo'], value)).toBe('bar')
  })

  test('dispatches to the getPath method of the last argument when curried', () => {
    const value = {
      getPath: jest.fn(function(path) {
        return getPath(path, this.props)
      }),
      props: {
        foo: {
          bar: 'baz'
        }
      }
    }
    const getFooBar = getPath(['foo', 'bar'])
    expect(getFooBar(value)).toBe('baz')
    expect(value.getPath).toHaveBeenCalledTimes(1)
    expect(value.getPath).toHaveBeenCalledWith(['foo', 'bar'], value)
  })
})
