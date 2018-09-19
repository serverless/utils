/**
 * Checks if `value` is `undefined`.
 *
 * @func
 * @since 0.3.0
 * @category data
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
 * @example
 *
 * isUndefined(void 0)
 * // => true
 *
 * isUndefined(null)
 * // => false
 */
const isUndefined = (value) => value === undefined

export default isUndefined
