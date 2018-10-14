import assign from './assign'

describe('assign', () => {
  test('assigns objects with overlapping properties', () => {
    const o1 = { a: 1, b: 1, c: 1 }
    const o2 = { b: 2, c: 2 }
    const o3 = { c: 3 }
    const target = {}

    const result = assign(target, o1, o2, o3)
    expect(result).toEqual({ a: 1, b: 2, c: 3 })
    expect(result).toBe(target)
  })

  test('curries the assign method', () => {
    const o1 = { a: 1, b: 1, c: 1 }
    const o2 = { b: 2, c: 2 }
    const o3 = { c: 3 }
    const target = {}

    const assignTarget = assign(target)
    expect(assignTarget).toBeInstanceOf(Function)

    const result = assignTarget(o1, o2, o3)
    expect(result).toEqual({ a: 1, b: 2, c: 3 })
    expect(result).toBe(target)
  })

  test('dispatches to the assign method of first arg', () => {
    const assignable = {
      assign(value) {
        for (const key in value) {
          this[key] = value[key]
        }
        return this
      }
    }
    const result = assign(assignable, { a: 1 })
    expect(result).toEqual({
      assign: expect.any(Function),
      a: 1
    })
    expect(result).toBe(assignable)
  })
})
