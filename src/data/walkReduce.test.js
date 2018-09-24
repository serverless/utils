import walkReduce from './walkReduce'

describe('#walkReduce()', () => {
  test('reduces shallow first', () => {
    const result = walkReduce(
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
      [],
      ['a'],
      ['a', 'b'],
      ['a', 'b', 'c'],
      ['a', 'd'],
      ['e'],
      ['e', 0],
      ['e', 1]
    ])
  })
})
