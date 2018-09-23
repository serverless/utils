import curry from './curry'

/**
 * Wraps a function of any arity (including nullary) in a function that accepts exactly `n` parameters. Any extraneous parameters are spread and then reapplied on execution. This is useful when you want to ensure a function's paramter length is exactly `n` but still passes all arguments through.
 *
 * @func
 * @since v0.0.4
 * @category data
 * @sig Number -> (* -> a) -> (* -> a)
 * @param {Number} n The desired arity of the new function.
 * @param {Function} fn The function to wrap.
 * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of parameter length `n`.
 * @example
 *
 *      const takesNArgs = (...args) => [ ...args ]
 *
 *      takesNArgs.length //=> 0
 *      takesNArgs(1, 2) //=> [1, 2]
 *
 *      const takesTwoArgs = nArySpread(2, takesNArgs)
 *      takesTwoArgs.length //=> 2
 *      // All arguments are passed to the wrapped function
 *      takesTwoArgs(1, 2, 3) //=> [1, 2, 3]
 *
 *      const curriedTakesTwoArgs = curry(takesTwoArgs)
 *      // auto currying works as expected
 *      const takesAtLeastOneMoreArg = curriedTakesTwoArgs(3)
 *      takesAtLeastOneMoreArg(1, 2) // => [3, 1, 2]
 */
const nArySpread = curry((n, fn) => {
  let idx = 0
  const argNames = []
  while (idx < n) {
    argNames.push(`a${idx}`)
    idx += 1
  }
  const func = new Function(
    'fn',
    `return function(${argNames.join(', ')}) {
      return fn.apply(this, arguments);
    }`
  )
  return func(fn)
})

export default nArySpread
