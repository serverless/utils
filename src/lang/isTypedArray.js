import isObjectLike from './isObjectLike'
import nodeTypes from './nodeTypes'
import toStringTag from './toStringTag'

/** Used to match `toStringTag` values of typed arrays. */
const reTypedTag = /^\[object (?:Float(?:32|64)|(?:Int|Uint)(?:8|16|32)|Uint8Clamped)\]$/

/* Node.js helper references. */
const nodeIsTypedArray = nodeTypes && nodeTypes.isTypedArray

/**
 * Checks if `value` is classified as a typed array.
 *
 * @function
 * @since v0.0.3
 * @category lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * isTypedArray(new Uint8Array()) // => true
 *
 * isTypedArray([]) // => false
 */
const isTypedArray = nodeIsTypedArray
  ? (value) => nodeIsTypedArray(value)
  : (value) => isObjectLike(value) && reTypedTag.test(toStringTag(value))

export default isTypedArray
