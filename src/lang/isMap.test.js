describe('isMap', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  test('returns true for instances of Map', () => {
    const isMap = require('./isMap').default
    expect(isMap(new Map())).toBe(true)
  })

  test('returns false for all other values', () => {
    const isMap = require('./isMap').default
    expect(isMap(undefined)).toBe(false)
    expect(isMap(null)).toBe(false)
    expect(isMap('')).toBe(false)
    expect(isMap('abc')).toBe(false)
    expect(isMap(false)).toBe(false)
    expect(isMap(true)).toBe(false)
    expect(isMap(0)).toBe(false)
    expect(isMap(-1)).toBe(false)
    expect(isMap(1)).toBe(false)
    expect(isMap(NaN)).toBe(false)
    expect(isMap(Infinity)).toBe(false)
    expect(isMap(-Infinity)).toBe(false)
    expect(isMap({})).toBe(false)
    expect(isMap([])).toBe(false)
    expect(isMap(/abc/)).toBe(false)
    expect(isMap(new RegExp('abc'))).toBe(false)
    expect(isMap(async () => {})).toBe(false)
    expect(isMap(() => {})).toBe(false)
    expect(isMap(function() {})).toBe(false)
    expect(isMap(function*() {})).toBe(false)
    expect(isMap((function*() {})())).toBe(false)
    expect(isMap(new Array(0))).toBe(false)
    expect(isMap(new ArrayBuffer(2))).toBe(false)
    expect(isMap(new Boolean(false))).toBe(false)
    expect(isMap(new Boolean(true))).toBe(false)
    expect(isMap(new Date())).toBe(false)
    expect(isMap(new Error())).toBe(false)
    expect(isMap(new Number(1))).toBe(false)
    expect(isMap(new Promise(() => {}))).toBe(false)
    expect(isMap(new Proxy({}, {}))).toBe(false)
    expect(isMap(new Set())).toBe(false)
    expect(isMap(new String('abc'))).toBe(false)
    expect(isMap(Symbol('abc'))).toBe(false)
    expect(isMap(new WeakMap())).toBe(false)
    expect(isMap(new WeakSet())).toBe(false)
  })

  test('returns true for instances of Map using non node isMap method', () => {
    jest.mock('./nodeTypes', () => ({
      ...require.requireActual('./nodeTypes'),
      isMap: undefined
    }))
    const isMap = require('./isMap').default
    expect(isMap(new Map())).toBe(true)
  })

  test('returns false for all other values using non node isMap method', () => {
    jest.mock('./nodeTypes', () => ({
      ...require.requireActual('./nodeTypes'),
      isMap: undefined
    }))
    const isMap = require('./isMap').default
    expect(isMap(undefined)).toBe(false)
    expect(isMap(null)).toBe(false)
    expect(isMap('')).toBe(false)
    expect(isMap('abc')).toBe(false)
    expect(isMap(false)).toBe(false)
    expect(isMap(true)).toBe(false)
    expect(isMap(0)).toBe(false)
    expect(isMap(-1)).toBe(false)
    expect(isMap(1)).toBe(false)
    expect(isMap(NaN)).toBe(false)
    expect(isMap(Infinity)).toBe(false)
    expect(isMap(-Infinity)).toBe(false)
    expect(isMap({})).toBe(false)
    expect(isMap([])).toBe(false)
    expect(isMap(/abc/)).toBe(false)
    expect(isMap(new RegExp('abc'))).toBe(false)
    expect(isMap(async () => {})).toBe(false)
    expect(isMap(() => {})).toBe(false)
    expect(isMap(function() {})).toBe(false)
    expect(isMap(function*() {})).toBe(false)
    expect(isMap((function*() {})())).toBe(false)
    expect(isMap(new Array(0))).toBe(false)
    expect(isMap(new ArrayBuffer(2))).toBe(false)
    expect(isMap(new Boolean(false))).toBe(false)
    expect(isMap(new Boolean(true))).toBe(false)
    expect(isMap(new Date())).toBe(false)
    expect(isMap(new Error())).toBe(false)
    expect(isMap(new Number(1))).toBe(false)
    expect(isMap(new Promise(() => {}))).toBe(false)
    expect(isMap(new Proxy({}, {}))).toBe(false)
    expect(isMap(new Set())).toBe(false)
    expect(isMap(new String('abc'))).toBe(false)
    expect(isMap(Symbol('abc'))).toBe(false)
    expect(isMap(new WeakMap())).toBe(false)
    expect(isMap(new WeakSet())).toBe(false)
  })
})
