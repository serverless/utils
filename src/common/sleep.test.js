import sleep from './sleep'

describe('#sleep()', () => {
  it('should wait least 100ms', async () => {
    const start = Date.now()
    await sleep(100)
    expect(Date.now() - start).toBeGreaterThanOrEqual(100)
  })

  it('should wait least 1000ms', async () => {
    const start = Date.now()
    await sleep(1000)
    expect(Date.now() - start).toBeGreaterThanOrEqual(1000)
  })
})
