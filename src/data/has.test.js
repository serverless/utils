import has from './has'

describe('has', () => {
  test('has using a single key', () => {
    const value = {
      foo: 'bar'
    }
    expect(has('foo', value)).toBe(true)
    expect(has(['foo'], value)).toBe(true)
    expect(has('foo.bar', value)).toBe(false)
    expect(has('bim', value)).toBe(false)
    expect(has(undefined, value)).toBe(true)
  })

  test('has from a nested Map', () => {
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
    expect(has('foo.bar.bim', value)).toBe(true)
  })

  test('has with undefined checks current value', () => {
    const value = {}
    expect(has(undefined, value)).toBe(true)
    expect(has(null, value)).toBe(false)
    expect(has(undefined, null)).toBe(false)
    expect(has(null, null)).toBe(false)
  })

  test('converts dot props to paths', () => {
    const value = {
      foo: {
        bar: 'foobar'
      }
    }
    expect(has('foo.bar', value)).toBe(true)
  })

  test('works with props that have dots', () => {
    const value = {
      'foo.bar': 'foobar'
    }
    expect(has(['foo.bar'], value)).toBe(true)
  })
})
