import concat from './concat'

describe('concat', () => {
  test('concats string values', () => {
    expect(concat('ABC', 'DEF')).toBe('ABCDEF')
  })

  test('throws if one value is a string and the other is not', () => {
    expect(() => concat('ABC', {})).toThrow(/is not a string$/)
  })

  test('concats array values', () => {
    expect(concat([4, 5, 6], [1, 2, 3])).toEqual([4, 5, 6, 1, 2, 3])
  })

  test('throws if one value is an array and the other is not', () => {
    expect(() => concat([4, 5, 6], {})).toThrow(/is not an array/)
  })

  test('concats empty arrays into a single empty array', () => {
    expect(concat([], [])).toEqual([])
  })

  test('upgrades to a Promise when a Promise is received as a parameter', async () => {
    expect(await concat(Promise.resolve([4, 5, 6]), Promise.resolve([1, 2, 3]))).toEqual([
      4,
      5,
      6,
      1,
      2,
      3
    ])
  })
})
