import append from './append'
import castPath from './castPath'
import isObject from './isObject'
import walk from './walk'

const reducePathWalkee = (pathParts, accum, value, keys, iteratee, recur) => {
  let result = iteratee(accum, value, keys)
  if (pathParts.length > keys.length && isObject(value)) {
    const nextKey = pathParts[keys.length]
    const newKeys = append(nextKey, keys)
    result = recur(pathParts, result, value[nextKey], newKeys, iteratee)
  }
  return result
}

/**
 * Walk reduce the specific path using the given reducer function
 *
 * @func
 * @since v0.0.6
 * @category data
 * @param {*} path The specific path to walk
 * @param {Function} fn The iterator function. Receives three values, the accumulator and the current element from the walk and the current set of keys from the entire depth of the walk.
 * @param {*} accum The accumulator value.
 * @param {*} collection The collection to walk.
 * @returns {*} The final, accumulated value.
 * @example
 *
 * walkReducePath(
 *   (accum, value, keys) => {
 *     return accum.push(keys)
 *   },
 *   'a.c.d'
 *   [],
 *   {
 *     a: {
 *       b: 'b',
 *       c: {
 *         d: 'd'
 *       }
 *     },
 *     e: [ 'e', 'f' ]
 *   }
 * )
 * //=> [
 * //   [],
 * //   ['a'],
 * //   ['a', 'c'],
 * //   ['a', 'c', 'd']
 * // ]
 */
const walkReducePath = (iteratee, path, accum, collection) =>
  walk(reducePathWalkee, iteratee, castPath(path), accum, collection, [])

export default walkReducePath
