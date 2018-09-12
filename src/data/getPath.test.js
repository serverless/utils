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
})
