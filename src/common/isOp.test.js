import __ from './__'
import isOp from './isOp'
import op from './op'

describe('isOp', () => {
  test('returns true for Op', () => {
    expect(
      isOp({
        ['@@redux-saga/IO']: 'op'
      })
    ).toBe(true)
    expect(isOp(op(() => {}))).toBe(true)
  })

  test('returns false for all other values', () => {
    expect(isOp(null)).toBe(false)
    expect(isOp(undefined)).toBe(false)
    expect(isOp('')).toBe(false)
    expect(isOp('abc')).toBe(false)
    expect(isOp(false)).toBe(false)
    expect(isOp(true)).toBe(false)
    expect(isOp(0)).toBe(false)
    expect(isOp(-1)).toBe(false)
    expect(isOp(1)).toBe(false)
    expect(isOp(NaN)).toBe(false)
    expect(isOp(Infinity)).toBe(false)
    expect(isOp(-Infinity)).toBe(false)
    expect(isOp([])).toBe(false)
    expect(isOp({})).toBe(false)
    expect(isOp(() => {})).toBe(false)
  })

  test('curries method with placeholder', () => {
    const testOp = isOp(__)
    expect(
      testOp({
        ['@@redux-saga/IO']: 'op'
      })
    ).toBe(true)
  })
})
