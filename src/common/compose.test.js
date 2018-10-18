import compose from './compose'

describe('compose', () => {
  test('executes functions in right to left order', () => {
    const method = compose(
      (val) => val + 'bar',
      (val) => val + 'foo'
    )
    expect(method('')).toBe('foobar')
  })

  test('composes non async functions and returns value', () => {
    const method = compose(
      (val) => val + 1,
      (val) => val + 2
    )
    expect(method(1)).toBe(4)
  })

  test('composes async functions and returns value', async () => {
    const method = compose(
      async (val) => new Promise((resolve) => setTimeout(() => resolve(val + 1), 0)),
      (val) => val + 2
    )
    expect(await method(1)).toBe(4)
  })
})
