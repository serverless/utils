import baseGetTag from './baseGetTag'
import isObjectLike from './isObjectLike'
import nodeTypes from './nodeTypes'

/* Node.js helper references. */
const nodeIsRegExp = nodeTypes && nodeTypes.isRegExp

/**
 * Checks if `value` is classified as a `RegExp` object.
 *
 * @function
 * @since v0.0.10
 * @category lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
 * @example
 *
 * isRegExp(/abc/)
 * // => true
 *
 * isRegExp('/abc/')
 * // => false
 */
const isRegExp = nodeIsRegExp
  ? (value) => nodeIsRegExp(value)
  : (value) => isObjectLike(value) && baseGetTag(value) == '[object RegExp]'

export default isRegExp
