/**
 * Determine if the passed argument is an integer.
 *
 * @function
 * @since v0.0.3
 * @category data
 * @param {*} value The value to check.
 * @returns {Boolean} Returns `true` if `value` is an integer, else `false`.
 * @example
 *
 * isInteger(3) // => true
 *
 * isInteger(3.2) // => false

 * isInteger(Number.MIN_VALUE) // => false
 *
 * isInteger(Infinity) // => false
 *
 * isInteger('3') // => false
 */
const isInteger = Number.isInteger || ((value) => value << 0 === value)

export default isInteger
