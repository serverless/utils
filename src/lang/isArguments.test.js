import isArguments from './isArguments'

describe('isArguments', () => {
  test('identifies arguments from functions', async () => {
    // NOTE BRN: arrow functions do not have an arguments variable
    expect(function() {
      expect(isArguments(arguments)).toBe(true)
    }).not.toThrow()

    await (async function() {
      expect(isArguments(arguments)).toBe(true)
    })()

    const generator = (function*() {
      expect(isArguments(arguments)).toBe(true)
    })()
    generator.next()
  })

  test('returns false for all other values', () => {
    expect(isArguments(undefined)).toBe(false)
    expect(isArguments(null)).toBe(false)
    expect(isArguments('')).toBe(false)
    expect(isArguments('abc')).toBe(false)
    expect(isArguments(false)).toBe(false)
    expect(isArguments(true)).toBe(false)
    expect(isArguments(0)).toBe(false)
    expect(isArguments(-1)).toBe(false)
    expect(isArguments(1)).toBe(false)
    expect(isArguments(NaN)).toBe(false)
    expect(isArguments(Infinity)).toBe(false)
    expect(isArguments(-Infinity)).toBe(false)
    expect(isArguments({})).toBe(false)
    expect(isArguments([])).toBe(false)
    expect(isArguments(/abc/)).toBe(false)
    expect(isArguments(async () => {})).toBe(false)
    expect(isArguments(() => {})).toBe(false)
    expect(isArguments(function() {})).toBe(false)
    expect(isArguments(function*() {})).toBe(false)
    expect(isArguments((function*() {})())).toBe(false)
    expect(isArguments(new Array(0))).toBe(false)
    expect(isArguments(new ArrayBuffer(2))).toBe(false)
    expect(isArguments(new Boolean(false))).toBe(false)
    expect(isArguments(new Boolean(true))).toBe(false)
    expect(isArguments(new Date())).toBe(false)
    expect(isArguments(new Error())).toBe(false)
    expect(isArguments(new Number(1))).toBe(false)
    expect(isArguments(new Promise(() => {}))).toBe(false)
    expect(isArguments(new Proxy({}, {}))).toBe(false)
    expect(isArguments(new Set())).toBe(false)
    expect(isArguments(new String('abc'))).toBe(false)
    expect(isArguments(Symbol('abc'))).toBe(false)
    expect(isArguments(new WeakMap())).toBe(false)
    expect(isArguments(new WeakSet())).toBe(false)
  })
})
