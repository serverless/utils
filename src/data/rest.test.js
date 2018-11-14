import __ from '../common/__'
import rest from './rest'

describe('rest', () => {
  test('gets all but the first element from an array', () => {
    expect(rest([1, 2, 3])).toEqual([2, 3])
  })

  test('gets all but the first character from a string', () => {
    expect(rest('123')).toBe('23')
  })

  test('returns an empty array from an empty array', () => {
    expect(rest([])).toEqual([])
  })

  test('curries the method with a placeholder', () => {
    const restPlaceholder = rest(__)
    expect(restPlaceholder).toBeInstanceOf(Function)
    expect(restPlaceholder(['a', 'b', 'c'])).toEqual(['b', 'c'])
  })

  test('dispatches to the rest() method if present', () => {
    const object = {
      rest: () => [2, 3]
    }
    expect(rest(object)).toEqual([2, 3])
  })

  test('upgrades to a Promise when a Promise is received as a parameter', async () => {
    expect(await rest(Promise.resolve([1, 2, 3]))).toEqual([2, 3])
  })
})
