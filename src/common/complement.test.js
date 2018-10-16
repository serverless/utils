import complement from './complement'

describe('complement', () => {
  test('complements a given function', () => {
    const isEven = (value) => value % 2 === 0
    const isOdd = complement(isEven)
    expect(isOdd(1)).toBe(true)
  })

  test('throws an error if complement does not receive a function', () => {
    expect(() => {
      complement(null)
    }).toThrow(/^Expected 'fn' parameter to be a function/)
  })

  test('inverts the resolved value of a promise', async () => {
    const isEven = async (value) => value % 2 === 0
    const isOdd = complement(isEven)
    expect(await isOdd(1)).toBe(true)
  })
})
