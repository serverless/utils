import join from './join'

describe('join', () => {
  test('joins array values with the given the seperator', () => {
    expect(join('|', [1, 2, 3])).toBe('1|2|3')
  })

  test('curries the method', () => {
    const spacer = join(' ')
    expect(spacer).toBeInstanceOf(Function)
    expect(spacer(['a', 2, 3.4])).toBe('a 2 3.4')
  })

  test('upgrades to a Promise when a Promise is received as a parameter', async () => {
    expect(await join(Promise.resolve('|'), Promise.resolve([1, 2, 3]))).toBe('1|2|3')
  })
})
