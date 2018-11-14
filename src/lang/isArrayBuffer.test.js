describe('isArrayBuffer', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  test('returns true for instance of ArrayBuffer', () => {
    const isArrayBuffer = require('./isArrayBuffer').default
    expect(isArrayBuffer(new ArrayBuffer(2))).toBe(true)
  })

  test('returns false for all other values', () => {
    const isArrayBuffer = require('./isArrayBuffer').default
    expect(isArrayBuffer(undefined)).toBe(false)
    expect(isArrayBuffer(null)).toBe(false)
    expect(isArrayBuffer('')).toBe(false)
    expect(isArrayBuffer('abc')).toBe(false)
    expect(isArrayBuffer(false)).toBe(false)
    expect(isArrayBuffer(true)).toBe(false)
    expect(isArrayBuffer(0)).toBe(false)
    expect(isArrayBuffer(-1)).toBe(false)
    expect(isArrayBuffer(1)).toBe(false)
    expect(isArrayBuffer(NaN)).toBe(false)
    expect(isArrayBuffer(Infinity)).toBe(false)
    expect(isArrayBuffer(-Infinity)).toBe(false)
    expect(isArrayBuffer({})).toBe(false)
    expect(isArrayBuffer([])).toBe(false)
    expect(isArrayBuffer(/abc/)).toBe(false)
    expect(isArrayBuffer(async () => {})).toBe(false)
    expect(isArrayBuffer(() => {})).toBe(false)
    expect(isArrayBuffer(function() {})).toBe(false)
    expect(isArrayBuffer((function*() {})())).toBe(false)
    expect(isArrayBuffer(new Array(0))).toBe(false)
    expect(isArrayBuffer(new Boolean(false))).toBe(false)
    expect(isArrayBuffer(new Boolean(true))).toBe(false)
    expect(isArrayBuffer(new Date())).toBe(false)
    expect(isArrayBuffer(new Error())).toBe(false)
    expect(isArrayBuffer(new Number(1))).toBe(false)
    expect(isArrayBuffer(new Promise(() => {}))).toBe(false)
    expect(isArrayBuffer(new Proxy({}, {}))).toBe(false)
    expect(isArrayBuffer(new Set())).toBe(false)
    expect(isArrayBuffer(new String('abc'))).toBe(false)
    expect(isArrayBuffer(Symbol('abc'))).toBe(false)
    expect(isArrayBuffer(new WeakMap())).toBe(false)
    expect(isArrayBuffer(new WeakSet())).toBe(false)
  })

  test('returns true for instance of ArrayBuffer using non node isArrayBuffer method', () => {
    jest.mock('./nodeTypes', () => ({
      ...require.requireActual('./nodeTypes'),
      isArrayBuffer: undefined
    }))
    const isArrayBuffer = require('./isArrayBuffer').default
    expect(isArrayBuffer(new ArrayBuffer(2))).toBe(true)
  })

  test('returns false for all other values using non node isArrayBuffer method', () => {
    jest.mock('./nodeTypes', () => ({
      ...require.requireActual('./nodeTypes'),
      isArrayBuffer: undefined
    }))
    const isArrayBuffer = require('./isArrayBuffer').default
    expect(isArrayBuffer(undefined)).toBe(false)
    expect(isArrayBuffer(null)).toBe(false)
    expect(isArrayBuffer('')).toBe(false)
    expect(isArrayBuffer('abc')).toBe(false)
    expect(isArrayBuffer(false)).toBe(false)
    expect(isArrayBuffer(true)).toBe(false)
    expect(isArrayBuffer(0)).toBe(false)
    expect(isArrayBuffer(-1)).toBe(false)
    expect(isArrayBuffer(1)).toBe(false)
    expect(isArrayBuffer(NaN)).toBe(false)
    expect(isArrayBuffer(Infinity)).toBe(false)
    expect(isArrayBuffer(-Infinity)).toBe(false)
    expect(isArrayBuffer({})).toBe(false)
    expect(isArrayBuffer([])).toBe(false)
    expect(isArrayBuffer(/abc/)).toBe(false)
    expect(isArrayBuffer(async () => {})).toBe(false)
    expect(isArrayBuffer(() => {})).toBe(false)
    expect(isArrayBuffer(function() {})).toBe(false)
    expect(isArrayBuffer((function*() {})())).toBe(false)
    expect(isArrayBuffer(new Array(0))).toBe(false)
    expect(isArrayBuffer(new Boolean(false))).toBe(false)
    expect(isArrayBuffer(new Boolean(true))).toBe(false)
    expect(isArrayBuffer(new Date())).toBe(false)
    expect(isArrayBuffer(new Error())).toBe(false)
    expect(isArrayBuffer(new Number(1))).toBe(false)
    expect(isArrayBuffer(new Promise(() => {}))).toBe(false)
    expect(isArrayBuffer(new Proxy({}, {}))).toBe(false)
    expect(isArrayBuffer(new Set())).toBe(false)
    expect(isArrayBuffer(new String('abc'))).toBe(false)
    expect(isArrayBuffer(Symbol('abc'))).toBe(false)
    expect(isArrayBuffer(new WeakMap())).toBe(false)
    expect(isArrayBuffer(new WeakSet())).toBe(false)
  })
})
