import __ from '../common/__'
import init from './init'

describe('init', () => {
  test('gets all but the last element from an array', () => {
    expect(init([1, 2, 3])).toEqual([1, 2])
  })

  test('gets all but the last element from a string', () => {
    expect(init('123')).toBe('12')
  })

  test('returns an empty array from an empty array', () => {
    expect(init([])).toEqual([])
  })

  test('curries the method with a placeholder', () => {
    const initPlaceholder = init(__)
    expect(initPlaceholder).toBeInstanceOf(Function)
    expect(initPlaceholder(['a', 'b', 'c'])).toEqual(['a', 'b'])
  })

  test('dispatches to the init() method if present', () => {
    const object = {
      init: () => [1, 2]
    }
    expect(init(object)).toEqual([1, 2])
  })

  test('upgrades to a Promise when a Promise is received as a parameter', async () => {
    expect(await init(Promise.resolve([1, 2, 3]))).toEqual([1, 2])
  })
})
