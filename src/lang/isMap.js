import isObjectLike from './isObjectLike'
import nodeTypes from './nodeTypes'
import toStringTag from './toStringTag'

/* Node.js helper references. */
const nodeIsMap = nodeTypes && nodeTypes.isMap

/**
 * Checks if `value` is classified as a `Map` object.
 *
 * @function
 * @since v0.0.3
 * @category lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 * @example
 *
 * isMap(new Map) // => true
 *
 * isMap(new WeakMap) // => false
 */
const isMap = nodeIsMap
  ? (value) => nodeIsMap(value)
  : (value) => isObjectLike(value) && toStringTag(value) == '[object Map]'

export default isMap
