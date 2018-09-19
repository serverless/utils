/**
 * Determine if the passed argument is an integer.
 *
 * @func
 * @since v0.0.3
 * @category data
 * @param {*} n
 * @returns {Boolean}
 */
const isInteger = Number.isInteger || ((n) => n << 0 === n)

export default isInteger
