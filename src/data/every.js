import isArrayLike from '../base/isArrayLike'
import curry from '../common/curry'
import defn from '../common/defn'
import everyAtIndex from './everyAtIndex'
import keys from './keys'

/**
 * Returns `true` if all elements of the list match the predicate, `false` if there are any that don't.
 *
 * Dispatches to the `every` method of the second argument, if present.
 *
 * Supports async predicates. If a predicate returns a Promise than the entire method will upgrade to async and return a Promise.
 *
 * @function
 * @since v0.0.6
 * @category data
 * @param {Function} fn The predicate function.
 * @param {*} collection The collection to consider.
 * @returns {boolean} `true` if the predicate is satisfied by every value, `false` otherwise.
 * @example
 *
 * const equals3 = equals(3)
 * every(equals3, [3, 3, 3, 3]) //=> true
 * every(equals3, [3, 3, 1, 3]) //=> false
 * every(equals3, { a: 3, b: 3, c: 3}) //=> true
 *
 * await every(async (value) => equals3(value), [3, 3, 3]) //=> true
 */
const every = curry(
  defn('every', (fn, collection) => {
    if (isArrayLike(collection)) {
      return everyAtIndex(fn, 0, collection)
    }
    return everyAtIndex((key) => fn(collection[key], key), 0, keys(collection))
  })
)

export default every
