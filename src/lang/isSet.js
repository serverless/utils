import isObjectLike from './isObjectLike'
import nodeTypes from './nodeTypes'
import toStringTag from './toStringTag'

/* Node.js helper references. */
const nodeIsSet = nodeTypes && nodeTypes.isSet

/**
 * Checks if `value` is classified as a `Set` object.
 *
 * @function
 * @since v0.0.10
 * @category lang
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
  : (value) => isObjectLike(value) && toStringTag(value) == '[object Set]'

export default isSet
