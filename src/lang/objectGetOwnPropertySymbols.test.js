import objectGetOwnPropertySymbols from './objectGetOwnPropertySymbols'

describe('objectGetOwnPropertySymbols', () => {
  test('gets property symboles from an object', () => {
    const symA = Symbol('a')
    const symB = Symbol.for('b')
    expect(
      objectGetOwnPropertySymbols({
        [symA]: 'a',
        [symB]: 'b'
      })
    ).toEqual([symA, symB])
  })
})
