import arrayIterator from './arrayIterator'

describe('arrayIterator', () => {
  test('creates an iterator for an array', () => {
    expect(arrayIterator([])).toEqual({
      next: expect.any(Function)
    })
  })

  test('creates an iterator for a string', () => {
    expect(arrayIterator('abc')).toEqual({
      next: expect.any(Function)
    })
  })

  test('creates an iterator for an object with length', () => {
    expect(arrayIterator({ length: 0 })).toEqual({
      next: expect.any(Function)
    })
  })

  test('creates an iterator at the starting point of the array', () => {
    const iterator = arrayIterator(['foo', 'bar'])
    let next = { done: false }
    const accum = []
    while (!next.done) {
      next = iterator.next()
      accum.push(next)
    }
    expect(accum).toEqual([
      { value: 'foo', index: 0, kdx: 0, done: false },
      { value: 'bar', index: 1, kdx: 1, done: false },
      { done: true }
    ])
  })

  test('throws for non array like values', () => {
    const errorRegex = /^arrayIterator expected arrayLike to be an ArrayLike value/
    expect(() => arrayIterator(undefined)).toThrow(errorRegex)
    expect(() => arrayIterator(null)).toThrow(errorRegex)
    expect(() => arrayIterator(false)).toThrow(errorRegex)
    expect(() => arrayIterator(true)).toThrow(errorRegex)
    expect(() => arrayIterator(0)).toThrow(errorRegex)
    expect(() => arrayIterator(-1)).toThrow(errorRegex)
    expect(() => arrayIterator(1)).toThrow(errorRegex)
    expect(() => arrayIterator(NaN)).toThrow(errorRegex)
    expect(() => arrayIterator(Infinity)).toThrow(errorRegex)
    expect(() => arrayIterator(-Infinity)).toThrow(errorRegex)
    expect(() => arrayIterator({})).toThrow(errorRegex)
    expect(() => arrayIterator(/abc/)).toThrow(errorRegex)
    expect(() => arrayIterator(async () => {})).toThrow(errorRegex)
    expect(() => arrayIterator(() => {})).toThrow(errorRegex)
    expect(() => arrayIterator(function() {})).toThrow(errorRegex)
    expect(() => arrayIterator((function*() {})())).toThrow(errorRegex)
    expect(() => arrayIterator(new ArrayBuffer(2))).toThrow(errorRegex)
    expect(() => arrayIterator(new Boolean(false))).toThrow(errorRegex)
    expect(() => arrayIterator(new Boolean(true))).toThrow(errorRegex)
    expect(() => arrayIterator(new Date())).toThrow(errorRegex)
    expect(() => arrayIterator(new Error())).toThrow(errorRegex)
    expect(() => arrayIterator(new Number(1))).toThrow(errorRegex)
    expect(() => arrayIterator(new Promise(() => {}))).toThrow(errorRegex)
    expect(() => arrayIterator(new Proxy({}, {}))).toThrow(errorRegex)
    expect(() => arrayIterator(new Set())).toThrow(errorRegex)
    expect(() => arrayIterator(Symbol('abc'))).toThrow(errorRegex)
    expect(() => arrayIterator(new WeakMap())).toThrow(errorRegex)
    expect(() => arrayIterator(new WeakSet())).toThrow(errorRegex)
  })
})
