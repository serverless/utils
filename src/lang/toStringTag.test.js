import toStringTag from './toStringTag'

describe('toStringTag', () => {
  test('converts undefined to the undefined tag', () => {
    expect(toStringTag(undefined)).toBe('[object Undefined]')
  })
})
