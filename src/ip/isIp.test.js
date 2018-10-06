import isIp from './isIp'

describe('isIp', () => {
  test('correctly identifies ipv4 address', () => {
    expect(isIp('255.255.255.0')).toBe(true)
    expect(isIp('255.255.255.0', 4)).toBe(true)
  })

  test('correctly identifies ipv6 address', () => {
    expect(isIp('2001:db8:abcd:0012:0000:0000:0000:0000')).toBe(true)
    expect(isIp('2001:db8:abcd:0012:0000:0000:0000:0000', 6)).toBe(true)
  })

  test('returns false for ipv4 when version is set to 6', () => {
    expect(isIp('255.255.255.0', 6)).toBe(false)
  })

  test('returns false for ipv6 when version is set to 4', () => {
    expect(isIp('2001:db8:abcd:0012:0000:0000:0000:0000', 4)).toBe(false)
  })

  test('returns false for non ip addresses', () => {
    expect(isIp('foo.bar')).toBe(false)
    expect(isIp(undefined)).toBe(false)
    expect(isIp(null)).toBe(false)
    expect(isIp('')).toBe(false)
    expect(isIp('abc')).toBe(false)
    expect(isIp(false)).toBe(false)
    expect(isIp(true)).toBe(false)
    expect(isIp(0)).toBe(false)
    expect(isIp(-1)).toBe(false)
    expect(isIp(1)).toBe(false)
    expect(isIp(NaN)).toBe(false)
    expect(isIp(Infinity)).toBe(false)
    expect(isIp(-Infinity)).toBe(false)
    expect(isIp([])).toBe(false)
    expect(isIp({})).toBe(false)
    expect(isIp(() => {})).toBe(false)
  })
})
