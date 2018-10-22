import objectHasOwnProperty from './objectHasOwnProperty'

describe('objectHasOwnProperty', () => {
  test('correctly identifies object with property', () => {
    expect(
      objectHasOwnProperty(
        {
          foo: 'bar'
        },
        'foo'
      )
    ).toBe(true)
  })
})
