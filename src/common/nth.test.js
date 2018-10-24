import nth from './nth'

describe('nth', () => {
  it('gets the given index', () => {
    expect(nth(0, ['abc'])).toBe('abc')
  })

  it('if offset is greater than length, undefined is returned', () => {
    expect(nth(1, ['abc'])).toBe(undefined)
  })

  it('if offset is negative it offsets from length', () => {
    expect(nth(-1, ['abc', 'foo'])).toBe('foo')
  })

  it('curries the nth function', () => {
    const first = nth(0)
    expect(first).toBeInstanceOf(Function)
    expect(first(['abc', 'foo'])).toBe('abc')
  })
})
