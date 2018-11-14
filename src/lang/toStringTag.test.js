describe('toStringTag', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  test('converts undefined to the undefined tag', () => {
    const toStringTag = require('./toStringTag').default
    expect(toStringTag(undefined)).toBe('[object Undefined]')
  })

  test('converts undefined to the undefined tag when baseGetTag returns Object tag', () => {
    jest.mock('./baseGetTag', () => (value) => {
      const baseGetTag = require.requireActual('./baseGetTag').default
      if (value instanceof DataView) {
        return '[object Object]'
      }
      return baseGetTag(value)
    })
    const toStringTag = require('./toStringTag').default
    expect(toStringTag(undefined)).toBe('[object Undefined]')
  })

  test('converts DataView instance to the DataView tag when baseGetTag returns Object tag', () => {
    jest.mock('./baseGetTag', () => (value) => {
      const baseGetTag = require.requireActual('./baseGetTag').default
      if (value instanceof DataView) {
        return '[object Object]'
      }
      return baseGetTag(value)
    })
    const toStringTag = require('./toStringTag').default
    expect(toStringTag(new DataView(new ArrayBuffer(1)))).toBe('[object DataView]')
  })

  test('converts Map instance to the Map tag when baseGetTag returns Object tag', () => {
    jest.mock('./baseGetTag', () => (value) => {
      const baseGetTag = require.requireActual('./baseGetTag').default
      if (value instanceof Map) {
        return '[object Object]'
      }
      return baseGetTag(value)
    })
    const toStringTag = require('./toStringTag').default
    expect(toStringTag(new Map())).toBe('[object Map]')
  })

  test('converts Promise instance to the Promise tag when baseGetTag returns Object tag', () => {
    jest.mock('./baseGetTag', () => (value) => {
      const baseGetTag = require.requireActual('./baseGetTag').default
      if (value instanceof Promise) {
        return '[object Object]'
      }
      return baseGetTag(value)
    })
    const toStringTag = require('./toStringTag').default
    expect(toStringTag(new Promise(() => {}))).toBe('[object Promise]')
  })

  test('converts Set instance to the Set tag when baseGetTag returns Object tag', () => {
    jest.mock('./baseGetTag', () => (value) => {
      const baseGetTag = require.requireActual('./baseGetTag').default
      if (value instanceof Set) {
        return '[object Object]'
      }
      return baseGetTag(value)
    })
    const toStringTag = require('./toStringTag').default
    expect(toStringTag(new Set())).toBe('[object Set]')
  })

  test('converts WeakMap instance to the WeakMap tag when baseGetTag returns Object tag', () => {
    jest.mock('./baseGetTag', () => (value) => {
      const baseGetTag = require.requireActual('./baseGetTag').default
      if (value instanceof WeakMap) {
        return '[object Object]'
      }
      return baseGetTag(value)
    })
    const toStringTag = require('./toStringTag').default
    expect(toStringTag(new WeakMap())).toBe('[object WeakMap]')
  })
})
