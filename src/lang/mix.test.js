import mix from './mix'

describe('mix', () => {
  test('supports object for declaring methods of a class', () => {
    class Obj {
      constructor(arg1, arg2) {
        expect(arg1).toBe('foo')
        expect(arg2).toBe('bar')
        this.arg1 = arg1
        this.arg2 = arg2
      }
    }
    const Class = mix(Obj).with({
      foo: function(bar) {
        expect(bar).toBe('baz')
        this.arg3 = bar
      }
    })
    const result = new Class('foo', 'bar')

    expect(result).toBeInstanceOf(Class)
    expect(result).toBeInstanceOf(Obj)
    expect(result.arg1).toBe('foo')
    expect(result.arg2).toBe('bar')
    result.foo('baz')
    expect(result.arg3).toBe('baz')
  })
})
