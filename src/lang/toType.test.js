import toType from './toType'

describe('toType', () => {
  test('converts undefined to the Undefined string type', () => {
    expect(toType(undefined)).toBe('Undefined')
  })

  test('converts null to the Null string type', () => {
    expect(toType(null)).toBe('Null')
  })

  test('converts strings to the String string type', () => {
    expect(toType('')).toBe('String')
    expect(toType('abc')).toBe('String')
    expect(toType(new String(''))).toBe('String')
    expect(toType(new String('abc'))).toBe('String')
  })

  test('converts booleans to the Boolean string type', () => {
    expect(toType(true)).toBe('Boolean')
    expect(toType(false)).toBe('Boolean')
    expect(toType(new Boolean(true))).toBe('Boolean')
    expect(toType(new Boolean(false))).toBe('Boolean')
  })

  test('converts numbers to the Number string type', () => {
    expect(toType(0)).toBe('Number')
    expect(toType(-0)).toBe('Number')
    expect(toType(1)).toBe('Number')
    expect(toType(-1)).toBe('Number')
    expect(toType(1.23)).toBe('Number')
    expect(toType(-1.23)).toBe('Number')
    expect(toType(NaN)).toBe('Number')
    expect(toType(Infinity)).toBe('Number')
    expect(toType(-Infinity)).toBe('Number')

    expect(toType(new Number(0))).toBe('Number')
    expect(toType(new Number(-0))).toBe('Number')
    expect(toType(new Number(1))).toBe('Number')
    expect(toType(new Number(-1))).toBe('Number')
    expect(toType(new Number(1.23))).toBe('Number')
    expect(toType(new Number(-1.23))).toBe('Number')
    expect(toType(new Number(NaN))).toBe('Number')
    expect(toType(new Number(Infinity))).toBe('Number')
    expect(toType(new Number(-Infinity))).toBe('Number')
  })

  test('converts classes to the Object string type', () => {
    class Test {}
    expect(toType(new Test())).toBe('Object')
  })
})

// expect(isArray({})).toBe(false)
// expect(isArray(/abc/)).toBe(false)
// expect(isArray(async () => {})).toBe(false)
// expect(isArray(() => {})).toBe(false)
// expect(isArray(function() {})).toBe(false)
// expect(isArray((function*() {})())).toBe(false)
// expect(isArray(new ArrayBuffer(2))).toBe(false)
// expect(isArray(new Boolean(false))).toBe(false)
// expect(isArray(new Boolean(true))).toBe(false)
// expect(isArray(new Date())).toBe(false)
// expect(isArray(new Error())).toBe(false)
// expect(isArray(new Map())).toBe(false)
// expect(isArray(new Number(1))).toBe(false)
// expect(isArray(new Promise(() => {}))).toBe(false)
// expect(isArray(new Proxy({}, {}))).toBe(false)
// expect(isArray(new Set())).toBe(false)
// expect(isArray(new String('abc'))).toBe(false)
// expect(isArray(Symbol('abc'))).toBe(false)
// expect(isArray(Symbol.for('def'))).toBe(false)
// expect(isArray(new WeakMap())).toBe(false)
// expect(isArray(new WeakSet())).toBe(false)
