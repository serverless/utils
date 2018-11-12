import indexOf from './indexOf'

describe('indexOf', () => {
  test('indexOf value in array', () => {
    const array = ['a', 'b', 'c']
    expect(indexOf('a', array)).toBe(0)
  })
})
