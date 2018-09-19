import hasPath from './hasPath'

describe('hasPath', () => {
  test('has path using a single key', () => {
    const value = {
      foo: 'bar'
    }
    expect(hasPath(['foo'], value)).toBe(true)
    expect(hasPath(['foo', 'bar'], value)).toBe(false)
    expect(hasPath(['bim'], value)).toBe(false)
    expect(hasPath([], value)).toBe(true)
  })

  test('has path from a nested Map', () => {
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
    expect(hasPath(['foo', 'bar', 'bim'], value)).toBe(true)
  })

  test('undefined path parts check current value', () => {
    const value = {}
    expect(hasPath([undefined], value)).toBe(true)
    expect(hasPath([null], value)).toBe(false)
    expect(hasPath([undefined], null)).toBe(false)
    expect(hasPath([null], true)).toBe(false)
  })

  test('does not convert props to paths', () => {
    const value = {
      foo: {
        bar: 'foobar'
      }
    }
    expect(hasPath(['foo.bar'], value)).toBe(false)
  })

  test('works with props that have dots', () => {
    const value = {
      'foo.bar': 'foobar'
    }
    expect(hasPath(['foo.bar'], value)).toBe(true)
  })
})
