import iterate from './iterate'

describe('iterate', () => {
  test('iterates array until done is true', () => {
    const values = ['a', 'b', 'c', 'd', null, 'f']
    const acc = []
    const result = iterate((next) => {
      acc.push(next)
      return {
        ...next,
        done: !next.value,
        value: acc
      }
    }, values)
    expect(result).toEqual([
      { value: 'a', kdx: 0, index: 0, done: false },
      { value: 'b', kdx: 1, index: 1, done: false },
      { value: 'c', kdx: 2, index: 2, done: false },
      { value: 'd', kdx: 3, index: 3, done: false },
      { value: null, kdx: 4, index: 4, done: false }
    ])
  })

  test(
    'iterate upgrades to Promise when async iteratee is used',
    async () => {
      const values = ['a', 'b', 'c', 'd', null, 'f']
      const acc = []
      let result = iterate(
        (next) =>
          new Promise((resolve) => {
            setTimeout(() => {
              acc.push(next)
              resolve({
                ...next,
                done: !next.value,
                value: acc
              })
            }, 2000 - next.kdx * 500) // NOTE BRN: delay first using greatest time to test order of iteration
          }),
        values
      )
      expect(result).toBeInstanceOf(Promise)
      result = await result
      expect(result).toEqual([
        { value: 'a', kdx: 0, index: 0, done: false },
        { value: 'b', kdx: 1, index: 1, done: false },
        { value: 'c', kdx: 2, index: 2, done: false },
        { value: 'd', kdx: 3, index: 3, done: false },
        { value: null, kdx: 4, index: 4, done: false }
      ])
    },
    10000
  )
})
