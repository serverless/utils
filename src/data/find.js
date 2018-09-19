import curry from './curry'
import defn from './defn'
import findAtIndex from './findAtIndex'
import isArrayLike from './isArrayLike'
import keys from './keys'

/**
 * Returns the first element of the collection which matches the predicate, or
 * `undefined` if no element matches.
 *
 * Dispatches to the `find` method of the collection argument, if present.
 *
 * Supports async predicates. If a predicate returns a Promise than the entire
 * method will upgrade to async and return a Promise.
 *
 * @func
 * @since v0.0.3
 * @category data
 * @sig (a, b -> Boolean) -> [a] -> a | undefined
 * @param {Function} fn The predicate function used to determine if the element is the
 *        desired one.
 * @param {*} collection The collection to consider.
 * @returns {Object} The element found, or `undefined`.
 * @example
 *
 *      const xs = [{a: 1}, {a: 2}, {a: 3}];
 *      find(propEq('a', 2))(xs); //=> {a: 2}
 *      find(propEq('a', 4))(xs); //=> undefined
 */
const find = curry(
  defn('find', (fn, collection) => {
    if (isArrayLike(collection)) {
      return findAtIndex(fn, 0, collection)
    }
    return findAtIndex((key) => fn(collection[key], key), 0, keys(collection))
  })
)

export default find
