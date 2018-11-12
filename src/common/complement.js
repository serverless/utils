import curry from './curry'
import isFunction from '../lang/isFunction'
import isPromise from '../lang/isPromise'

/**
 * returns a new function that logically nots the returned value and returns that as the result.
 *
 * Auto-curried for placeholder support
 *
 * @function
 * @since v0.0.10
 * @category common
 * @param {Function} fn The function to complement
 * @returns {Function} The complemented function
 * @example
 *
 * const isEven = (value) => value % 2 === 0
 * const isOdd = complement(isEven)
 * isOdd(1) //=> true
 */
const complement = curry((fn) => {
  if (!isFunction(fn)) {
    throw new TypeError(`Expected 'fn' parameter to be a function. Instead received ${fn}.`)
  }
  return function() {
    const result = fn.apply(this, arguments)
    if (isPromise(result)) {
      return result.then((resolvedResult) => !resolvedResult)
    }
    return !result
  }
})

export default complement
