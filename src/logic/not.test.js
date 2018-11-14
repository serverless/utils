import __ from '../common/__'
import not from './not'

describe('not', () => {
  test('not false for truthy values', () => {
    expect(not(true)).toBe(false)
    expect(not(1)).toBe(false)
    expect(not('abc')).toBe(false)
    expect(not({})).toBe(false)
    expect(not([])).toBe(false)
  })

  test('not true for falsey values', () => {
    expect(not(false)).toBe(true)
    expect(not(undefined)).toBe(true)
    expect(not(null)).toBe(true)
    expect(not(0)).toBe(true)
    expect(not('')).toBe(true)
    expect(not(NaN)).toBe(true)
  })

  test('curries method with placeholder', () => {
    const notP = not(__)
    expect(notP(1)).toBe(false)
  })

  test('dispatched to not method if present', () => {
    expect(
      not({
        not: () => true
      })
    ).toBe(true)
  })
})
