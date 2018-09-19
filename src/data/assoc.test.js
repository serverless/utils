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
})
