import isObjectLike from './isObjectLike'
import toStringTag from './toStringTag'

/**
 * Checks if `value` is classified as a `Number` primitive or object.
 *
 * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are
 * classified as numbers, use the `Number.isFinite` method.
 *
 * @function
 * @since v0.0.3
 * @category lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a number, else `false`.
 * @example
 *
 * isNumber(3) // => true
 *
 * isNumber(Number.MIN_VALUE) // => true
 *
 * isNumber(Infinity) // => true
 *
 * isNumber('3') // => false
 */
const isNumber = (value) =>
  typeof value == 'number' || (isObjectLike(value) && toStringTag(value) == '[object Number]')

export default isNumber
