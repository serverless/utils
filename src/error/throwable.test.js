import throwable from './throwable'

describe('throwable', () => {
  test('has stack trace', () => {
    const error = throwable({
      message: 'Test message'
    })
    expect(error.message).toBe('Test message')
    expect(error.stack).toMatch(/^Error: Test message.*$/m)
  })
})
