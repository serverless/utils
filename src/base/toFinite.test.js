import toFinite from './toFinite'

describe('toFinite', () => {
  test('converts finite number to itself', () => {
    expect(toFinite(3.2)).toBe(3.2)
  })

  test('converts MIN_VALUE to 5e-324', () => {
    expect(toFinite(Number.MIN_VALUE)).toBe(5e-324)
  })

  test('converts Infinity to 1.7976931348623157e+308', () => {
    expect(toFinite(Infinity)).toBe(1.7976931348623157e308)
  })

  test('converts string to finite number', () => {
    expect(toFinite('3.2')).toBe(3.2)
  })

  test('upgrades to a Promise when a Promise is received as a parameter', async () => {
    expect(await toFinite(Promise.resolve(3.2))).toBe(3.2)
  })
})
