import __ from '../common/__'
import is from './is'

describe('is', () => {
  test('identifies values using built in js constructors', () => {
    expect(is(Object, {})).toBe(true)
    expect(is(Number, 1)).toBe(true)
    expect(is(Object, 1)).toBe(false)
    expect(is(String, 's')).toBe(true)
    expect(is(String, new String(''))).toBe(true)
    expect(is(Object, new String(''))).toBe(true)
    expect(is(Object, 's')).toBe(false)
    expect(is(Number, {})).toBe(false)
  })

  test('curries method', () => {
    const isObject = is(Object)
    expect(isObject({})).toBe(true)
  })

  test('curries method with placeholder', () => {
    const isP = is(__)
    const isObject = isP(Object)
    expect(isObject({})).toBe(true)
  })

  test('does not resolve values', () => {
    expect(
      is(Object, {
        resolve: () => 123
      })
    ).toBe(true)
  })

  test('dispatches to is method of object', () => {
    expect(
      is(String, {
        is: (Constructor) => {
          expect(Constructor).toBe(String)
          return new String('foo') instanceof Constructor
        }
      })
    ).toBe(true)
  })
})
