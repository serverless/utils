import resolvable from './resolvable'
import resolve from './resolve'

describe('resolvable', () => {
  test('resolves basic values themselves', () => {
    expect(resolve(resolvable(() => 0))).toBe(0)
    expect(resolve(resolvable(() => 1))).toBe(1)
    expect(resolve(resolvable(() => -1))).toBe(-1)
    expect(resolve(resolvable(() => ''))).toBe('')
    expect(resolve(resolvable(() => 'abc'))).toBe('abc')
    expect(resolve(resolvable(() => null))).toBe(null)
    expect(resolve(resolvable(() => undefined))).toBe(undefined)
    expect(resolve(resolvable(() => true))).toBe(true)
    expect(resolve(resolvable(() => false))).toBe(false)
  })

  test('resolves returned resolvable values', () => {
    expect(
      resolve(
        resolvable(() => ({
          resolve: () => 1
        }))
      )
    ).toBe(1)
  })

  test('Throws if fn is not a function', () => {
    const errorRegex = /^resolvable expects fn to be a Function/
    expect(() => resolvable('foo')).toThrow(errorRegex)
  })
})
