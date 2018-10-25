import isArray from '../base/isArray'
import isObject from '../base/isObject'
import curry from '../common/curry'
import resolve from '../common/resolve'
import concat from './concat'
import forEachIndexed from './forEachIndexed'
import forEachObjIndexed from './forEachObjIndexed'
import walk from './walk'

const reduceWalkee = (accum, value, keys, iteratee, recur) => {
  let result = iteratee(accum, value, keys)
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
  return result
}

/**
 * Walk reduce using the given reducer function
 *
 * NOTE: This method will resolve values during the walk before iterating and walking them.
 *
 * @function
 * @since v0.0.4
 * @category data
 * @param {Function} fn The iterator function. Receives three values, the accumulator and the current element from the walk and the current set of keys from the entire depth of the walk.
 * @param {*} accum The accumulator value.
 * @param {*} collection The collection to walk.
 * @returns {*} The final, accumulated value.
 * @example
 *
 * walkReduce(
 *   (accum, value, keys) => {
 *     if (!isObject(value)) {
 *       return accum + toString(value)
 *     }
 *     return accum
 *   },
 *   '',
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
 * //=> 'bdef'
 */
const walkReduce = curry((iteratee, accum, collection) =>
  walk(reduceWalkee, iteratee, accum, collection, [])
)

export default walkReduce
