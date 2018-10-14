import isArguments from './isArguments'

describe('isArguments', () => {
  test('identifies arguments from functions', async () => {
    // NOTE BRN: arrow functions do not have an arguments variable
    expect(function() {
      expect(isArguments(arguments)).toBe(true)
    }).not.toThrow()

    await (async function() {
      expect(isArguments(arguments)).toBe(true)
    })()

    const generator = (function*() {
      expect(isArguments(arguments)).toBe(true)
    })()
    generator.next()
  })

  test('returns false for all other values', () => {
    expect(isArguments(undefined)).toBe(false)
    expect(isArguments(null)).toBe(false)
    expect(isArguments('')).toBe(false)
    expect(isArguments('abc')).toBe(false)
    expect(isArguments(false)).toBe(false)
    expect(isArguments(true)).toBe(false)
    expect(isArguments(0)).toBe(false)
    expect(isArguments(-1)).toBe(false)
    expect(isArguments(1)).toBe(false)
    expect(isArguments(NaN)).toBe(false)
    expect(isArguments(Infinity)).toBe(false)
    expect(isArguments(-Infinity)).toBe(false)
    expect(isArguments({})).toBe(false)
    expect(isArguments(() => {})).toBe(false)
    expect(isArguments([])).toBe(false)
  })
})
