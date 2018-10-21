import isGenerator from '../data/isGenerator'
import resolveWith from './resolveWith'

describe('resolveWith', () => {
  test('resolves basic values with sync identity function to themselves', () => {
    expect(resolveWith((value) => value, 0)).toBe(0)
    expect(resolveWith((value) => value, 1)).toBe(1)
    expect(resolveWith((value) => value, -1)).toBe(-1)
    expect(resolveWith((value) => value, '')).toBe('')
    expect(resolveWith((value) => value, 'abc')).toBe('abc')
    expect(resolveWith((value) => value, null)).toBe(null)
    expect(resolveWith((value) => value, undefined)).toBe(undefined)
    expect(resolveWith((value) => value, true)).toBe(true)
    expect(resolveWith((value) => value, false)).toBe(false)
  })

  test('resolves Promise to a Promise', async () => {
    const promise = new Promise((pResolve) => {
      pResolve('foo')
    })
    const handler = jest.fn(() => 'bar')
    const resolver = resolveWith(handler, promise)
    expect(resolver).toBeInstanceOf(Promise)
    const result = await resolver
    expect(handler).toHaveBeenCalledWith('foo')
    expect(handler).toHaveBeenCalledTimes(1)
    expect(result).toBe('bar')
  })

  test('resolves Generator to a Generator', async () => {
    const generatorFn = function*() {
      yield 'foo'
      return 'bar'
    }
    const handler = jest.fn(() => 'baz')
    const generator = resolveWith(handler, generatorFn())

    expect(isGenerator(generator)).toBe(true)
    expect(generator.next()).toEqual({
      value: 'foo',
      done: false
    })
    expect(generator.next()).toEqual({
      value: 'baz',
      done: true
    })
    expect(handler).toHaveBeenCalledWith('bar')
    expect(handler).toHaveBeenCalledTimes(1)
  })

  test('resolves Promise in a Promise', async () => {
    const promise = new Promise((pResolve) => {
      pResolve(
        new Promise((p2Resolve) => {
          setTimeout(() => {
            p2Resolve('foo')
          }, 0)
        })
      )
    })
    const handler = jest.fn(() => 'bar')
    const resolvedPromise = resolveWith(handler, promise)
    expect(resolvedPromise).toBeInstanceOf(Promise)
    const result = await resolvedPromise
    expect(result).toBe('bar')
    expect(handler).toHaveBeenCalledWith('foo')
    expect(handler).toHaveBeenCalledTimes(1)
  })

  test('resolves Generator in a Promise first to a Promise then a Generator', async () => {
    const generatorFn = function*() {
      yield 'foo'
      return 'bar'
    }
    const promise = new Promise((pResolve) => {
      pResolve(generatorFn())
    })
    const handler = jest.fn(() => 'baz')
    const resolvedPromise = resolveWith(handler, promise)
    expect(resolvedPromise).toBeInstanceOf(Promise)
    const generator = await resolvedPromise

    expect(isGenerator(generator)).toBe(true)
    expect(generator.next()).toEqual({
      value: 'foo',
      done: false
    })
    expect(generator.next()).toEqual({
      value: 'baz',
      done: true
    })
    expect(handler).toHaveBeenCalledWith('bar')
    expect(handler).toHaveBeenCalledTimes(1)
  })

  test('resolves Promise in a Generator first to a Generator', async () => {
    const generatorFn = function*() {
      yield new Promise((pResolve) => pResolve('foo'))
      return 'bar'
    }
    const handler = jest.fn(() => 'baz')
    const generator = resolveWith(handler, generatorFn())
    expect(isGenerator(generator)).toBe(true)

    const firstNext = generator.next()
    expect(firstNext).toEqual({
      value: expect.any(Promise),
      done: false
    })
    await firstNext.value
    const result = generator.next()
    expect(result).toEqual({
      value: 'baz',
      done: true
    })
    expect(handler).toHaveBeenCalledWith('bar')
    expect(handler).toHaveBeenCalledTimes(1)
  })
})
