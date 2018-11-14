import castPath from './castPath'

describe('castPath', () => {
  test('casts an existing property with dots to a prop', () => {
    expect(castPath('a.b', { 'a.b': 'foo' })).toEqual(['a.b'])
  })

  test('preserves an array as an array', () => {
    expect(castPath(['a', 'b'])).toEqual(['a', 'b'])
  })
})
