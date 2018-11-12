import log from './log'

jest.spyOn(global.console, 'log')

describe('#log()', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should log message using console.log (node 6 and <= 8.9 support)', () => {
    log('foo', 'bar')
    expect(global.console.log).toHaveBeenCalledWith('foo', 'bar')
  })

  it('should return first arg', () => {
    const result = log('foo', 'bar')
    expect(result).toBe('foo')
  })
})
