import baseGetTag from './baseGetTag'
import isObjectLike from './isObjectLike'

/**
 * Checks if `value` is classified as a boolean primitive or object.
 *
 * @function
 * @since v0.0.10
 * @category lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a boolean, else `false`.
 * @example
 *
 * isBoolean(false)
 * // => true
 *
 * isBoolean(null)
 * // => false
 */
const isBoolean = (value) =>
  value === true ||
  value === false ||
  (isObjectLike(value) && baseGetTag(value) == '[object Boolean]')

export default isBoolean
