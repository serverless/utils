import defn from '../common/defn'
import isPromise from './isPromise'
import toFinite from './toFinite'

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @function
 * @since v0.0.7
 * @category data
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * toInteger(3.2)
 * // => 3
 *
 * toInteger(Number.MIN_VALUE)
 * // => 0
 *
 * toInteger(Infinity)
 * // => 1.7976931348623157e+308
 *
 * toInteger('3.2')
 * // => 3
 */
const toInteger = defn('toInteger', (value) => {
  if (isPromise(value)) {
    return value.then((resolvedValue) => toInteger(resolvedValue))
  }
  const result = toFinite(value)
  const remainder = result % 1

  return remainder ? result - remainder : result
})

export default toInteger
