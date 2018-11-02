import resolve from './resolve'

describe('resolve', () => {
  test('resolves already resolved values to themselves', () => {
    expect(resolve(undefined)).toBe(undefined)
    expect(resolve(null)).toBe(null)
    expect(resolve('')).toBe('')
    expect(resolve('abc')).toBe('abc')
    expect(resolve(false)).toBe(false)
    expect(resolve(true)).toBe(true)
    expect(resolve(0)).toBe(0)
    expect(resolve(-1)).toBe(-1)
    expect(resolve(1)).toBe(1)
    expect(resolve(NaN)).toBe(NaN)
    expect(resolve(Infinity)).toBe(Infinity)
    expect(resolve(-Infinity)).toBe(-Infinity)

    const object = {}
    expect(resolve(object)).toBe(object)
    const func = () => {}
    expect(resolve(func)).toBe(func)
    const array = []
    expect(array).toBe(array)
  })

  test('dispatches to the resolve method of last arg', () => {
    const resolvable = {
      resolve() {
        return 'foo'
      }
    }
    expect(resolve(resolvable)).toBe('foo')
  })

  test('re-resolves resolved values that are also resolvable', () => {
    const reresolvable = {
      resolve() {
        return {
          resolve() {
            return 'foo'
          }
        }
      }
    }
    expect(resolve(reresolvable)).toBe('foo')
  })
})
