const { isArray } = Array

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @func
 * @since 0.3.0
 * @category data
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * isArray([1, 2, 3]) // => true
 *
 * isArray(document.body.children) // => false
 *
 * isArray('abc') // => false
 *
 * isArray(_.noop) // => false
 */
export default isArray
