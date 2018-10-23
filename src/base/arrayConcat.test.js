import arrayConcat from './arrayConcat'

describe('arrayConcat', () => {
  test('concats one array with another', () => {
    expect(arrayConcat(['foo'], ['bar'])).toEqual(['foo', 'bar'])
  })
})
