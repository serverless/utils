import pipe from './pipe'

describe('pipe', () => {
  test('executes functions in left to right order', () => {
    const method = pipe(
      (val) => val + 'foo',
      (val) => val + 'bar'
    )
    expect(method('')).toBe('foobar')
  })

  test('pipes non async functions and returns value', () => {
    const method = pipe(
      (val) => val + 1,
      (val) => val + 2
    )
    expect(method(1)).toBe(4)
  })

  test('pipes async functions and returns value', async () => {
    const method = pipe(
      async (val) => new Promise((resolve) => setTimeout(() => resolve(val + 1), 0)),
      (val) => val + 2
    )
    expect(await method(1)).toBe(4)
  })
})
