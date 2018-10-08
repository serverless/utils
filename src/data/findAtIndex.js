import curry from '../common/curry'
import defn from '../common/defn'
import isPromise from './isPromise'

/**
 * Returns the first element of the list which matches the predicate, or
 * `undefined` if no element matches starting at the given index.
 *
 * Dispatches to the `findAtIndex` method of the last argument, if present.
 *
 * Supports async predicates. If a predicate returns a Promise than the entire
 * method will upgrade to async and return a Promise.
 *
 * @func
 * @since v0.0.3
 * @category data
 * @sig (a -> Boolean) -> [a] -> a | undefined
 * @param {Function} fn The predicate function used to determine if the element is the
 *        desired one.
 * @param {Integer} index The index to start at.
 * @param {Array} list The array to consider.
 * @returns {*|Promise} The element found, or `undefined`.
 * @example
 *
 * const xs = [{a: 1}, {a: 2}, {a: 3}];
 * findAtIndex(propEq('a'), 0)(xs) //=> {a: 2}
 * findAtIndex(propEq('a', 2), 2)(xs) //=> undefined
 */
const findAtIndex = curry(
  defn('findAtIndex', (fn, index, list) => {
    const { length } = list
    let idx = index || 0

    // TODO BRN: abstract this while loop pattern and make it reusable
    while (idx < length) {
      const value = list[idx]
      const result = fn(list[idx], idx)
      if (isPromise(result)) {
        return result.then((resolvedResult) => {
          if (resolvedResult) {
            return value
          }
          return findAtIndex(fn, idx + 1, list)
        })
      } else if (result) {
        return value
      }
      idx += 1
    }
  })
)

export default findAtIndex
