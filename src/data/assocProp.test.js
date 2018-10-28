import assocProp from './assocProp'

describe('assocProp', () => {
  test('set a prop to an empty object', () => {
    const object = {}
    const result = assocProp('foo', 'bar', object)
    // NOTE BRN: We check for this because it's possible on iteration of an empty object to accidentally set an undefined key and value
    expect(result.hasOwnProperty(undefined)).toBe(false)
    expect(result).toEqual({
      foo: 'bar'
    })
  })

  test('preserves keys and symbols on the new object', () => {
    const symFoo = Symbol('foo')
    const object = {
      [symFoo]: 'fooVal',
      bar: 'barVal'
    }
    expect(assocProp('baz', 'bazVal', object)).toEqual({
      [symFoo]: 'fooVal',
      bar: 'barVal',
      baz: 'bazVal'
    })
  })

  test('dispatches to the assocProp method of object', () => {
    const object = {
      assocProp: (key, value) => {
        return {
          foo: 'bar',
          [key]: value
        }
      }
    }

    expect(assocProp('bim', 'bop', object)).toEqual({
      foo: 'bar',
      bim: 'bop'
    })
  })

  test('automatically upgrades to async when the object is a Promise', async () => {
    const object = Promise.resolve({
      foo: 'bar'
    })
    const result = assocProp('foo', 'baz', object)
    expect(result).toBeInstanceOf(Promise)
    expect(await result).toEqual({
      foo: 'baz'
    })
  })

  test('automatically upgrades to async when the key is a Promise', async () => {
    const key = Promise.resolve('foo')
    const result = assocProp(key, 'baz', {
      foo: 'bar'
    })
    expect(result).toBeInstanceOf(Promise)
    expect(await result).toEqual({
      foo: 'baz'
    })
  })

  test('does NOT automatically upgrade to async when the value is a Promise', () => {
    const value = Promise.resolve('baz')
    const result = assocProp('foo', value, {
      foo: 'bar'
    })
    expect(result).toEqual({
      foo: Promise.resolve('baz')
    })
  })

  test('automatically upgrades to async if the object parameter is a Promise and then dispatches to its assocProp method', async () => {
    const object = Promise.resolve({
      assocProp: (key, value) => {
        return {
          foo: 'bar',
          [key]: value
        }
      }
    })

    const result = assocProp('bim', 'bop', object)
    expect(result).toBeInstanceOf(Promise)
    expect(await result).toEqual({
      foo: 'bar',
      bim: 'bop'
    })
  })
})
