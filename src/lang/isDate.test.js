describe('isDate', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  test('returns true for instances of Date', () => {
    const isDate = require('./isDate').default
    expect(isDate(new Date())).toBe(true)
  })

  test('returns false for all other values', () => {
    const isDate = require('./isDate').default
    expect(isDate(undefined)).toBe(false)
    expect(isDate(null)).toBe(false)
    expect(isDate('')).toBe(false)
    expect(isDate('abc')).toBe(false)
    expect(isDate(false)).toBe(false)
    expect(isDate(true)).toBe(false)
    expect(isDate(0)).toBe(false)
    expect(isDate(-1)).toBe(false)
    expect(isDate(1)).toBe(false)
    expect(isDate(NaN)).toBe(false)
    expect(isDate(Infinity)).toBe(false)
    expect(isDate(-Infinity)).toBe(false)
    expect(isDate({})).toBe(false)
    expect(isDate([])).toBe(false)
    expect(isDate(/abc/)).toBe(false)
    expect(isDate(async () => {})).toBe(false)
    expect(isDate(() => {})).toBe(false)
    expect(isDate(function() {})).toBe(false)
    expect(isDate((function*() {})())).toBe(false)
    expect(isDate(new Array(0))).toBe(false)
    expect(isDate(new ArrayBuffer(2))).toBe(false)
    expect(isDate(new Boolean(false))).toBe(false)
    expect(isDate(new Boolean(true))).toBe(false)
    expect(isDate(new Error())).toBe(false)
    expect(isDate(new Number(1))).toBe(false)
    expect(isDate(new Promise(() => {}))).toBe(false)
    expect(isDate(new Proxy({}, {}))).toBe(false)
    expect(isDate(new Set())).toBe(false)
    expect(isDate(new String('abc'))).toBe(false)
    expect(isDate(Symbol('abc'))).toBe(false)
    expect(isDate(new WeakMap())).toBe(false)
    expect(isDate(new WeakSet())).toBe(false)
  })

  test('returns true for instances of Date using non node isDate method', () => {
    jest.mock('./nodeTypes', () => ({
      ...require.requireActual('./nodeTypes'),
      isDate: undefined
    }))
    const isDate = require('./isDate').default
    expect(isDate(new Date())).toBe(true)
  })

  test('returns false for all other values using non node isDate method', () => {
    jest.mock('./nodeTypes', () => ({
      ...require.requireActual('./nodeTypes'),
      isDate: undefined
    }))
    const isDate = require('./isDate').default
    expect(isDate(undefined)).toBe(false)
    expect(isDate(null)).toBe(false)
    expect(isDate('')).toBe(false)
    expect(isDate('abc')).toBe(false)
    expect(isDate(false)).toBe(false)
    expect(isDate(true)).toBe(false)
    expect(isDate(0)).toBe(false)
    expect(isDate(-1)).toBe(false)
    expect(isDate(1)).toBe(false)
    expect(isDate(NaN)).toBe(false)
    expect(isDate(Infinity)).toBe(false)
    expect(isDate(-Infinity)).toBe(false)
    expect(isDate({})).toBe(false)
    expect(isDate([])).toBe(false)
    expect(isDate(/abc/)).toBe(false)
    expect(isDate(async () => {})).toBe(false)
    expect(isDate(() => {})).toBe(false)
    expect(isDate(function() {})).toBe(false)
    expect(isDate((function*() {})())).toBe(false)
    expect(isDate(new Array(0))).toBe(false)
    expect(isDate(new ArrayBuffer(2))).toBe(false)
    expect(isDate(new Boolean(false))).toBe(false)
    expect(isDate(new Boolean(true))).toBe(false)
    expect(isDate(new Error())).toBe(false)
    expect(isDate(new Number(1))).toBe(false)
    expect(isDate(new Promise(() => {}))).toBe(false)
    expect(isDate(new Proxy({}, {}))).toBe(false)
    expect(isDate(new Set())).toBe(false)
    expect(isDate(new String('abc'))).toBe(false)
    expect(isDate(Symbol('abc'))).toBe(false)
    expect(isDate(new WeakMap())).toBe(false)
    expect(isDate(new WeakSet())).toBe(false)
  })
})
