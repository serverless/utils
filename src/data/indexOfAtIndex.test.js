import indexOfAtIndex from './indexOfAtIndex'

describe('indexOfAtIndex', () => {
  test('returns the index of a string in array starting from 0', () => {
    const array = ['a', 'b', 'c']
    expect(indexOfAtIndex('a', 0, array)).toBe(0)
  })

  test('returns the index of a boolean in array starting from 0', () => {
    const array = [null, true, false]
    expect(indexOfAtIndex(false, 0, array)).toBe(2)
  })

  test('returns the index of undefined in array starting from 0', () => {
    const array = [null, undefined, false]
    expect(indexOfAtIndex(undefined, 0, array)).toBe(1)
  })

  test('returns the index of null in array starting from 0', () => {
    const array = [null, undefined, false]
    expect(indexOfAtIndex(null, 0, array)).toBe(0)
  })

  test('returns the index of a number in array starting from 0', () => {
    const array = [0, 1, 2]
    expect(indexOfAtIndex(1, 0, array)).toBe(1)
  })

  test('returns the index of 0 in array starting from 0', () => {
    const array = [0, 1, 2]
    expect(indexOfAtIndex(0, 0, array)).toBe(0)
  })

  test('returns -1 when trying to find 0 in array starting from 0 if no 0 can be found', () => {
    const array = ['a', 'b', 'c']
    expect(indexOfAtIndex(0, 0, array)).toBe(-1)
  })

  test('returns the index of -0 in array starting from 0', () => {
    const array = [0, -0, 0]
    expect(indexOfAtIndex(-0, 0, array)).toBe(1)
  })

  test('returns the index of NaN in array starting from 0', () => {
    const array = ['a', NaN, 'c']
    expect(indexOfAtIndex(NaN, 0, array)).toBe(1)
  })

  test('returns -1 when trying to find NaN in array starting from 0 if no NaN can be found', () => {
    const array = ['a', 'b', 'c']
    expect(indexOfAtIndex(NaN, 0, array)).toBe(-1)
  })

  test('returns the index of an object by value in array starting from 0', () => {
    const object1 = { a: 1 }
    const object2 = { b: 2 }
    const object3 = { c: 3 }
    const array = [object1, object2, object3]
    expect(indexOfAtIndex(object3, 0, array)).toBe(2)
  })

  test('returns the index of an object by value in array starting from 0', () => {
    const object1 = { a: 1 }
    const object2 = { b: 2 }
    const object3 = { c: 3 }
    const array = [object1, object2, object3]
    expect(indexOfAtIndex({ d: 4 }, 0, array)).toBe(-1)
  })

  test('returns the index of an object by value in array starting from 0', () => {
    const object1 = { a: 1 }
    const object2 = { b: 2 }
    const object3 = { c: 3 }
    const array = [object1, object2, object3]
    expect(indexOfAtIndex({ d: 4 }, 0, array)).toBe(-1)
  })

  test('returns the index of an object by value when no indexOf is present', () => {
    const object = {
      0: 'a',
      1: 'b',
      2: 'c',
      length: 3
    }
    expect(indexOfAtIndex('c', 0, object)).toBe(2)
  })
})
