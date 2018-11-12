import toNumber from './toNumber'

describe('toNumber', () => {
  test('converts number to itself', () => {
    expect(toNumber(3.2)).toBe(3.2)
  })

  test('converts MIN_VALUE to 5e-324', () => {
    expect(toNumber(Number.MIN_VALUE)).toBe(5e-324)
  })

  test('converts Infinity to Infinity', () => {
    expect(toNumber(Infinity)).toBe(Infinity)
  })

  test('converts string to number', () => {
    expect(toNumber('3.2')).toBe(3.2)
  })

  test('upgrades to a Promise when a Promise is received as a parameter', async () => {
    expect(await toNumber(Promise.resolve(3.2))).toBe(3.2)
  })
})
