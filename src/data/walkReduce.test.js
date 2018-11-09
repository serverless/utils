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

  test('Does not resolve values before sending them to the iteratee. Resolves the value afterward and then proceeds along the resolved value for walk', () => {
    const result = walkReduce(
      (accum, value, keys) => {
        accum.push({
          keys,
          value
        })
        return accum
      },
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
    const props = {
      foo: 'bar'
    }

    const result = walkReduce(
      async (accum, value, keys) =>
        new Promise((resolve) => {
          setTimeout(() => {
            accum.push({ value, keys })
            resolve(accum)
          }, 0)
        }),
      [],
      props
    )
    expect(result).toBeInstanceOf(Promise)
    expect(await result).toEqual([
      {
        keys: [],
        value: props
      },
      {
        keys: ['foo'],
        value: 'bar'
      }
    ])
  })
})
