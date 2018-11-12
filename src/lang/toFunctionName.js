import defn from '../common/defn'
import isFunction from './isFunction'

/**
 * Converts `value` to a the name of a function.
 *
 * @function
 * @since v0.0.17
 * @category lang
 * @param {Function} fn The function to convert
 * @returns {number} Returns the function's name.
 * @example
 *
 * toFunctionName(null)
 * // => throws 'toFunctionName expected a function'
 *
 * toFunctionName(function test() {})
 * // => 'test'
 */
const toFunctionName = defn('toFunctionName', (fn) => {
  if (!isFunction(fn)) {
    throw new TypeError('toFunctionName expected a function')
  }
  // String(x => x) evaluates to 'x => x', so the pattern may not match.
  const match = String(fn).match(/^function (\w*)/)
  return match == null ? '' : match[1]
})

export default toFunctionName
