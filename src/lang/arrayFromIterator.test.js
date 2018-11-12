import arrayFromIterator from './arrayFromIterator'

describe('arrayFromIterator', () => {
  test('create array from iterator', () => {
    const iterator = ['a', 'b'][Symbol.iterator]()
    expect(arrayFromIterator(iterator)).toEqual(['a', 'b'])
  })
})
