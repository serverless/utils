import assoc from './assoc'

describe('assoc', () => {
  test('assoc to an object using a single existing key', () => {
    const collection = {
      foo: 'bar'
    }
    expect(assoc('foo', 'baz', collection)).toEqual({
      foo: 'baz'
    })
    expect(assoc(['foo'], 'baz', collection)).toEqual({
      foo: 'baz'
    })
  })

  test('assoc to an object using a single existing key with dots', () => {
    const collection = {
      'foo.bar': 'baz'
    }
    expect(assoc('foo.bar', 'fum', collection)).toEqual({
      'foo.bar': 'fum'
    })
  })

  test('assoc to an array using a single existing index', () => {
    const collection = ['bar']
    expect(assoc(0, 'baz', collection)).toEqual(['baz'])
    expect(assoc([0], 'baz', collection)).toEqual(['baz'])
  })

  test('assoc to a Map using a single existing key', () => {
    const collection = new Map([['foo', 'bar']])
    expect([...assoc('foo', 'baz', collection).entries()]).toEqual([['foo', 'baz']])
    expect([...assoc(['foo'], 'baz', collection).entries()]).toEqual([['foo', 'baz']])
  })

  test('assoc to an object using a single non existing key', () => {
    const collection = {
      foo: 'bar'
    }
    expect(assoc('bim', 'bop', collection)).toEqual({
      foo: 'bar',
      bim: 'bop'
    })
    expect(assoc(['bim'], 'bop', collection)).toEqual({
      foo: 'bar',
      bim: 'bop'
    })
  })

  test('assoc to an array using a single non existing index', () => {
    const collection = ['bar']
    expect(assoc(1, 'bop', collection)).toEqual(['bar', 'bop'])
    expect(assoc([1], 'bop', collection)).toEqual(['bar', 'bop'])
  })

  test('assoc to a Map using a single non existing key', () => {
    const collection = new Map([['foo', 'bar']])
    expect([...assoc('bim', 'bop', collection).entries()]).toEqual([['foo', 'bar'], ['bim', 'bop']])
    expect([...assoc(['bim'], 'bop', collection).entries()]).toEqual([
      ['foo', 'bar'],
      ['bim', 'bop']
    ])
  })

  test('dispatches to the assoc method of collection', () => {
    const collection = {
      assoc: (key, value) => {
        return {
          foo: 'bar',
          [key]: value
        }
      }
    }

    expect(assoc('bim', 'bop', collection)).toEqual({
      foo: 'bar',
      bim: 'bop'
    })
  })

  test('automatically upgrades to async when the collection is a Promise', async () => {
    const collection = Promise.resolve({
      foo: 'bar'
    })
    const result = assoc('foo', 'baz', collection)
    expect(result).toBeInstanceOf(Promise)
    expect(await result).toEqual({
      foo: 'baz'
    })
  })

  test('automatically upgrades to async when the key is a Promise', async () => {
    const key = Promise.resolve('foo')
    const result = assoc(key, 'baz', {
      foo: 'bar'
    })
    expect(result).toBeInstanceOf(Promise)
    expect(await result).toEqual({
      foo: 'baz'
    })
  })

  test('does NOT automatically upgrade to async when the value is a Promise', () => {
    const value = Promise.resolve('baz')
    const result = assoc('foo', value, {
      foo: 'bar'
    })
    expect(result).toEqual({
      foo: Promise.resolve('baz')
    })
  })

  test('automatically upgrades to async if the collection parameter is a Promise and then dispatches to its assoc method', async () => {
    const collection = Promise.resolve({
      assoc: (key, value) => {
        return {
          foo: 'bar',
          [key]: value
        }
      }
    })

    const result = assoc('bim', 'bop', collection)
    expect(result).toBeInstanceOf(Promise)
    expect(await result).toEqual({
      foo: 'bar',
      bim: 'bop'
    })
  })
})
