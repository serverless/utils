import walkReduceDepthFirst from './walkReduceDepthFirst'

describe('#walkReduceDepthFirst()', () => {
  test('reduces depth first', () => {
    const result = walkReduceDepthFirst(
      (accum, value, keys) => {
        accum.push(keys)
        return accum
      },
      [],
      {
        a: {
          b: {
            c: 'c'
          },
          d: 'd'
        },
        e: ['e', 'f']
      }
    )
    expect(result).toEqual([
      ['a', 'b', 'c'],
      ['a', 'b'],
      ['a', 'd'],
      ['a'],
      ['e', 0],
      ['e', 1],
      ['e'],
      []
    ])
  })
})
