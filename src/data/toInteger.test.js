import toInteger from './toInteger'

describe('toInteger', () => {
  test('converts number to integer', () => {
    expect(toInteger(3.2)).toBe(3)
  })

  test('converts MIN_VALUE to 0', () => {
    expect(toInteger(Number.MIN_VALUE)).toBe(0)
  })

  test('converts Infinity to 1.7976931348623157e+308', () => {
    expect(toInteger(Infinity)).toBe(1.7976931348623157e308)
  })

  test('converts string to integer', () => {
    expect(toInteger('3.2')).toBe(3)
  })

  test('upgrades to a Promise when a Promise is received as a parameter', async () => {
    expect(await toInteger(Promise.resolve(3.2))).toBe(3)
  })
})
