import arrayLikeKeys from './arrayLikeKeys'

describe('arrayLikeKeys', () => {
  test('returns array of keys for array', () => {
    expect(arrayLikeKeys(['foo', 'bar'])).toEqual(['0', '1'])
  })
})
