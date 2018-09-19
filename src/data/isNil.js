/**
 * Checks if `value` is `null` or `undefined`.
 *
 * @func
 * @since v0.0.3
 * @category data
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
 * @example
 *
 * isNil(null)
 * // => true
 *
 * isNil(void 0)
 * // => true
 *
 * isNil(NaN)
 * // => false
 */
const isNil = (value) => value == null

export default isNil
