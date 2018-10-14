import curry from './curry'

/**
 * Applies function `fn` to the argument list `args`. This is useful for creating a fixed-arity function from a variadic function. `fn` should be a bound function if context is significant.
 *
 * @function
 * @since v0.0.6
 * @category common
 * @param {Function} fn The function which will be called with `args`
 * @param {Array} args The arguments to call `fn` with
 * @returns {*} The result, equivalent to `fn(...args)`
 * @example
 *
 * const nums = [1, 2, 3, -99, 42, 6, 7]
 * apply(Math.max, nums) //=> 42
 */
const apply = curry(function(fn, args) {
  return fn.apply(this, args)
})

export default apply
