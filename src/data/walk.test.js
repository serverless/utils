import walk from './walk'

describe('#walk()', () => {
  test('calls the walkee method with the args prefixed and the iteratee and walkee appended to the end', () => {
    const iteratee = (arg) => arg
    const walkee = (value, iter, recur) => {
      expect(iter).toBe(iteratee)
      expect(value).toBe('abc')
      expect(recur).toBeInstanceOf(Function)
      return iteratee('foo')
    }
    const result = walk(walkee, iteratee, 'abc')
    expect(result).toBe('foo')
  })
})
