import allWith from '../common/allWith'
import curryN from '../common/curryN'

/**
 * Returns `true` if one or both of its arguments are `true`. Returns `false` if both arguments are `false`.
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
 * @returns {*} the first argument if truthy, otherwise the second argument.
 * @example
 *
 * or(true, true) //=> true
 * or(true, false) //=> true
 * or(false, true) //=> true
 * or(false, false) //=> false
 * await or(Promise.resolve(false), false) //=> false
 */
const or = curryN(2, (...values) => allWith(([valueA, valueB]) => valueA || valueB, values))
export default or
