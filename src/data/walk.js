import curryN from '../common/curryN'
import defn from '../common/defn'

/**
 * Walk using the given walkee and iteratee functions.
 *
 * @function
 * @since v0.0.4
 * @category data
 * @sig
 * @param {Function} walkee The function responsible for returning the next value in the walk
 * @param {Function} iteratee The iterator function.
 * @returns {*} The final value returned by the walk
 * @example
 *
 * const depthFirstWalkee = (value, iteratee, recur) => {
 *   if (isObject(value)) {
 *     forEachObjIndexed((child) => {
 *       recur(child, iteratee)
 *     }, value)
 *   }
 *   iteratee(value, data)
 * }
 * let result = []
 * walk(
 *   depthFirstWalkee,
 *   (value) => result.push(value),
 *   {
 *     a: {
 *       b: 'b'
 *     }
 *   }
 * )
 * console.log(result)
 * //=> [
 *   'b',
 *   { b: 'b' },
 *   { a: { b: 'b' } }
 * ]
 */
const walk = curryN(
  3,
  defn('walk', (walkee, iteratee, ...args) => {
    const walker = (...pass) => walkee(...pass, walker)
    return walkee(...args, iteratee, walker)
  })
)

export default walk
