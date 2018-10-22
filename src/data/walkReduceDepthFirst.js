import isArray from '../base/isArray'
import isObject from '../base/isObject'
import resolve from '../common/resolve'
import concat from './concat'
import forEachIndexed from './forEachIndexed'
import forEachObjIndexed from './forEachObjIndexed'
import walk from './walk'

const walkee = (accum, value, keys, iteratee, recur) => {
  let result = accum
  value = resolve(value)
  if (isArray(value)) {
    forEachIndexed((child, childIndex) => {
      const newKeys = concat(keys, [childIndex])
      result = recur(result, child, newKeys, iteratee)
    }, value)
  } else if (isObject(value)) {
    forEachObjIndexed((child, childKey) => {
      const newKeys = concat(keys, [childKey])
      result = recur(result, child, newKeys, iteratee)
    }, value)
  }
  return iteratee(result, value, keys)
}

/**
 * Walk depth first and reduce using the given reducer function
 *
 * NOTE: This method will resolve values during the walk before iterating and walking them.
 *
 * @function
 * @since v0.0.4
 * @category data
 * @param {Function} iteratee The iterator function. Receives three values, the accumulator and the current element from the walk and the current set of keys from the entire depth of the walk.
 * @param {*} accum The accumulator value.
 * @param {*} collection The collection to walk.
 * @returns {*} The final, accumulated value.
 * @example
 *
 * walkReduceDepthFirst(
 *   (accum, value, keys) => {
 *     accum.push(keys)
 *     return accum
 *   },
 *   [],
 *   {
 *     a: {
 *       b: {
 *         c: 'c'
 *       },
 *       d: 'd',
 *     },
 *     e: [ 'e', 'f' ]
 *   }
 * )
 * //=> [
 *   [ 'a', 'b', 'c' ],
 *   [ 'a', 'b' ],
 *   [ 'a', 'd' ],
 *   [ 'a' ],
 *   [ 'e', 0 ],
 *   [ 'e', 1 ],
 *   [ 'e' ],
 *   []
 * ]
 */
const walkReduceDepthFirst = (iteratee, accum, collection) =>
  walk(walkee, iteratee, accum, collection, [])

export default walkReduceDepthFirst
