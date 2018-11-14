import objectGetOwnPropertyDescriptor from './objectGetOwnPropertyDescriptor'

describe('objectGetOwnPropertyDescriptor', () => {
  test('get the property descriptor from an object property', () => {
    const object = { foo: 'bar' }
    expect(objectGetOwnPropertyDescriptor(object, 'foo')).toEqual({
      configurable: true,
      enumerable: true,
      value: 'bar',
      writable: true
    })
  })
})
