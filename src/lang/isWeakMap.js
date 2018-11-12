import isObjectLike from './isObjectLike'
import toStringTag from './toStringTag'

/**
 * Checks if `value` is classified as a `WeakMap` object.
 *
 * @function
 * @since 0.0.10
 * @category lang
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
const isWeakMap = (value) => isObjectLike(value) && toStringTag(value) == '[object WeakMap]'

export default isWeakMap
