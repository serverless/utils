import nAry from './nAry'

describe('nAry', () => {
  test('sets arity of 0', () => {
    const fn = nAry(0, (argA, argB, argC) => {
      expect(argA).toBe(undefined)
      expect(argB).toBe(undefined)
      expect(argC).toBe(undefined)
      return 0
    })
    expect(fn.length).toBe(0)
    expect(fn('a', 'b', 'c')).toBe(0)
  })

  test('sets arity of 1', () => {
    const fn = nAry(1, (argA, argB, argC) => {
      expect(argA).toBe('a')
      expect(argB).toBe(undefined)
      expect(argC).toBe(undefined)
      return 1
    })
    expect(fn.length).toBe(1)
    expect(fn('a', 'b', 'c')).toBe(1)
  })
})
