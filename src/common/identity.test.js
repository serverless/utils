import { forEach } from 'ramda'
import identity from './identity'

describe('identity', () => {
  test('returns primitive values given as the first parameter', () => {
    expect(identity(undefined)).toBe(undefined)
    expect(identity(null)).toBe(null)
    expect(identity('')).toBe('')
    expect(identity('abc')).toBe('abc')
    expect(identity(0)).toBe(0)
    expect(identity(-1)).toBe(-1)
    expect(identity(1)).toBe(1)
    expect(identity(NaN)).toBe(NaN)
    expect(identity(Infinity)).toBe(Infinity)
    expect(identity(-Infinity)).toBe(-Infinity)
  })

  test('returns the same instance for object values', () => {
    const testValue = (value) => expect(identity(value)).toBe(value)

    const values = [
      {},
      [],
      /abc/,
      async () => {},
      () => {},
      function() {},
      (function*() {})(),
      new Array(0),
      new ArrayBuffer(2),
      new Date(),
      new Error(),
      new Number(1),
      new Promise(() => {}),
      new Proxy({}, {}),
      new Set(),
      new String('abc'),
      Symbol('abc'),
      new WeakMap(),
      new WeakSet()
    ]
    forEach((value) => testValue(value), values)
  })

  test('returns undefined when executed with no parameters', () => {
    expect(identity()).toBe(undefined)
  })
})
