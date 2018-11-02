import { SYMBOL_ITERATOR } from '../constants'
import iteratorResolver from './iteratorResolver'

const testAsyncArrayIterator = (values) => {
  let idx = -1
  const iterator = {
    next: async () =>
      new Promise((resolve) => {
        idx += 1
        setTimeout(() => {
          if (idx >= values.length) {
            return resolve({
              done: true
            })
          }
          return resolve({
            value: values[idx],
            done: false
          })
        }, 0)
      })
  }
  return iterator
}

describe('iteratorResolver', () => {
  test('creates an iterator for an array iterator', () => {
    const iter = [][SYMBOL_ITERATOR]()
    expect(iteratorResolver(iter)).toEqual({
      next: expect.any(Function),
      previous: expect.any(Function)
    })
  })

  test('creates an iterator for an object with a next method', () => {
    expect(iteratorResolver({ next: () => {} })).toEqual({
      next: expect.any(Function),
      previous: expect.any(Function)
    })
  })

  test('next() returns done for empty array iterator', () => {
    const iter = [][SYMBOL_ITERATOR]()
    const iterator = iteratorResolver(iter)
    expect(iterator.next()).toEqual({
      done: true,
      prev: undefined
    })
  })

  test('previous() returns done for empty array', () => {
    const iter = [][SYMBOL_ITERATOR]()
    const iterator = iteratorResolver(iter)
    expect(iterator.previous()).toEqual({
      done: true,
      prev: undefined
    })
  })

  test('next() returns done for empty async array iterator', async () => {
    const asyncIterator = testAsyncArrayIterator([])
    const iterator = iteratorResolver(asyncIterator)

    const result = iterator.next()
    expect(result).toBeInstanceOf(Promise)
    expect(await result).toEqual({
      prev: undefined,
      done: true
    })
  })

  test('previous() returns done for empty async array iterator without a Promise', async () => {
    const asyncIterator = testAsyncArrayIterator([])
    const iterator = iteratorResolver(asyncIterator)

    const result = iterator.previous()
    expect(result).toEqual({
      prev: undefined,
      done: true
    })
  })

  test('creates an iterator at the starting point of the array iterator by default', () => {
    const array = ['foo', 'bar']
    const iterator = iteratorResolver(array[SYMBOL_ITERATOR]())

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

  test('END starts the iterator at the last index', () => {
    const array = ['foo', 'bar']
    const iterator = iteratorResolver(array[SYMBOL_ITERATOR](), 'END')

    let next = { done: false }
    const accum = []
    while (!next.done) {
      next = iterator.previous()
      accum.push(next)
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

  test('START starts the iterator at the 0 index', () => {
    const array = ['foo', 'bar']
    const iterator = iteratorResolver(array[SYMBOL_ITERATOR](), 'START')

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

  test('iterates an async iterator until done is true', async () => {
    const asyncIterator = testAsyncArrayIterator(['a', 'b', 'c'])
    const iterator = iteratorResolver(asyncIterator)

    let result = iterator.next()
    expect(result).toBeInstanceOf(Promise)
    expect(await result).toEqual({
      value: 'a',
      kdx: 0,
      index: 0,
      prev: undefined,
      done: false
    })

    result = iterator.next()
    expect(result).toBeInstanceOf(Promise)

    expect(await result).toEqual({
      value: 'b',
      kdx: 1,
      index: 1,
      prev: {
        value: 'a',
        kdx: 0,
        index: 0,
        done: false
      },
      done: false
    })

    result = iterator.next()
    expect(result).toBeInstanceOf(Promise)
    expect(await result).toEqual({
      value: 'c',
      kdx: 2,
      index: 2,
      prev: {
        value: 'b',
        kdx: 1,
        index: 1,
        done: false
      },
      done: false
    })

    result = iterator.next()
    expect(result).toBeInstanceOf(Promise)
    expect(await result).toEqual({
      prev: {
        value: 'c',
        kdx: 2,
        index: 2,
        done: false
      },
      done: true
    })
  })

  test('iterates an async iterator in reverse until done is true', async () => {
    const asyncIterator = testAsyncArrayIterator(['a', 'b', 'c'])
    const iterator = iteratorResolver(asyncIterator, 'END')

    let result = iterator.previous()
    expect(result).toBeInstanceOf(Promise)
    expect(await result).toEqual({
      value: 'c',
      kdx: 2,
      index: 2,
      prev: undefined,
      done: false
    })

    result = iterator.previous()
    expect(result).toEqual({
      value: 'b',
      kdx: 1,
      index: 1,
      prev: {
        value: 'c',
        kdx: 2,
        index: 2,
        done: false
      },
      done: false
    })

    result = iterator.previous()
    expect(result).toEqual({
      value: 'a',
      kdx: 0,
      index: 0,
      prev: {
        value: 'b',
        kdx: 1,
        index: 1,
        done: false
      },
      done: false
    })

    result = iterator.previous()
    expect(result).toEqual({
      prev: {
        value: 'a',
        kdx: 0,
        index: 0,
        done: false
      },
      done: true
    })
  })

  test('throws for non Iterator values', () => {
    const errorRegex = /^iteratorResolver expected iterator to be an Iterator value/
    expect(() => iteratorResolver(undefined)).toThrow(errorRegex)
    expect(() => iteratorResolver(null)).toThrow(errorRegex)
    expect(() => iteratorResolver(false)).toThrow(errorRegex)
    expect(() => iteratorResolver(true)).toThrow(errorRegex)
    expect(() => iteratorResolver(0)).toThrow(errorRegex)
    expect(() => iteratorResolver(-1)).toThrow(errorRegex)
    expect(() => iteratorResolver(1)).toThrow(errorRegex)
    expect(() => iteratorResolver(NaN)).toThrow(errorRegex)
    expect(() => iteratorResolver(Infinity)).toThrow(errorRegex)
    expect(() => iteratorResolver(-Infinity)).toThrow(errorRegex)
    expect(() => iteratorResolver({})).toThrow(errorRegex)
    expect(() => iteratorResolver(/abc/)).toThrow(errorRegex)
    expect(() => iteratorResolver(async () => {})).toThrow(errorRegex)
    expect(() => iteratorResolver(() => {})).toThrow(errorRegex)
    expect(() => iteratorResolver(function() {})).toThrow(errorRegex)
    // expect(() => iteratorResolver((function*() {})())).toThrow(errorRegex)
    expect(() => iteratorResolver(new ArrayBuffer(2))).toThrow(errorRegex)
    expect(() => iteratorResolver(new Boolean(false))).toThrow(errorRegex)
    expect(() => iteratorResolver(new Boolean(true))).toThrow(errorRegex)
    expect(() => iteratorResolver(new Date())).toThrow(errorRegex)
    expect(() => iteratorResolver(new Error())).toThrow(errorRegex)
    expect(() => iteratorResolver(new Number(1))).toThrow(errorRegex)
    expect(() => iteratorResolver(new Promise(() => {}))).toThrow(errorRegex)
    expect(() => iteratorResolver(new Proxy({}, {}))).toThrow(errorRegex)
    expect(() => iteratorResolver(new Set())).toThrow(errorRegex)
    expect(() => iteratorResolver(Symbol('abc'))).toThrow(errorRegex)
    expect(() => iteratorResolver(new WeakMap())).toThrow(errorRegex)
    expect(() => iteratorResolver(new WeakSet())).toThrow(errorRegex)
  })
})
