/**
 * Determine if the passed argument is an integer.
 *
 * @param {*} n
 * @return {Boolean}
 */
const isInteger = Number.isInteger || ((n) => n << 0 === n)

export default isInteger
