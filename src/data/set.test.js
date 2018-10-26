import set from './set'

describe('set', () => {
  test('set to an object using a single existing key', () => {
    const collection = {
      foo: 'bar'
    }
    expect(set('foo', 'baz', collection)).toEqual({
      foo: 'baz'
    })
    expect(set(['foo'], 'baz', collection)).toEqual({
      foo: 'baz'
    })
  })

  test('set to an object using a single existing key with dots', () => {
    const collection = {
      'foo.bar': 'baz'
    }
    expect(set('foo.bar', 'fum', collection)).toEqual({
      'foo.bar': 'fum'
    })
  })

  test('set to an array using a single existing index', () => {
    const collection = ['bar']
    expect(set(0, 'baz', collection)).toEqual(['baz'])
    expect(set([0], 'baz', collection)).toEqual(['baz'])
  })

  test('set to a Map using a single existing key', () => {
    const collection = new Map([['foo', 'bar']])
    expect([...set('foo', 'baz', collection).entries()]).toEqual([['foo', 'baz']])
    expect([...set(['foo'], 'baz', collection).entries()]).toEqual([['foo', 'baz']])
  })

  test('set to an object using a single non existing key', () => {
    const collection = {
      foo: 'bar'
    }
    expect(set('bim', 'bop', collection)).toEqual({
      foo: 'bar',
      bim: 'bop'
    })
    expect(set(['bim'], 'bop', collection)).toEqual({
      foo: 'bar',
      bim: 'bop'
    })
  })

  test('set to an array using a single non existing index', () => {
    const collection = ['bar']
    expect(set(1, 'bop', collection)).toEqual(['bar', 'bop'])
    expect(set([1], 'bop', collection)).toEqual(['bar', 'bop'])
  })

  test('set to a Map using a single non existing key', () => {
    const collection = new Map([['foo', 'bar']])
    expect([...set('bim', 'bop', collection).entries()]).toEqual([['foo', 'bar'], ['bim', 'bop']])
    expect([...set(['bim'], 'bop', collection).entries()]).toEqual([['foo', 'bar'], ['bim', 'bop']])
  })

  test('dispatches to the set method of collection', () => {
    const collection = {
      set: (key, value) => {
        return {
          foo: 'bar',
          [key]: value
        }
      }
    }

    expect(set('bim', 'bop', collection)).toEqual({
      foo: 'bar',
      bim: 'bop'
    })
  })

  test('automatically upgrades to async when the collection is a Promise', async () => {
    const collection = Promise.resolve({
      foo: 'bar'
    })
    const result = set('foo', 'baz', collection)
    expect(result).toBeInstanceOf(Promise)
    expect(await result).toEqual({
      foo: 'baz'
    })
  })

  test('automatically upgrades to async when the key is a Promise', async () => {
    const key = Promise.resolve('foo')
    const result = set(key, 'baz', {
      foo: 'bar'
    })
    expect(result).toBeInstanceOf(Promise)
    expect(await result).toEqual({
      foo: 'baz'
    })
  })

  test('does NOT automatically upgrade to async when the value is a Promise', () => {
    const value = Promise.resolve('baz')
    const result = set('foo', value, {
      foo: 'bar'
    })
    expect(result).toEqual({
      foo: Promise.resolve('baz')
    })
  })

  test('automatically upgrades to async if the collection parameter is a Promise and then dispatches to its set method', async () => {
    const collection = Promise.resolve({
      set: (key, value) => {
        return {
          foo: 'bar',
          [key]: value
        }
      }
    })

    const result = set('bim', 'bop', collection)
    expect(result).toBeInstanceOf(Promise)
    expect(await result).toEqual({
      foo: 'bar',
      bim: 'bop'
    })
  })
})
