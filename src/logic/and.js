import allWith from '../common/allWith'
import curryN from '../common/curryN'

/**
 * Returns `true` if both arguments are `true`; `false` otherwise.
 *
 * This method resolves both parameters before executing.
 *
 * This method will automatically upgrade to async if a Promise is received for either value.
 *
 * @function
 * @since v0.0.13
 * @category logic
 * @param {*} valueA
 * @param {*} valueB
 * @returns {*} the first argument if it is falsy, otherwise the second argument.
 * @example
 *
 * and(true, true) //=> true
 * and(true, false) //=> false
 * and(false, true) //=> false
 * and(false, false) //=> false
 * await and(Promise.resolve(false), false) //=> false
 */
const and = curryN(2, (...values) => allWith(([valueA, valueB]) => valueA && valueB, values))

export default and
