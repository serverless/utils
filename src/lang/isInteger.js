import isNumber from './isNumber'

/**
 * Determine if the passed argument is an integer.
 *
 * @function
 * @since v0.0.3
 * @category lang
 * @param {*} value The value to check.
 * @returns {Boolean} Returns `true` if `value` is an integer, else `false`.
 * @example
 *
 * isInteger(3) // => true
 *
 * isInteger(new Number(3)) // => true
 *
 * isInteger(3.2) // => false

 * isInteger(Number.MIN_VALUE) // => false
 *
 * isInteger(Infinity) // => false
 *
 * isInteger(NaN) // => false
 *
 * isInteger('3') // => false
 */
const isInteger = (value) => isNumber(value) && value << 0 == value

export default isInteger
