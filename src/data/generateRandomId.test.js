import generateRandomId from './generateRandomId'

describe('#generateRandomId()', () => {
  it('should generate a unique id with the given length', () => {
    const length = 11
    const res = generateRandomId(length)
    expect(res.length).toEqual(length)
    expect(res).toMatch(/[a-z0-9]+/)
  })
})
