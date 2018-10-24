import curry from '../common/curry'
import resolveWith from '../common/resolveWith'

/**
 * A function that returns the `!` of its argument. It will return `true` when passed false-y value, and `false` when passed a truth-y one.
 *
 * Auto curried for placeholder support.
 *
 * @function
 * @since v0.0.13
 * @category logic
 * @param {*} value Any value
 * @returns {boolean} the logical inverse of passed argument.
 * @example
 *
 * not(true) //=> false
 * not(false) //=> true
 * not(0) //=> true
 * not(1) //=> false
 */
const not = curry(resolveWith((value) => !value))

export default not
