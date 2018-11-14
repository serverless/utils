import __ from '../common/__'
import head from './head'

describe('head', () => {
  test('gets the first element from an array', () => {
    expect(head([1, 2, 3])).toBe(1)
  })

  test('gets the first element from a string', () => {
    expect(head('123')).toBe('1')
  })

  test('returns undefined from an empty array', () => {
    expect(head([])).toBe(undefined)
  })

  test('curries the method with a placeholder', () => {
    const headPlaceholder = head(__)
    expect(headPlaceholder).toBeInstanceOf(Function)
    expect(headPlaceholder(['a', 'b', 'c'])).toBe('a')
  })

  test('dispatches to the head() method if present', () => {
    const object = {
      head: () => 1
    }
    expect(head(object)).toBe(1)
  })

  test('upgrades to a Promise when a Promise is received as a parameter', async () => {
    expect(await head(Promise.resolve([1, 2, 3]))).toBe(1)
  })
})
