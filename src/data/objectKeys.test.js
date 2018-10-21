// import objectKeys from './objectKeys'

describe('objectKeys', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  test('returns an array of keys for an object', () => {
    jest.mock('../constants', () => ({
      HAS_ARGS_ENUM_BUG: false,
      HAS_OBJECT_ENUM_BUG: false
    }))
    const objectKeys = require('./objectKeys').default
    expect(
      objectKeys({
        foo: 'bar',
        bim: 'bop'
      })
    ).toEqual(['foo', 'bim'])
  })

  test('returns an array of keys for an object with args enum bug', () => {
    jest.mock('../constants', () => ({
      HAS_ARGS_ENUM_BUG: true,
      HAS_OBJECT_ENUM_BUG: false
    }))
    const objectKeys = require('./objectKeys').default
    expect(
      objectKeys({
        foo: 'bar',
        bim: 'bop'
      })
    ).toEqual(['foo', 'bim'])
  })

  test('returns an array of keys for an args array with args enum bug', () => {
    jest.mock('../constants', () => ({
      HAS_ARGS_ENUM_BUG: true,
      HAS_OBJECT_ENUM_BUG: false
    }))
    const objectKeys = require('./objectKeys').default
    const result = (function() {
      return objectKeys(arguments)
    })('foo', 'bar')
    expect(result).toEqual(['0', '1'])
  })

  test('returns an array of keys for an object with object enum bug', () => {
    jest.mock('../constants', () => ({
      HAS_ARGS_ENUM_BUG: true,
      HAS_OBJECT_ENUM_BUG: true
    }))
    const objectKeys = require('./objectKeys').default
    expect(
      objectKeys({
        foo: 'bar',
        bim: 'bop'
      })
    ).toEqual(['foo', 'bim'])
  })

  test('returns an array of keys for an object props that are part of the object enum bug', () => {
    jest.mock('../constants', () => ({
      HAS_ARGS_ENUM_BUG: true,
      HAS_OBJECT_ENUM_BUG: true
    }))
    const objectKeys = require('./objectKeys').default
    expect(
      objectKeys({
        toString: 'bar',
        propertyIsEnumerable: 'bop'
      })
    ).toEqual(['toString', 'propertyIsEnumerable'])
  })

  test('returns an empty array of keys for an empty object', () => {
    const objectKeys = require('./objectKeys').default
    expect(objectKeys({})).toEqual([])
  })
})
