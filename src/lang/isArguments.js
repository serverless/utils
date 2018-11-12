import isObjectLike from './isObjectLike'
import toStringTag from './toStringTag'

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @function
 * @category lang
 * @since v0.0.3
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object, else `false`.
 * @example
 *
 * isArguments(function() { return arguments }()) // => true
 *
 * isArguments([1, 2, 3]) // => false
 */
const isArguments = (value) => isObjectLike(value) && toStringTag(value) == '[object Arguments]'

export default isArguments
