import clonePropertyDescriptors from './clonePropertyDescriptors'

describe('clonePropertyDescriptors', () => {
  test('clone property descriptors from an object', () => {
    const object1 = {}
    Object.defineProperty(object1, 'foo', {
      value: 'bar',
      configurable: true,
      enumerable: true
    })
    const object2 = clonePropertyDescriptors(object1)
    expect(Object.getOwnPropertyDescriptor(object2, 'foo')).toEqual({
      value: 'bar',
      configurable: true,
      enumerable: true,
      writable: false
    })
    expect(object1).not.toBe(object2)
  })
})
