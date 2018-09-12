import defn from './defn'

describe('defn', () => {
  test('calls default function when no args', () => {
    const test = defn('test', (arg1) => {
      expect(arg1).toBe(undefined)
      return 'baz'
    })

    const result = test()
    expect(result).toBe('baz')
  })

  test('calls default function in case of no implementation', () => {
    const obj = {}
    const test = defn('test', (arg1, arg2, arg3) => {
      expect(arg1).toBe('foo')
      expect(arg2).toBe('bar')
      expect(arg3).toBe(obj)
      return 'baz'
    })

    const result = test('foo', 'bar', obj)
    expect(result).toBe('baz')
  })

  test('calls embedded function in object when present', () => {
    const obj = {
      test(arg1, arg2, arg3) {
        expect(arg1).toBe('foo')
        expect(arg2).toBe('bar')
        expect(arg3).toBe(obj)
        expect(this).toBe(obj)
        return 'baz'
      }
    }
    const test = defn('test', (arg1, arg2, arg3) => 'wrong')

    const result = test('foo', 'bar', obj)
    expect(result).toBe('baz')
  })

  test('is arity of default function', () => {
    const test = defn('test', (arg1, arg2, arg3) => {})
    expect(test.length).toBe(3)
  })

  test('does not exceed stack limit when embedded function is defined function', () => {
    const test = defn('test', () => 'baz')
    const obj = {
      test
    }

    const result = test('foo', 'bar', obj)
    expect(result).toBe('baz')
  })

  test('does not exceed stack limit when embedded function is intercepted', () => {
    const test = defn('test', () => 'baz')
    const obj = {
      test: function() {
        return test.call(this)
      }
    }

    const result = test('foo', 'bar', obj)
    expect(result).toBe('baz')
  })
})
