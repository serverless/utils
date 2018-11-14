import assignPropertyDescriptors from './assignPropertyDescriptors'

describe('assignPropertyDescriptors', () => {
  test('assign property descriptors to an object', () => {
    const object1 = {}
    Object.defineProperty(object1, 'foo', {
      value: 'bar',
      configurable: true,
      enumerable: true
    })
    const object2 = {}
    assignPropertyDescriptors(object2, object1)
    expect(Object.getOwnPropertyDescriptor(object2, 'foo')).toEqual({
      value: 'bar',
      configurable: true,
      enumerable: true,
      writable: false
    })
  })
})
