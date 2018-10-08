import apply from './apply'

describe('apply', () => {
  test('applies all args to function and returns value', () => {
    const result = apply(
      (arg1, arg2, arg3) => {
        expect(arg1).toBe('a')
        expect(arg2).toBe('b')
        expect(arg3).toBe('c')
        return 'baz'
      },
      ['a', 'b', 'c']
    )

    expect(result).toBe('baz')
  })

  test('maintains context of function', () => {
    const testObject = {}
    const test = apply(function() {
      expect(this).toBe(testObject)
      return 'baz'
    })
    testObject.test = test
    expect(testObject.test([])).toBe('baz')
  })
})
