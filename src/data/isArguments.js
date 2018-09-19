import getTag from './getTag'
import isObjectLike from './isObjectLike'

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @func
 * @category data
 * @since v0.0.3
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object, else `false`.
 * @example
 *
 * isArguments(function() { return arguments }()) // => true
 *
 * isArguments([1, 2, 3]) // => false
 */
const isArguments = (value) => isObjectLike(value) && getTag(value) == '[object Arguments]'

export default isArguments
