import { baseAll } from './all'
import { baseResolveWith } from './resolveWith'
import curry from './curry'

const baseAllWith = (fn, value) => baseResolveWith(fn, baseAll(value))

/**
 * Resolves all async values in an array or object and executes the given with the result
 *
 * Auto curried for placeholder support.
 *
 * @function
 * @since v0.0.13
 * @category common
 * @param {Function} fn The function to execute at the end of the resolution
 * @param {*} value The array or object whose values should be resolved. If value is not an object or array, the value is simply resolved to itself
 * @returns {*} The array or object with its values resolved
 * @example
 *
 * const nums = [
 *   1,
 *   Promise.resolve(2),
 *   (async () => 3)()
 * ]
 * await allWith(
 *   (resolvedNums) => 'foo', // [ 1, 2, 3 ]
 *   nums
 * ) // => 'foo'
 *
 * const keyed = {
 *   a: 1,
 *   b: Promise.resolve(2),
 *   c: (async () => 3)()
 * }
 *
 * await allWith(
 *   (resolvedNums) => 'foo', // { a: 1, b: 2, c: 3 }
 *   keyed
 * ) // => 'foo'
 *
 * allWith(
 *   (resolvedNums) => 'foo', // [ 1, 2, 3 ]
 *   [ 1, 2, 3 ]
 * ) // => 'foo'
 */
const allWith = curry(baseAllWith)

export default allWith

export { baseAllWith }
