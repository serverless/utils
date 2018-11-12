import arrayForEach from './arrayForEach'

describe('arrayForEach', () => {
  test('for each over array', () => {
    const iteratee = jest.fn()
    const array = ['a', 'b']
    arrayForEach(array, iteratee)
    expect(iteratee).toHaveBeenNthCalledWith(1, 'a', 0, array)
    expect(iteratee).toHaveBeenNthCalledWith(2, 'b', 1, array)
  })
})
