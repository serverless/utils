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

  test('does not resolve values before sending them to the iterator, but then resolves it and proceeds along the resolved value for walk', () => {
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
            resolve() {
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
              resolve: expect.any(Function)
            }
          }
        }
      },
      {
        keys: ['a'],
        value: {
          b: {
            resolve: expect.any(Function)
          }
        }
      },
      {
        keys: ['a', 'b'],
        value: {
          resolve: expect.any(Function)
        }
      },
      {
        keys: ['a', 'b', 'c'],
        value: 'c'
      }
    ])
  })

  it('should upgrade to async when an async iteratee is used', async () => {
    const data = {
      a: {
        b: {
          c: 'c'
        }
      }
    }

    const result = walkReducePath(
      async (accum, value, keys) =>
        new Promise((resolve) => {
          setTimeout(() => {
            accum.push({ value, keys })
            resolve(accum)
          }, 0)
        }),
      'a.b.c',
      [],
      data
    )
    expect(result).toBeInstanceOf(Promise)
    expect(await result).toEqual([
      {
        keys: [],
        value: {
          a: {
            b: {
              c: 'c'
            }
          }
        }
      },
      {
        keys: ['a'],
        value: {
          b: {
            c: 'c'
          }
        }
      },
      {
        keys: ['a', 'b'],
        value: { c: 'c' }
      },
      {
        keys: ['a', 'b', 'c'],
        value: 'c'
      }
    ])
  })
})
