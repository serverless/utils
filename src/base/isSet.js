import getTag from './getTag'
import isObjectLike from './isObjectLike'
import nodeTypes from './nodeTypes'

/* Node.js helper references. */
const nodeIsSet = nodeTypes && nodeTypes.isSet

/**
 * Checks if `value` is classified as a `Set` object.
 *
 * @function
 * @since 0.0.10
 * @category data
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 * @example
 *
 * isSet(new Set())
 * // => true
 *
 * isSet(new WeakSet())
 * // => false
 */
const isSet = nodeIsSet
  ? (value) => nodeIsSet(value)
  : (value) => isObjectLike(value) && getTag(value) == '[object Set]'

export default isSet
