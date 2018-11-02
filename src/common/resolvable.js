import isFunction from '../base/isFunction'
import curry from './curry'

/**
 * Creates an object that resolves to the result of the given function.
 *
 * @function
 * @since v0.0.16
 * @category common
 * @param {Function} fn The function to generate the resolved value.
 * @returns {Object} The resolvable object
 * @example
 *
 * const resolveLater = resolvable(() => 'foo')
 * // => {
 * //   resolve: () => 'foo'
 * // }
 *
 * resolve(resolveLater)
 * //=> 'foo'
 */
const resolvable = curry((fn) => {
  if (!isFunction(fn)) {
    throw new TypeError(`resolvable expects fn to be a Function. Instead received ${fn}`)
  }
  return {
    resolve: fn
  }
})

export default resolvable
