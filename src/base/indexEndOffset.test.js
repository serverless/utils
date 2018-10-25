import indexEndOffset from './indexEndOffset'

describe('indexEndOffset', () => {
  test('sets the index if greater than equal to 0 and less than length', () => {
    expect(indexEndOffset(0, 2)).toBe(0)
    expect(indexEndOffset(1, 2)).toBe(1)
    expect(indexEndOffset(2, 2)).toBe(2)
  })

  test('if index is greater than length than it is set to length', () => {
    expect(indexEndOffset(4, 3)).toBe(3)
  })

  test('if index is less than 0 than it is set to length + offset', () => {
    expect(indexEndOffset(-1, 3)).toBe(2)
    expect(indexEndOffset(-2, 3)).toBe(1)
    expect(indexEndOffset(-3, 3)).toBe(0)
  })

  test('if index is less than 0 than AND length + offset is less than 0, than index should be 0', () => {
    expect(indexEndOffset(-4, 3)).toBe(0)
    expect(indexEndOffset(-99, 3)).toBe(0)
  })
})
