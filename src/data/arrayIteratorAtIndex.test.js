import arrayIteratorAtIndex from './arrayIteratorAtIndex'

describe('arrayIteratorAtIndex', () => {
  test('creates an iterator for an array', () => {
    expect(arrayIteratorAtIndex([])).toEqual({
      next: expect.any(Function)
    })
  })

  test('creates an iterator for a string', () => {
    expect(arrayIteratorAtIndex('abc')).toEqual({
      next: expect.any(Function)
    })
  })

  test('creates an iterator for an object with length', () => {
    expect(arrayIteratorAtIndex({ length: 0 })).toEqual({
      next: expect.any(Function)
    })
  })

  test('creates an iterator that defaults to the starting point of the array', () => {
    const iterator = arrayIteratorAtIndex(['foo', 'bar'])
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

  test('starts at the given index', () => {
    const iterator = arrayIteratorAtIndex(['foo', 'bar'], 1)
    let next = { done: false }
    const accum = []
    while (!next.done) {
      next = iterator.next()
      accum.push(next)
    }
    expect(accum).toEqual([{ value: 'bar', index: 1, kdx: 1, done: false }, { done: true }])
  })

  test('throws for non array like values', () => {
    const errorRegex = /^arrayIteratorAtIndex expected arrayLike to be an ArrayLike value/
    expect(() => arrayIteratorAtIndex(undefined)).toThrow(errorRegex)
    expect(() => arrayIteratorAtIndex(null)).toThrow(errorRegex)
    expect(() => arrayIteratorAtIndex(false)).toThrow(errorRegex)
    expect(() => arrayIteratorAtIndex(true)).toThrow(errorRegex)
    expect(() => arrayIteratorAtIndex(0)).toThrow(errorRegex)
    expect(() => arrayIteratorAtIndex(-1)).toThrow(errorRegex)
    expect(() => arrayIteratorAtIndex(1)).toThrow(errorRegex)
    expect(() => arrayIteratorAtIndex(NaN)).toThrow(errorRegex)
    expect(() => arrayIteratorAtIndex(Infinity)).toThrow(errorRegex)
    expect(() => arrayIteratorAtIndex(-Infinity)).toThrow(errorRegex)
    expect(() => arrayIteratorAtIndex({})).toThrow(errorRegex)
    expect(() => arrayIteratorAtIndex(/abc/)).toThrow(errorRegex)
    expect(() => arrayIteratorAtIndex(async () => {})).toThrow(errorRegex)
    expect(() => arrayIteratorAtIndex(() => {})).toThrow(errorRegex)
    expect(() => arrayIteratorAtIndex(function() {})).toThrow(errorRegex)
    expect(() => arrayIteratorAtIndex((function*() {})())).toThrow(errorRegex)
    expect(() => arrayIteratorAtIndex(new ArrayBuffer(2))).toThrow(errorRegex)
    expect(() => arrayIteratorAtIndex(new Boolean(false))).toThrow(errorRegex)
    expect(() => arrayIteratorAtIndex(new Boolean(true))).toThrow(errorRegex)
    expect(() => arrayIteratorAtIndex(new Date())).toThrow(errorRegex)
    expect(() => arrayIteratorAtIndex(new Error())).toThrow(errorRegex)
    expect(() => arrayIteratorAtIndex(new Number(1))).toThrow(errorRegex)
    expect(() => arrayIteratorAtIndex(new Promise(() => {}))).toThrow(errorRegex)
    expect(() => arrayIteratorAtIndex(new Proxy({}, {}))).toThrow(errorRegex)
    expect(() => arrayIteratorAtIndex(new Set())).toThrow(errorRegex)
    expect(() => arrayIteratorAtIndex(Symbol('abc'))).toThrow(errorRegex)
    expect(() => arrayIteratorAtIndex(new WeakMap())).toThrow(errorRegex)
    expect(() => arrayIteratorAtIndex(new WeakSet())).toThrow(errorRegex)
  })
})
