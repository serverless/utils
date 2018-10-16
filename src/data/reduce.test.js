import reduce from './reduce'

describe('reduce', () => {
  test('reduces array left to right', () => {
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

  test('reduces object left to right', () => {
    const object = {
      foo: 'bar',
      baz: 'bam',
      bim: 'bop'
    }
    const result = reduce((acc, value, key) => acc + value + key, '', object)
    expect(result).toEqual('barfoobambazbopbim')
  })

  test('calls reducer with key', () => {
    const object = {
      foo: 'bar',
      baz: 'bam',
      bim: 'bop'
    }
    const reducer = jest.fn((acc) => acc)
    const result = reduce(reducer, '', object)
    expect(reducer).toHaveBeenNthCalledWith(1, '', 'bar', 'foo')
    expect(reducer).toHaveBeenNthCalledWith(2, '', 'bam', 'baz')
    expect(reducer).toHaveBeenNthCalledWith(3, '', 'bop', 'bim')
    expect(result).toBe('')
  })

  test('reduce object of functions', () => {
    const object = {
      async foo() {
        return 'foo'
      },
      async bam() {
        return 'bam'
      },
      async bim() {
        return 'bop'
      }
    }
    const reducer = (acc, method, name) => {
      acc.prototype[name] = method
      return acc
    }
    const result = reduce(reducer, class {}, object)
    expect(result.prototype).toEqual({
      foo: expect.any(Function),
      bam: expect.any(Function),
      bim: expect.any(Function)
    })
  })
})
