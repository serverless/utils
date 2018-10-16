import sleep from './sleep'

describe('#sleep()', () => {
  it('should wait least 100ms', async () => {
    const start = Date.now()
    await sleep(100)
    // NOTE BRN: 1ms allowance between grabbing if start timestamp and starting of sleep (thus 99 instead of 100)
    expect(Date.now() - start).toBeGreaterThanOrEqual(99)
  })

  it('should wait least 1000ms', async () => {
    const start = Date.now()
    await sleep(1000)
    // NOTE BRN: 1ms allowance between grabbing if start timestamp and starting of sleep (thus 999 instead of 1000)
    expect(Date.now() - start).toBeGreaterThanOrEqual(999)
  })
})
