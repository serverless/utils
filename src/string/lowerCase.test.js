import __ from '../common/__'
import lowerCase from './lowerCase'

describe('lowerCase', () => {
  test('converts upper case string to lower case', () => {
    expect(lowerCase('ABC')).toBe('abc')
  })

  test('preserves lower case', () => {
    expect(lowerCase('abc')).toBe('abc')
  })

  test('empty string remains empty', () => {
    expect(lowerCase('')).toBe('')
  })

  test('string objects are processed as strings', () => {
    expect(lowerCase(new String('ABC'))).toBe('abc')
  })

  test('converts non string values to string', () => {
    expect(lowerCase(undefined)).toBe('')
    expect(lowerCase(null)).toBe('')
    expect(lowerCase(false)).toBe('false')
    expect(lowerCase(true)).toBe('true')
    expect(lowerCase(0)).toBe('0')
    expect(lowerCase(-1)).toBe('-1')
    expect(lowerCase(1)).toBe('1')
    expect(lowerCase(NaN)).toBe('nan')
    expect(lowerCase(Infinity)).toBe('infinity')
    expect(lowerCase(-Infinity)).toBe('-infinity')
    expect(lowerCase({})).toBe('[object object]')
    expect(lowerCase(/ABC/)).toBe('/abc/')
    expect(lowerCase(new ArrayBuffer(2))).toBe('[object arraybuffer]')
    expect(lowerCase(new Boolean(false))).toBe('false')
    expect(lowerCase(new Boolean(true))).toBe('true')
    expect(lowerCase(new Date('December 17, 1995 03:24:00'))).toMatch(
      /^sun dec 17 1995 03:24:00 gmt/
    )
    expect(lowerCase(new Error())).toBe('error')
    expect(lowerCase(new Map())).toBe('[object map]')
    expect(lowerCase(new Number(1))).toBe('1')
    expect(lowerCase(new Proxy({}, {}))).toBe('[object object]')
    expect(lowerCase(new Set())).toBe('[object set]')
    expect(lowerCase(Symbol('ABC'))).toBe('symbol(abc)')
    expect(lowerCase(Symbol.for('DEF'))).toBe('symbol(def)')
    expect(lowerCase(new WeakMap())).toBe('[object weakmap]')
    expect(lowerCase(new WeakSet())).toBe('[object weakset]')
  })

  test('curries method with placeholder', () => {
    const lowerCaseLater = lowerCase(__)
    expect(lowerCaseLater('ABC')).toBe('abc')
  })

  test('upgrades to async when a Promise is received', async () => {
    const result = lowerCase(Promise.resolve('ABC'))
    expect(result).toBeInstanceOf(Promise)
    expect(await result).toBe('abc')
  })
})
