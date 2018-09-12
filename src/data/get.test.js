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

  test('undefined returns current value', () => {
    const value = {}
    expect(get(undefined, value)).toBe(value)
    expect(get(null, value)).toBe(undefined)
    expect(get(undefined, null)).toBe(null)
    expect(get(null, null)).toBe(undefined)
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
})
