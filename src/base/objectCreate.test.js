import objectCreate from './objectCreate'

describe('objectCreate', () => {
  test('creates an object using the given object as its prototype', () => {
    const proto = {
      foo() {},
      bar: 'baz'
    }
    const object = objectCreate(proto)
    expect(Object.getPrototypeOf(object)).toBe(proto)
  })
})
