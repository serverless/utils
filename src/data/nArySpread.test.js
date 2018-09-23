import nArySpread from './nArySpread'

describe('nArySpread', () => {
  test('sets arity of 0 with spread', () => {
    const fn = nArySpread(0, (argA, argB, argC) => {
      expect(argA).toBe('a')
      expect(argB).toBe('b')
      expect(argC).toBe('c')
      return 0
    })
    expect(fn.length).toBe(0)
    expect(fn('a', 'b', 'c')).toBe(0)
  })

  test('sets arity of 1 with spread', () => {
    const fn = nArySpread(1, (argA, argB, argC) => {
      expect(argA).toBe('a')
      expect(argB).toBe('b')
      expect(argC).toBe('c')
      return 1
    })
    expect(fn.length).toBe(1)
    expect(fn('a', 'b', 'c')).toBe(1)
  })
})
