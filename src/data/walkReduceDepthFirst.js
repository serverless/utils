import concat from './concat'
import curry from '../common/curry'
import isFunction from '../lang/isFunction'
import isObject from '../lang/isObject'
import pipe from '../common/pipe'
import reduce from './reduce'
import resolve from '../common/resolve'
import walk from './walk'

const reduceWalkee = () => {
  const visited = new Set()
  return (accum, value, keys, iteratee, recur) => {
    const resolvedValue = resolve(value)
    return pipe(
      (result) => {
        if (isObject(resolvedValue) && !isFunction(resolvedValue) && !visited.has(resolvedValue)) {
          visited.add(resolvedValue)
          return reduce(
            (accumResult, child, childKdx) => {
              const newKeys = concat(keys, [childKdx])
              return recur(accumResult, child, newKeys, iteratee)
            },
            result,
            resolvedValue
          )
        }
        return result
      },
      (result) => iteratee(result, value, keys)
    )(accum)
  }
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
const walkReduceDepthFirst = curry((iteratee, accum, collection) =>
  walk(reduceWalkee(), iteratee, accum, collection, [])
)

export default walkReduceDepthFirst
