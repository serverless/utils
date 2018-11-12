import isNumber from './isNumber'

/**
 * Checks if `value` is `Infinity` or `-Infinity`.
 *
 * @function
 * @since v0.0.13
 * @category lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `Infinity` or `-Infinity`, else `false`.
 * @example
 *
 * isInfinity(Infinity)
 * // => true
 *
 * isInfinity(-Infinity)
 * // => true
 *
 * isInfinity(new Number(Infinity))
 * // => true
 *
 * isInfinity(undefined)
 * // => false
 *
 * isInfinity(123)
 * // => false
 */
const isInfinity = (value) => isNumber(value) && (Infinity === +value || -Infinity === +value)

export default isInfinity
