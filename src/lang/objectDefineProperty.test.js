import objectDefineProperty from './objectDefineProperty'

describe('objectDefineProperty', () => {
  test('defines an property on an object', () => {
    const object = objectDefineProperty({}, 'foo', {
      configurable: true,
      enumerable: true,
      value: 'bar'
    })
    expect(object).toEqual({
      foo: 'bar'
    })
  })
})
