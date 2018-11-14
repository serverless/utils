import arrayLikeIterator from './arrayLikeIterator'

describe('arrayLikeIterator', () => {
  test('creates an iterator for an array', () => {
    expect(arrayLikeIterator([])).toEqual({
      next: expect.any(Function),
      previous: expect.any(Function)
    })
  })

  test('creates an iterator for a string', () => {
    expect(arrayLikeIterator('abc')).toEqual({
      next: expect.any(Function),
      previous: expect.any(Function)
    })
  })

  test('creates an iterator for an object with length', () => {
    expect(arrayLikeIterator({ length: 0 })).toEqual({
      next: expect.any(Function),
      previous: expect.any(Function)
    })
  })

  test('next() returns done for empty array', () => {
    const iterator = arrayLikeIterator([])
    expect(iterator.next()).toEqual({
      done: true,
      prev: undefined
    })
  })

  test('previous() returns done for empty array', () => {
    const iterator = arrayLikeIterator([])
    expect(iterator.previous()).toEqual({
      done: true,
      prev: undefined
    })
  })

  test('creates an iterator at the starting point of the array', () => {
    const iterator = arrayLikeIterator(['foo', 'bar'])
    let next = { done: false }
    const accum = []
    while (!next.done) {
      next = iterator.next()
      accum.push(next)
    }
    expect(accum).toEqual([
      {
        value: 'foo',
        index: 0,
        kdx: 0,
        prev: undefined,
        done: false
      },
      {
        value: 'bar',
        index: 1,
        kdx: 1,
        prev: {
          value: 'foo',
          index: 0,
          kdx: 0,
          done: false
        },
        done: false
      },
      {
        done: true,
        prev: {
          value: 'bar',
          index: 1,
          kdx: 1,
          done: false
        }
      }
    ])
  })

  test('starts at the given index', () => {
    const iterator = arrayLikeIterator(['foo', 'bar'], 1)
    let next = { done: false }
    const accum = []
    while (!next.done) {
      next = iterator.next()
      accum.push(next)
    }
    expect(accum).toEqual([
      {
        value: 'bar',
        index: 1,
        kdx: 1,
        prev: {
          value: 'foo',
          index: 0,
          kdx: 0,
          done: false
        },
        done: false
      },
      {
        prev: {
          value: 'bar',
          index: 1,
          kdx: 1,
          done: false
        },
        done: true
      }
    ])
  })

  test('If index is greater than length by 1 than iterator should perform no iterations and return the final value in prev', () => {
    const iterator = arrayLikeIterator(['foo', 'bar'], 3)
    let next = { done: false }
    const accum = []
    while (!next.done) {
      next = iterator.next()
      accum.push(next)
    }
    expect(accum).toEqual([
      {
        prev: { done: false, index: 1, kdx: 1, value: 'bar' },
        done: true
      }
    ])
  })

  test('If index is greater than length by more than 1 than iterator should perform no iterations and return the final value in prev', () => {
    const iterator = arrayLikeIterator(['foo', 'bar'], 4)
    let next = { done: false }
    const accum = []
    while (!next.done) {
      next = iterator.next()
      accum.push(next)
    }
    expect(accum).toEqual([
      {
        prev: { done: false, index: 1, kdx: 1, value: 'bar' },
        done: true
      }
    ])
  })

  test('If index is negative than should start from length + index', () => {
    const iterator = arrayLikeIterator(['foo', 'bar'], -1)
    let next = { done: false }
    const accum = []
    while (!next.done) {
      next = iterator.next()
      accum.push(next)
    }
    expect(accum).toEqual([
      {
        value: 'bar',
        index: 1,
        kdx: 1,
        prev: {
          value: 'foo',
          index: 0,
          kdx: 0,
          done: false
        },
        done: false
      },
      {
        prev: {
          value: 'bar',
          index: 1,
          kdx: 1,
          done: false
        },
        done: true
      }
    ])
  })

  test('START starts the iterator at the 0 index', () => {
    const iterator = arrayLikeIterator(['foo', 'bar'], 'START')
    let next = { done: false }
    const accum = []
    while (!next.done) {
      next = iterator.next()
      accum.push(next)
    }
    expect(accum).toEqual([
      {
        value: 'foo',
        index: 0,
        kdx: 0,
        prev: undefined,
        done: false
      },
      {
        value: 'bar',
        index: 1,
        kdx: 1,
        prev: {
          value: 'foo',
          index: 0,
          kdx: 0,
          done: false
        },
        done: false
      },
      {
        prev: {
          value: 'bar',
          index: 1,
          kdx: 1,
          done: false
        },
        done: true
      }
    ])
  })

  test('calling next and then previous results in iterating the same value twice', () => {
    const iterator = arrayLikeIterator(['foo', 'bar'])
    expect(iterator.next()).toEqual({
      value: 'foo',
      index: 0,
      kdx: 0,
      prev: undefined,
      done: false
    })
    expect(iterator.previous()).toEqual({
      value: 'foo',
      index: 0,
      kdx: 0,
      prev: {
        value: 'bar',
        index: 1,
        kdx: 1,
        done: false
      },
      done: false
    })
  })

  test('END starts the iterator at the last index', () => {
    const iterator = arrayLikeIterator(['foo', 'bar'], 'END')
    let previous = { done: false }
    const accum = []
    while (!previous.done) {
      previous = iterator.previous()
      accum.push(previous)
    }
    expect(accum).toEqual([
      {
        value: 'bar',
        index: 1,
        kdx: 1,
        prev: undefined,
        done: false
      },
      {
        value: 'foo',
        index: 0,
        kdx: 0,
        prev: {
          value: 'bar',
          index: 1,
          kdx: 1,
          done: false
        },
        done: false
      },
      {
        prev: {
          value: 'foo',
          index: 0,
          kdx: 0,
          done: false
        },
        done: true
      }
    ])
  })

  test('calling next multiple times when the iterator is at the end returns the same done result', () => {
    const iterator = arrayLikeIterator(['foo', 'bar'], 'END')
    expect(iterator.next()).toEqual({
      prev: {
        value: 'bar',
        index: 1,
        kdx: 1,
        done: false
      },
      done: true
    })
    expect(iterator.next()).toEqual({
      prev: {
        value: 'bar',
        index: 1,
        kdx: 1,
        done: false
      },
      done: true
    })
  })

  test('throws for non array like values', () => {
    const errorRegex = /^arrayLikeIterator expected arrayLike to be an ArrayLike value/
    expect(() => arrayLikeIterator(undefined)).toThrow(errorRegex)
    expect(() => arrayLikeIterator(null)).toThrow(errorRegex)
    expect(() => arrayLikeIterator(false)).toThrow(errorRegex)
    expect(() => arrayLikeIterator(true)).toThrow(errorRegex)
    expect(() => arrayLikeIterator(0)).toThrow(errorRegex)
    expect(() => arrayLikeIterator(-1)).toThrow(errorRegex)
    expect(() => arrayLikeIterator(1)).toThrow(errorRegex)
    expect(() => arrayLikeIterator(NaN)).toThrow(errorRegex)
    expect(() => arrayLikeIterator(Infinity)).toThrow(errorRegex)
    expect(() => arrayLikeIterator(-Infinity)).toThrow(errorRegex)
    expect(() => arrayLikeIterator({})).toThrow(errorRegex)
    expect(() => arrayLikeIterator(/abc/)).toThrow(errorRegex)
    expect(() => arrayLikeIterator(async () => {})).toThrow(errorRegex)
    expect(() => arrayLikeIterator(() => {})).toThrow(errorRegex)
    expect(() => arrayLikeIterator(function() {})).toThrow(errorRegex)
    expect(() => arrayLikeIterator((function*() {})())).toThrow(errorRegex)
    expect(() => arrayLikeIterator(new ArrayBuffer(2))).toThrow(errorRegex)
    expect(() => arrayLikeIterator(new Boolean(false))).toThrow(errorRegex)
    expect(() => arrayLikeIterator(new Boolean(true))).toThrow(errorRegex)
    expect(() => arrayLikeIterator(new Date())).toThrow(errorRegex)
    expect(() => arrayLikeIterator(new Error())).toThrow(errorRegex)
    expect(() => arrayLikeIterator(new Number(1))).toThrow(errorRegex)
    expect(() => arrayLikeIterator(new Promise(() => {}))).toThrow(errorRegex)
    expect(() => arrayLikeIterator(new Proxy({}, {}))).toThrow(errorRegex)
    expect(() => arrayLikeIterator(new Set())).toThrow(errorRegex)
    expect(() => arrayLikeIterator(Symbol('abc'))).toThrow(errorRegex)
    expect(() => arrayLikeIterator(new WeakMap())).toThrow(errorRegex)
    expect(() => arrayLikeIterator(new WeakSet())).toThrow(errorRegex)
  })
})
