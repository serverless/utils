import isGenerator from '../lang/isGenerator'
import op from './op'
import resolveToGenerator from './resolveToGenerator'

describe('resolveToGenerator', () => {
  test('resolves basic values to a generator that resolves to the value', () => {
    expect(resolveToGenerator(0).next().value).toBe(0)
    expect(resolveToGenerator(1).next().value).toBe(1)
    expect(resolveToGenerator(-1).next().value).toBe(-1)
    expect(resolveToGenerator('').next().value).toBe('')
    expect(resolveToGenerator('abc').next().value).toBe('abc')
    expect(resolveToGenerator(null).next().value).toBe(null)
    expect(resolveToGenerator(undefined).next().value).toBe(undefined)
    expect(resolveToGenerator(true).next().value).toBe(true)
    expect(resolveToGenerator(false).next().value).toBe(false)
  })

  test('resolves resolvable values to a generator that resolves to the value', () => {
    expect(
      resolveToGenerator({
        resolve: () => 1
      }).next()
    ).toEqual({
      done: true,
      value: 1
    })
  })

  test('resolves ops to a generator that resolves to the op', () => {
    const operation = op(() => {})
    expect(
      resolveToGenerator({
        resolve: () => operation
      }).next()
    ).toEqual({
      done: false,
      value: operation
    })
  })

  test('resolves Promise to a Generator that yields the promise', async () => {
    const promise = new Promise((pResolve) => {
      pResolve('foo')
    })
    const generator = resolveToGenerator(promise)
    expect(isGenerator(generator)).toBe(true)

    const nextPromise = generator.next()
    expect(nextPromise.value).toBeInstanceOf(Promise)

    const promiseValue = await nextPromise.value

    const result = generator.next(promiseValue)
    expect(result).toEqual({
      value: 'foo',
      done: true
    })
  })

  test('resolves Generator to a Generator', async () => {
    const generatorFn = function*() {
      yield 'foo'
      return 'bar'
    }
    const generator = resolveToGenerator(generatorFn())

    expect(isGenerator(generator)).toBe(true)
    expect(generator.next()).toEqual({
      value: 'foo',
      done: false
    })
    expect(generator.next()).toEqual({
      value: 'bar',
      done: true
    })
  })
})
