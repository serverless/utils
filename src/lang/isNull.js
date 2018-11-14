/**
 * Checks if `value` is `null`.
 *
 * @function
 * @since v0.0.3
 * @category lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `null`, else `false`.
 * @example
 *
 * isNull(null) // => true
 *
 * isNull(void 0) // => false
 */
const isNull = (value) => value === null

export default isNull
