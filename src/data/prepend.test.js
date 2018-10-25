import prepend from './prepend'

describe('prepend', () => {
  test('prepends value to the beginning of an array', () => {
    expect(prepend('write', ['more', 'tests'])).toEqual(['write', 'more', 'tests'])
  })

  test('prepends value to the beginning of an empty array', () => {
    expect(prepend('tests', [])).toEqual(['tests'])
  })

  test('prepends an array as an array', () => {
    expect(prepend(['write'], ['more', 'tests'])).toEqual([['write'], 'more', 'tests'])
  })

  test('prepends a string to a string', () => {
    expect(prepend('write', 'tests')).toEqual('writetests')
  })

  test('curries the prepend method', () => {
    const prependTests = prepend('write')
    expect(prependTests).toBeInstanceOf(Function)

    expect(prependTests(['tests'])).toEqual(['write', 'tests'])
  })

  test('dispatches to the prepend method of last arg', () => {
    const prependable = {
      prepend: (value) => {
        return [value].concat(['tests'])
      }
    }

    expect(prepend('write', prependable)).toEqual(['write', 'tests'])
  })
})
