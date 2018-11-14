import __ from '../common/__'
import last from './last'

describe('last', () => {
  test('gets the last element from an array', () => {
    expect(last([1, 2, 3])).toBe(3)
  })

  test('gets the last element from a string', () => {
    expect(last('123')).toBe('3')
  })

  test('returns undefined from an empty array', () => {
    expect(last([])).toBe(undefined)
  })

  test('curries the method with a placeholder', () => {
    const lastPlaceholder = last(__)
    expect(lastPlaceholder).toBeInstanceOf(Function)
    expect(lastPlaceholder(['a', 'b', 'c'])).toBe('c')
  })

  test('dispatches to the last() method if present', () => {
    const object = {
      last: () => 1
    }
    expect(last(object)).toBe(1)
  })

  test('upgrades to a Promise when a Promise is received as a parameter', async () => {
    expect(await last(Promise.resolve([1, 2, 3]))).toBe(3)
  })
})
