import curry from './curry'

/**
 * Wraps a function of any arity (including nullary) in a function that accepts exactly `n` parameters. Any extraneous parameters will not be passed to the supplied function.
 *
 * @func
 * @since v0.0.3
 * @category common
 * @param {Number} n The desired arity of the new function.
 * @param {Function} fn The function to wrap.
 * @returns {Function} A new function wrapping `fn`. The new function is guaranteed to be of arity `n`.
 * @example
 *
 * const takesTwoArgs = (a, b) => [a, b]
 *
 * takesTwoArgs.length //=> 2
 * takesTwoArgs(1, 2) //=> [1, 2]
 *
 * const takesOneArg = nAry(1, takesTwoArgs)
 * takesOneArg.length //=> 1
 * // Only `n` arguments are passed to the wrapped function
 * takesOneArg(1, 2) //=> [1, undefined]
 */
const nAry = curry((n, fn) => {
  let idx = 0
  const argNames = []
  while (idx < n) {
    argNames.push(`a${idx}`)
    idx += 1
  }
  const func = new Function(
    'fn',
    'n',
    `return function(${argNames.join(', ')}) {
      return fn.apply(this, Array.prototype.slice.call(arguments, 0, n));
    }`
  )
  return func(fn, n)
})

export default nAry
