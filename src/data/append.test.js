import append from './append'

describe('append', () => {
  test('appends value to the end of an array', () => {
    expect(append('tests', ['write', 'more'])).toEqual(['write', 'more', 'tests'])
  })

  test('appends value to the end of an empty array', () => {
    expect(append('tests', [])).toEqual(['tests'])
  })

  test('appends an array as an array', () => {
    expect(append(['tests'], ['write', 'more'])).toEqual(['write', 'more', ['tests']])
  })

  test('appends a string to a string', () => {
    expect(append('tests', 'write')).toEqual('writetests')
  })

  test('curries the append method', () => {
    const appendTests = append('tests')
    expect(appendTests).toBeInstanceOf(Function)

    expect(appendTests(['write'])).toEqual(['write', 'tests'])
  })

  test('dispatches to the append method of last arg', () => {
    const appendable = {
      append: (value) => {
        return ['write'].concat([value])
      }
    }

    expect(append('tests', appendable)).toEqual(['write', 'tests'])
  })

  test('automatically upgrades to async if the arrayLike parameter is a Promise', async () => {
    const result = append('tests', Promise.resolve(['write']))
    expect(result).toBeInstanceOf(Promise)
    expect(await result).toEqual(['write', 'tests'])
  })

  test('does NOT automatically upgrade to async if the value parameter is a Promise', () => {
    const result = append(Promise.resolve('tests'), ['write'])
    expect(result).toEqual(['write', Promise.resolve('tests')])
  })

  test('automatically upgrades to async if the arrayLike parameter is a Promise and then dispatches to its append method', async () => {
    const result = append(
      'tests',
      Promise.resolve({
        append: (value) => ['write'].concat([value])
      })
    )
    expect(result).toBeInstanceOf(Promise)
    expect(await result).toEqual(['write', 'tests'])
  })
})
