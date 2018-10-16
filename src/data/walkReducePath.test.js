import walkReducePath from './walkReducePath'

describe('#walkReducePath()', () => {
  test('reduces shallow first and only along the given path', () => {
    const result = walkReducePath(
      (accum, value, keys) => {
        accum.push({ keys, value })
        return accum
      },
      'a.b.c',
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
      {
        keys: [],
        value: {
          a: {
            b: {
              c: 'c'
            },
            d: 'd'
          },
          e: ['e', 'f']
        }
      },
      {
        keys: ['a'],
        value: {
          b: {
            c: 'c'
          },
          d: 'd'
        }
      },
      {
        keys: ['a', 'b'],
        value: {
          c: 'c'
        }
      },
      {
        keys: ['a', 'b', 'c'],
        value: 'c'
      }
    ])
  })

  test('resolves values before sending them to the iteratir and then proceeds along the resolved value for walk', () => {
    const result = walkReducePath(
      (accum, value, keys) => {
        accum.push({ keys, value })
        return accum
      },
      'a.b.c',
      [],
      {
        a: {
          b: {
            valueOf() {
              return { c: 'c' }
            }
          }
        }
      }
    )
    expect(result).toEqual([
      {
        keys: [],
        value: {
          a: {
            b: {
              valueOf: expect.any(Function)
            }
          }
        }
      },
      {
        keys: ['a'],
        value: {
          b: {
            valueOf: expect.any(Function)
          }
        }
      },
      {
        keys: ['a', 'b'],
        value: {
          c: 'c'
        }
      },
      {
        keys: ['a', 'b', 'c'],
        value: 'c'
      }
    ])
  })
})
