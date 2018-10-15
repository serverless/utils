import isEmpty from './isEmpty'

describe('isEmpty', () => {
  test('identifies null as empty', () => {
    expect(isEmpty(null)).toBe(true)
  })

  test('identifies booleans as empty', () => {
    expect(isEmpty(false)).toBe(true)
    expect(isEmpty(true)).toBe(true)
  })

  test('identifies numbers as empty', () => {
    expect(isEmpty(1)).toBe(true)
    expect(isEmpty(0)).toBe(true)
    expect(isEmpty(-1)).toBe(true)
    expect(isEmpty(Infinity)).toBe(true)
    expect(isEmpty(-Infinity)).toBe(true)
  })

  test('identifies NaN as empty', () => {
    expect(isEmpty(NaN)).toBe(true)
  })

  test('identifies empty object as empty', () => {
    expect(isEmpty({})).toBe(true)
  })

  test('identifies non empty object as not empty', () => {
    expect(isEmpty({ foo: 'bar' })).toBe(false)
  })

  test('identifies empty array as empty', () => {
    expect(isEmpty([])).toBe(true)
  })

  test('identifies non empty array as not empty', () => {
    expect(isEmpty(['bar'])).toBe(false)
  })

  test('identifies empty string as empty', () => {
    expect(isEmpty('')).toBe(true)
  })

  test('identifies non empty string as not empty', () => {
    expect(isEmpty('abc')).toBe(false)
  })

  test('identifies empty arguments as empty', () => {
    ;(function() {
      expect(isEmpty(arguments)).toBe(true)
    })()
  })

  test('identifies non empty arguments as not empty', () => {
    ;(function() {
      expect(isEmpty(arguments)).toBe(false)
    })('foo')
  })

  test('identifies empty TypedArray as empty', () => {
    expect(isEmpty(new Uint8Array())).toBe(true)
  })

  test('identifies non empty TypedArray as not empty', () => {
    expect(isEmpty(new Uint8Array([21, 31]))).toBe(false)
  })

  test('identifies empty Buffer as empty', () => {
    expect(isEmpty(new ArrayBuffer())).toBe(true)
  })

  // test('identifies non empty Buffer as not empty', () => {
  // NOTE BRN: This doesn't work
  //   expect(isEmpty(new ArrayBuffer([21, 31]))).toBe(false)
  // })

  test('identifies empty Set as empty', () => {
    expect(isEmpty(new Set())).toBe(true)
  })

  test('identifies non empty Set as not empty', () => {
    expect(isEmpty(new Set(['foo']))).toBe(false)
  })

  test('identifies empty Map as empty', () => {
    expect(isEmpty(new Map())).toBe(true)
  })

  test('identifies non empty Map as not empty', () => {
    expect(isEmpty(new Map([['foo', 'bar']]))).toBe(false)
  })

  test('identifies empty prototype as empty', () => {
    function Test() {}
    const test = new Test()
    expect(isEmpty(Object.getPrototypeOf(test))).toBe(true)
  })

  test('identifies non empty Prototype as not empty', () => {
    function Test() {}
    Test.prototype.foo = function() {}
    const test = new Test()
    expect(isEmpty(Object.getPrototypeOf(test))).toBe(false)
  })
})
