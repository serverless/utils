import reduceObjIndexed from './reduceObjIndexed'

describe('reduceObjIndexed', () => {
  test('reduces left to right', () => {
    const object = {
      foo: 'bar',
      baz: 'bam',
      bim: 'bop'
    }
    const result = reduceObjIndexed((acc, value, key) => acc + value + key, '', object)
    expect(result).toEqual('barfoobambazbopbim')
  })

  test('calls reducer with key', () => {
    const object = {
      foo: 'bar',
      baz: 'bam',
      bim: 'bop'
    }
    const reducer = jest.fn((acc) => acc)
    const result = reduceObjIndexed(reducer, '', object)
    expect(reducer).toHaveBeenNthCalledWith(1, '', 'bar', 'foo')
    expect(reducer).toHaveBeenNthCalledWith(2, '', 'bam', 'baz')
    expect(reducer).toHaveBeenNthCalledWith(3, '', 'bop', 'bim')
    expect(result).toBe('')
  })
})
