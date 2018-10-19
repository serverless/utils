import getTag from './getTag'
import isObjectLike from './isObjectLike'

/**
 * Checks if `value` is classified as a `WeakMap` object.
 *
 * @function
 * @since 0.0.10
 * @category data
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a weak map, else `false`.
 * @example
 *
 * isWeakMap(new WeakMap())
 * // => true
 *
 * isWeakMap(new Map())
 * // => false
 */
const isWeakMap = (value) => isObjectLike(value) && getTag(value) == '[object WeakMap]'

export default isWeakMap
