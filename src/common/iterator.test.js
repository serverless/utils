import { SYMBOL_ITERATOR } from '../constants'
import iterator from './iterator'

describe('iterator', () => {
  test('throws error for non objects', () => {
    const valuesToTest = [null, undefined, false, true, 0, -1, 1, NaN, Infinity, -Infinity]
    valuesToTest.forEach((value) => {
      expect(() => {
        iterator(value)
      }).toThrowError(/^iterator method/)
    })
  })

  test('returns iterator for string that iterates through the characters', () => {
    const iter = iterator('abc')
    expect(iter.next()).toEqual({
      value: 'a',
      index: 0,
      kdx: 0,
      prev: undefined,
      done: false
    })
    expect(iter.next()).toEqual({
      value: 'b',
      index: 1,
      kdx: 1,
      prev: {
        value: 'a',
        index: 0,
        kdx: 0,
        done: false
      },
      done: false
    })
    expect(iter.next()).toEqual({
      value: 'c',
      index: 2,
      kdx: 2,
      prev: {
        value: 'b',
        index: 1,
        kdx: 1,
        done: false
      },
      done: false
    })
    expect(iter.next()).toEqual({
      value: undefined,
      prev: {
        value: 'c',
        index: 2,
        kdx: 2,
        done: false
      },
      done: true
    })
  })

  test('returns iterator for array that iterates through the values', () => {
    const iter = iterator(['abc', 'foo', 'bar'])
    expect(iter.next()).toEqual({
      value: 'abc',
      index: 0,
      kdx: 0,
      prev: undefined,
      done: false
    })
    expect(iter.next()).toEqual({
      value: 'foo',
      index: 1,
      kdx: 1,
      prev: {
        value: 'abc',
        index: 0,
        kdx: 0,
        done: false
      },
      done: false
    })
    expect(iter.next()).toEqual({
      value: 'bar',
      index: 2,
      kdx: 2,
      prev: {
        value: 'foo',
        index: 1,
        kdx: 1,
        done: false
      },
      done: false
    })
    expect(iter.next()).toEqual({
      value: undefined,
      prev: {
        value: 'bar',
        index: 2,
        kdx: 2,
        done: false
      },
      done: true
    })
  })

  test('returns iterator for object that iterates through the values and keys', () => {
    const iter = iterator({
      abc: 'def',
      foo: 'bar',
      bim: 'bop'
    })
    expect(iter.next()).toEqual({
      value: 'def',
      kdx: 'abc',
      key: 'abc',
      prev: undefined,
      done: false
    })
    expect(iter.next()).toEqual({
      value: 'bar',
      kdx: 'foo',
      key: 'foo',
      prev: {
        value: 'def',
        kdx: 'abc',
        key: 'abc',
        done: false
      },
      done: false
    })
    expect(iter.next()).toEqual({
      value: 'bop',
      kdx: 'bim',
      key: 'bim',
      prev: {
        value: 'bar',
        kdx: 'foo',
        key: 'foo',
        done: false
      },
      done: false
    })
    expect(iter.next()).toEqual({
      value: undefined,
      prev: {
        value: 'bop',
        kdx: 'bim',
        key: 'bim',
        done: false
      },
      done: true
    })
  })

  test('returns iterator from iterable value by calling iterator symbol', () => {
    const iter = {
      next: () => {}
    }
    const iterable = {
      [SYMBOL_ITERATOR]: () => iter
    }
    const result = iterator(iterable)
    expect(result).toEqual({
      next: expect.any(Function),
      previous: expect.any(Function)
    })
  })

  test('returns an iterator Iterator if the value is already an Iterator', () => {
    const iter = {
      next: () => {}
    }
    const result = iterator(iter)
    expect(result).toEqual({
      next: expect.any(Function),
      previous: expect.any(Function)
    })
  })
})
