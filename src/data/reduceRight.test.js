import reduceRight from './reduceRight'

describe('reduceRight', () => {
  test('reduces array right to left', () => {
    const values = ['foo', 'bar', 'baz']
    const result = reduceRight((acc, value) => acc + value, '', values)
    expect(result).toEqual('bazbarfoo')
  })

  test('calls reducer with index', () => {
    const values = ['foo', 'bar', 'baz']
    const reducer = jest.fn((identity) => identity)
    const result = reduceRight(reducer, '', values)
    expect(reducer).toHaveBeenNthCalledWith(1, '', 'baz', 2)
    expect(reducer).toHaveBeenNthCalledWith(2, '', 'bar', 1)
    expect(reducer).toHaveBeenNthCalledWith(3, '', 'foo', 0)
    expect(result).toBe('')
  })

  test('reduces object right to left', () => {
    const object = {
      foo: 'bar',
      baz: 'bam',
      bim: 'bop'
    }
    const result = reduceRight((acc, value, key) => acc + value + key, '', object)
    expect(result).toEqual('bopbimbambazbarfoo')
  })

  test('calls reducer with key', () => {
    const object = {
      foo: 'bar',
      baz: 'bam',
      bim: 'bop'
    }
    const reducer = jest.fn((acc) => acc)
    const result = reduceRight(reducer, '', object)
    expect(reducer).toHaveBeenNthCalledWith(1, '', 'bop', 'bim')
    expect(reducer).toHaveBeenNthCalledWith(2, '', 'bam', 'baz')
    expect(reducer).toHaveBeenNthCalledWith(3, '', 'bar', 'foo')
    expect(result).toBe('')
  })

  test('reduceRight object of functions', () => {
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
    const result = reduceRight(reducer, class {}, object)
    expect(result.prototype).toEqual({
      foo: expect.any(Function),
      bam: expect.any(Function),
      bim: expect.any(Function)
    })
  })
})
