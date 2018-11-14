import toFunctionName from './toFunctionName'

describe('toFunctionName', () => {
  test('throws for non functions', () => {
    expect(() => toFunctionName(null)).toThrow(/^toFunctionName expected a function/)
  })

  test('gets function name from functions', () => {
    expect(toFunctionName(function test() {})).toBe('test')
  })
})
