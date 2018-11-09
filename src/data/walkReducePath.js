import isObject from '../base/isObject'
import curry from '../common/curry'
import pipe from '../common/pipe'
import resolve from '../common/resolve'
import append from './append'
import castPath from './castPath'
import walk from './walk'

const reduceWalkee = (pathParts, accum, value, keys, iteratee, recur) =>
  pipe(
    (result) => iteratee(result, value, keys),
    (result) => {
      const resolvedValue = resolve(value)
      if (pathParts.length > keys.length && isObject(resolvedValue)) {
        const nextKey = pathParts[keys.length]
        const newKeys = append(nextKey, keys)
        value = resolve(value)
        return recur(pathParts, result, resolvedValue[nextKey], newKeys, iteratee)
      }
      return result
    }
  )(accum)

/**
 * Walk reduce the specific path using the given reducer function
 *
 * NOTE: This method will resolve values during the walk before walking them. However, the unresolved value will be delivered to the iteratee.
 *
 * @function
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
const walkReducePath = curry((iteratee, path, accum, collection) =>
  walk(reduceWalkee, iteratee, castPath(path), accum, collection, [])
)

export default walkReducePath
