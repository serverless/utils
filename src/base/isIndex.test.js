import { MAX_SAFE_INTEGER } from '../constants'
import isIndex from './isIndex'

describe('isIndex', () => {
  test('returns true for positive integer numbers', () => {
    expect(isIndex(0)).toBe(true)
    expect(isIndex(1)).toBe(true)
    expect(isIndex(MAX_SAFE_INTEGER - 1)).toBe(true)
  })

  test('returns true for Number objects that are positive integers', () => {
    expect(isIndex(new Number(0))).toBe(true)
    expect(isIndex(new Number(1))).toBe(true)
    expect(isIndex(new Number(MAX_SAFE_INTEGER - 1))).toBe(true)
  })

  test('returns true for string values that are string integers', () => {
    expect(isIndex('3')).toBe(true)
  })

  test('returns false for number greater than or equal to MAX_SAFE_INTEGER', () => {
    expect(isIndex(MAX_SAFE_INTEGER)).toBe(false)
    expect(isIndex(MAX_SAFE_INTEGER + 1)).toBe(false)
  })

  test('returns false for primitive numbers that are not integers', () => {
    expect(isIndex(-1.2)).toBe(false)
    expect(isIndex(1.2)).toBe(false)
  })

  test('returns false for NaN', () => {
    expect(isIndex(NaN)).toBe(false)
  })

  test('returns false for Infinity', () => {
    expect(isIndex(Infinity)).toBe(false)
    expect(isIndex(-Infinity)).toBe(false)
  })

  test('returns false for MIN_VALUE', () => {
    expect(isIndex(Number.MIN_VALUE)).toBe(false)
  })

  test('returns false for Number objects that are not integers', () => {
    expect(isIndex(new Number(-1.2))).toBe(false)
    expect(isIndex(new Number(1.2))).toBe(false)
    expect(isIndex(new Number(NaN))).toBe(false)
    expect(isIndex(new Number(Infinity))).toBe(false)
    expect(isIndex(new Number(-Infinity))).toBe(false)
  })

  test('returns false for all other values', () => {
    expect(isIndex(undefined)).toBe(false)
    expect(isIndex(null)).toBe(false)
    expect(isIndex(false)).toBe(false)
    expect(isIndex(true)).toBe(false)
    expect(isIndex('')).toBe(false)
    expect(isIndex('abc')).toBe(false)
    expect(isIndex(/abc/)).toBe(false)
    expect(isIndex([])).toBe(false)
    expect(isIndex({})).toBe(false)
    expect(isIndex(async () => {})).toBe(false)
    expect(isIndex(() => {})).toBe(false)
    expect(isIndex(function() {})).toBe(false)
    expect(isIndex(function*() {})).toBe(false)
    expect(isIndex((function*() {})())).toBe(false)
    expect(isIndex(new Array(0))).toBe(false)
    expect(isIndex(new ArrayBuffer(2))).toBe(false)
    expect(isIndex(new Boolean(false))).toBe(false)
    expect(isIndex(new Boolean(true))).toBe(false)
    expect(isIndex(new Date())).toBe(false)
    expect(isIndex(new Error())).toBe(false)
    expect(isIndex(new Promise(() => {}))).toBe(false)
    expect(isIndex(new Proxy({}, {}))).toBe(false)
    expect(isIndex(new Set())).toBe(false)
    expect(isIndex(new String())).toBe(false)
    expect(isIndex(new String(''))).toBe(false)
    expect(isIndex(new String('abc'))).toBe(false)
    expect(isIndex(Symbol('abc'))).toBe(false)
    expect(isIndex(new WeakMap())).toBe(false)
    expect(isIndex(new WeakSet())).toBe(false)
  })
})
