import toObject from './toObject'

describe('toObject', () => {
  test('hands off to the toObject method if present', () => {
    const object = {
      toObject: () => ({
        foo: 'bar'
      })
    }
    expect(toObject(object)).toEqual({ foo: 'bar' })
  })

  test('flattens prototype properties', () => {
    function Foo() {
      this.b = 2
    }
    Foo.prototype.c = 3
    expect(toObject(new Foo())).toEqual({ b: 2, c: 3 })
  })
})
