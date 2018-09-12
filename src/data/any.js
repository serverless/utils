import anyAtIndex from './anyAtIndex'
import curry from './curry'
import defn from './defn'
import isArrayLike from './isArrayLike'
import keys from './keys'

/**
 * Returns `true` if at least one of elements of the collection match the predicate,
 * `false` otherwise.
 *
 * Dispatches to the `any` method of the collection argument, if present.
 *
 * Supports async predicates. If a predicate returns a Promise than the entire
 * method will upgrade to async and return a Promise.
 *
 * @func
 * @category Collection
 * @sig (a -> Boolean) -> [a] -> Boolean
 * @param {Function} fn The predicate function.
 * @param {*} collection The collection to consider.
 * @return {Boolean} `true` if the predicate is satisfied by at least one element, `false`
 *         otherwise.
 * @example
 *
 *      const lessThan0 = flip(lt)(0)
 *      const lessThan2 = flip(lt)(2)
 *      any(lessThan0)([1, 2]) //=> false
 *      any(lessThan2)([1, 2]) //=> true
 */
const any = curry(
  defn('any', (fn, collection) => {
    if (isArrayLike(collection)) {
      return anyAtIndex(fn, 0, collection)
    }
    return anyAtIndex((key) => fn(collection[key], key), 0, keys(collection))
  })
)

export default any
