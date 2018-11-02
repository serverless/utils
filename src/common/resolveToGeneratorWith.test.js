import isGenerator from '../base/isGenerator'
import resolveToGeneratorWith from './resolveToGeneratorWith'

describe('resolveToGeneratorWith', () => {
  test('resolves basic values to a generator that resolves to the value', () => {
    expect(resolveToGeneratorWith((value) => value, 0).next().value).toBe(0)
    expect(resolveToGeneratorWith((value) => value, 1).next().value).toBe(1)
    expect(resolveToGeneratorWith((value) => value, -1).next().value).toBe(-1)
    expect(resolveToGeneratorWith((value) => value, '').next().value).toBe('')
    expect(resolveToGeneratorWith((value) => value, 'abc').next().value).toBe('abc')
    expect(resolveToGeneratorWith((value) => value, null).next().value).toBe(null)
    expect(resolveToGeneratorWith((value) => value, undefined).next().value).toBe(undefined)
    expect(resolveToGeneratorWith((value) => value, true).next().value).toBe(true)
    expect(resolveToGeneratorWith((value) => value, false).next().value).toBe(false)
  })

  test('returned resolvable values are resolved to a generator', () => {
    expect(
      resolveToGeneratorWith(
        () => ({
          resolve: () => 1
        }),
        0
      ).next()
    ).toEqual({
      value: 1,
      done: true
    })
  })

  test('resolves Promise to a Generator that yields the promise', async () => {
    const promise = new Promise((pResolve) => {
      pResolve('foo')
    })
    const handler = jest.fn((value) => value)
    const generator = resolveToGeneratorWith(handler, promise)
    expect(isGenerator(generator)).toBe(true)

    const nextPromise = generator.next()
    expect(nextPromise).toEqual({
      done: false,
      value: expect.any(Promise)
    })

    const promiseValue = await nextPromise.value
    expect(promiseValue).toBe('foo')

    const result = generator.next(promiseValue)
    expect(handler).toHaveBeenCalledWith('foo')
    expect(result).toEqual({
      value: 'foo',
      done: true
    })
  })
})
