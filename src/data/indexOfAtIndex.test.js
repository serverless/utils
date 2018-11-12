import indexOfAtIndex from './indexOfAtIndex'

describe('indexOfAtIndex', () => {
  test('returns the index of value in array starting from 0', () => {
    const array = ['a', 'b', 'c']
    expect(indexOfAtIndex('a', 0, array)).toBe(0)
  })

  test('returns the index of NaN in array starting from 0', () => {
    const array = ['a', NaN, 'c']
    expect(indexOfAtIndex(NaN, 0, array)).toBe(1)
  })
})
