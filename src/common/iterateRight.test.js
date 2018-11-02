import iterateRight from './iterateRight'

describe('iterateRight', () => {
  test('iterateRights array until done is true', () => {
    const values = ['a', 'b', 'c', 'd', null, 'f']
    const acc = []
    const result = iterateRight((next) => {
      acc.push(next)
      return {
        ...next,
        done: !next.value,
        value: acc
      }
    }, values)
    expect(result).toEqual([
      {
        value: 'f',
        kdx: 5,
        index: 5,
        prev: undefined,
        done: false
      },
      {
        value: null,
        kdx: 4,
        index: 4,
        prev: {
          value: 'f',
          kdx: 5,
          index: 5,
          done: false
        },
        done: false
      }
    ])
  })

  test('iterateRight upgrades to Promise when async iterateRighte is used', async () => {
    const values = ['a', 'b', 'c', 'd', null, 'f']
    const acc = []
    let result = iterateRight(
      (next) =>
        new Promise((resolve) => {
          setTimeout(() => {
            acc.push(next)
            resolve({
              ...next,
              done: !next.value,
              value: acc
            })
          }, 500) // NOTE BRN: delay first using greatest time to test order of iteration
        }),
      values
    )
    expect(result).toBeInstanceOf(Promise)
    result = await result
    expect(result).toEqual([
      {
        value: 'f',
        kdx: 5,
        index: 5,
        prev: undefined,
        done: false
      },
      {
        value: null,
        kdx: 4,
        index: 4,
        prev: {
          value: 'f',
          kdx: 5,
          index: 5,
          done: false
        },
        done: false
      }
    ])
  })

  test('iterateRights an async iterator until done is true', async () => {
    const values = ['a', 'b', 'c', 'd', null, 'f']
    let idx = -1
    const iterator = {
      next: async () =>
        new Promise((resolve) => {
          idx += 1
          setTimeout(() => {
            if (idx >= values.length) {
              return resolve({
                done: true
              })
            }
            return resolve({
              value: values[idx],
              done: false
            })
          }, 0)
        })
    }
    const acc = []
    const result = iterateRight((next) => {
      acc.push(next)
      return {
        ...next,
        done: !next.value,
        value: acc
      }
    }, iterator)
    expect(result).toBeInstanceOf(Promise)
    expect(await result).toEqual([
      {
        value: 'f',
        kdx: 5,
        index: 5,
        prev: undefined,
        done: false
      },
      {
        value: null,
        kdx: 4,
        index: 4,
        prev: {
          value: 'f',
          kdx: 5,
          index: 5,
          done: false
        },
        done: false
      }
    ])
  })
})
