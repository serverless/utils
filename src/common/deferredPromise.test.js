import deferredPromise from './deferredPromise'

describe('deferredPromise', () => {
  test('deferredPromise is synchronously resolved when not awaiting anything', async () => {
    const promise = deferredPromise()

    promise.resolve('abc')

    expect(promise.isPending()).toBe(false)
    expect(promise.isFulfilled()).toBe(true)
    expect(promise.value()).toBe('abc')
  })

  test('deferredPromise is resolvable', async () => {
    const promise = deferredPromise()
    const handler = jest.fn()

    promise.then(handler)
    setTimeout(() => {
      promise.resolve('abc')
    }, 0)
    const result = await promise

    expect(handler).toHaveBeenCalledWith('abc')
    expect(result).toBe('abc')
  })

  test('deferredPromise is rejectable', async () => {
    const promise = deferredPromise()
    const catcher = jest.fn()

    promise.catch(catcher)
    setTimeout(() => {
      promise.reject('abc')
    }, 0)
    try {
      await promise
    } catch (error) {
      expect(error).toBe('abc')
    }
    expect(catcher).toHaveBeenCalledWith('abc')
  })
})
