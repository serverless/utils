import __ from '../common/__'
import tail from './tail'

describe('tail', () => {
  test('gets all but the first element from an array', () => {
    expect(tail([1, 2, 3])).toEqual([2, 3])
  })

  test('gets all but the first character from a string', () => {
    expect(tail('123')).toBe('23')
  })

  test('returns an empty array from an empty array', () => {
    expect(tail([])).toEqual([])
  })

  test('curries the method with a placeholder', () => {
    const tailPlaceholder = tail(__)
    expect(tailPlaceholder).toBeInstanceOf(Function)
    expect(tailPlaceholder(['a', 'b', 'c'])).toEqual(['b', 'c'])
  })

  test('dispatches to the tail() method if present', () => {
    const object = {
      tail: () => [2, 3]
    }
    expect(tail(object)).toEqual([2, 3])
  })

  test('upgrades to a Promise when a Promise is received as a parameter', async () => {
    expect(await tail(Promise.resolve([1, 2, 3]))).toEqual([2, 3])
  })
})
