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

  test('automatically upgrades to async if the arrayLike parameter is a Promise', async () => {
    const result = prepend('write', Promise.resolve(['tests']))
    expect(result).toBeInstanceOf(Promise)
    expect(await result).toEqual(['write', 'tests'])
  })

  test('does NOT automatically upgrade to async if the value parameter is a Promise', () => {
    const result = prepend(Promise.resolve('write'), ['tests'])
    expect(result).toEqual([Promise.resolve('write'), 'tests'])
  })

  test('automatically upgrades to async if the arrayLike parameter is a Promise and then dispatches to its prepend method', async () => {
    const result = prepend(
      'write',
      Promise.resolve({
        prepend: (value) => [value].concat(['tests'])
      })
    )
    expect(result).toBeInstanceOf(Promise)
    expect(await result).toEqual(['write', 'tests'])
  })
})
