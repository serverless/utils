import isGenerator from './isGenerator'

describe('isGenerator', () => {
  test('identifies a generator returned from a generator function', () => {
    const testGenerator = (function*() {})()
    expect(isGenerator(testGenerator)).toBe(true)
  })

  test('identifies a generator created from basic object', () => {
    const testGenerator = {
      next: () => {},
      throw: () => {}
    }
    expect(isGenerator(testGenerator)).toBe(true)
  })

  test('is not a generator when object is missing next method', () => {
    const testGenerator = {
      throw: () => {}
    }
    expect(isGenerator(testGenerator)).toBe(false)
  })
})
