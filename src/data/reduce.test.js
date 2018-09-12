import reduce from './reduce'

describe('reduce', () => {
  test('reduces left to right', () => {
    const values = ['foo', 'bar', 'baz']
    const result = reduce((acc, value) => acc + value, '', values)
    expect(result).toEqual('foobarbaz')
  })

  test('calls reducer with index', () => {
    const values = ['foo', 'bar', 'baz']
    const reducer = jest.fn((identity) => identity)
    const result = reduce(reducer, '', values)
    expect(reducer).toHaveBeenNthCalledWith(1, '', 'foo', 0)
    expect(reducer).toHaveBeenNthCalledWith(2, '', 'bar', 1)
    expect(reducer).toHaveBeenNthCalledWith(3, '', 'baz', 2)
    expect(result).toBe('')
  })
})
