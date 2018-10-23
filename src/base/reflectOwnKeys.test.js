import reflectOwnKeys from './reflectOwnKeys'

describe('reflectOwnKeys', () => {
  test('gets property symbols and keys from an object', () => {
    const symA = Symbol('a')
    const symB = Symbol.for('b')
    expect(
      reflectOwnKeys({
        [symA]: 'a',
        [symB]: 'b',
        c: 'c'
      })
    ).toEqual(['c', symA, symB])
  })
})
