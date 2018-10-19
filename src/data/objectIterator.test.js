import objectIterator from './objectIterator'

describe('objectIterator', () => {
  test('creates an iterator for an object', () => {
    expect(objectIterator({})).toEqual({
      next: expect.any(Function)
    })
  })

  // TODO BRN: For the following special values we need to add tests that ensure the iterator iterates over the objects properties and not the array values only
  test('creates an object iterator for an array', () => {
    expect(objectIterator([])).toEqual({
      next: expect.any(Function)
    })
  })

  // TODO BRN: For the following special values we need to add tests that ensure the iterator iterates over the regexp's object properties
  test('creates an object iterator for a regexp', () => {
    expect(objectIterator(/abc/)).toEqual({
      next: expect.any(Function)
    })
  })

  // TODO BRN: For the following special values we need to add tests that ensure the iterator iterates over the functions's object properties
  test('creates an object iterator for functions', () => {
    expect(objectIterator(async () => {})).toEqual({
      next: expect.any(Function)
    })
    expect(objectIterator(() => {})).toEqual({
      next: expect.any(Function)
    })
    expect(objectIterator(function() {})).toEqual({
      next: expect.any(Function)
    })
    expect(objectIterator(async function() {})).toEqual({
      next: expect.any(Function)
    })
    expect(objectIterator(function*() {})).toEqual({
      next: expect.any(Function)
    })
  })

  // TODO BRN: For the following special values we need to add tests that ensure the iterator iterates over the generator's object properties
  test('creates an object iterator for generators', () => {
    expect(objectIterator((function*() {})())).toEqual({
      next: expect.any(Function)
    })
  })

  // TODO BRN: For the following special values we need to add tests that ensure the iterator iterates over the native object's properties
  test('creates an iterator for native objects', () => {
    expect(objectIterator(new ArrayBuffer(2))).toEqual({
      next: expect.any(Function)
    })
    expect(objectIterator(new Boolean(false))).toEqual({
      next: expect.any(Function)
    })
    expect(objectIterator(new Boolean(true))).toEqual({
      next: expect.any(Function)
    })
    expect(objectIterator(new Date())).toEqual({
      next: expect.any(Function)
    })
    expect(objectIterator(new Error())).toEqual({
      next: expect.any(Function)
    })
    expect(objectIterator(new Map())).toEqual({
      next: expect.any(Function)
    })
    expect(objectIterator(new Number(1))).toEqual({
      next: expect.any(Function)
    })
    expect(objectIterator(new Promise(() => {}))).toEqual({
      next: expect.any(Function)
    })
    expect(objectIterator(new Set())).toEqual({
      next: expect.any(Function)
    })
    expect(objectIterator(new String('abc'))).toEqual({
      next: expect.any(Function)
    })
    expect(objectIterator(new WeakMap())).toEqual({
      next: expect.any(Function)
    })
    expect(objectIterator(new WeakSet())).toEqual({
      next: expect.any(Function)
    })
  })

  // TODO BRN: For the following special values we need to add tests that ensure the iterator iterates over the length as a property
  test('creates an iterator for an object with length', () => {
    expect(objectIterator({ length: 0 })).toEqual({
      next: expect.any(Function)
    })
  })

  test('creates an iterator for the object', () => {
    const iterator = objectIterator({ foo: 'bar', bim: 'bop' })
    let next = { done: false }
    const accum = []
    while (!next.done) {
      next = iterator.next()
      accum.push(next)
    }
    expect(accum).toEqual([
      { value: 'bar', key: 'foo', kdx: 'foo', done: false },
      { value: 'bop', key: 'bim', kdx: 'bim', done: false },
      { done: true }
    ])
  })

  test('throws for non object values', () => {
    const errorRegex = /^objectIterator expected object to be an Object/
    expect(() => objectIterator(undefined)).toThrow(errorRegex)
    expect(() => objectIterator(null)).toThrow(errorRegex)
    expect(() => objectIterator(false)).toThrow(errorRegex)
    expect(() => objectIterator(true)).toThrow(errorRegex)
    expect(() => objectIterator(0)).toThrow(errorRegex)
    expect(() => objectIterator(-1)).toThrow(errorRegex)
    expect(() => objectIterator(1)).toThrow(errorRegex)
    expect(() => objectIterator(NaN)).toThrow(errorRegex)
    expect(() => objectIterator(Infinity)).toThrow(errorRegex)
    expect(() => objectIterator(-Infinity)).toThrow(errorRegex)
    expect(() => objectIterator('')).toThrow(errorRegex)
    expect(() => objectIterator('abc')).toThrow(errorRegex)
    expect(() => objectIterator(Symbol('abc'))).toThrow(errorRegex)
  })
})
