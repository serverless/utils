import { SYMBOL_ITERATOR } from '../constants'
import isIterator from './isIterator'

describe('isIterator', () => {
  test('returns true for array iterator', () => {
    const array = []
    expect(isIterator(array[SYMBOL_ITERATOR]())).toBe(true)
  })

  test('returns true for string iterator', () => {
    const string = 'abc'
    expect(isIterator(string[SYMBOL_ITERATOR]())).toBe(true)
  })

  test('returns true for generators', () => {
    expect(isIterator((function*() {})())).toBe(true)
  })

  test('returns true for Set', () => {
    const set = new Set()
    expect(isIterator(set[SYMBOL_ITERATOR]())).toBe(true)
  })

  test('returns true for object with next method', () => {
    expect(
      isIterator({
        next: () => ({
          done: true
        })
      })
    ).toBe(true)
  })

  test('returns false for all other values', () => {
    expect(isIterator(undefined)).toBe(false)
    expect(isIterator(null)).toBe(false)
    expect(isIterator(false)).toBe(false)
    expect(isIterator(true)).toBe(false)
    expect(isIterator(0)).toBe(false)
    expect(isIterator(-1)).toBe(false)
    expect(isIterator(1)).toBe(false)
    expect(isIterator(NaN)).toBe(false)
    expect(isIterator(Infinity)).toBe(false)
    expect(isIterator(-Infinity)).toBe(false)
    expect(isIterator(/abc/)).toBe(false)
    expect(isIterator(async () => {})).toBe(false)
    expect(isIterator(() => {})).toBe(false)
    expect(isIterator(function() {})).toBe(false)
    expect(isIterator(function*() {})).toBe(false)
    expect(isIterator(new ArrayBuffer(2))).toBe(false)
    expect(isIterator(new Boolean(false))).toBe(false)
    expect(isIterator(new Boolean(true))).toBe(false)
    expect(isIterator(new Date())).toBe(false)
    expect(isIterator(new Error())).toBe(false)
    expect(isIterator(new Number(-1.2))).toBe(false)
    expect(isIterator(new Number(1.2))).toBe(false)
    expect(isIterator(new Number(NaN))).toBe(false)
    expect(isIterator(new Number(Infinity))).toBe(false)
    expect(isIterator(new Number(-Infinity))).toBe(false)
    expect(isIterator(new Promise(() => {}))).toBe(false)
    expect(isIterator(new Proxy({}, {}))).toBe(false)
    expect(isIterator(Symbol('abc'))).toBe(false)
    expect(isIterator(new WeakMap())).toBe(false)
    expect(isIterator(new WeakSet())).toBe(false)
  })
})
