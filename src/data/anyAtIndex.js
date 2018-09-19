import curry from './curry'
import defn from './defn'
import isPromise from './isPromise'

/**
 * Returns `true` if at least one of elements of the list match the predicate
 * starting at the given index, `false` otherwise.
 *
 * Dispatches to the `anyAtIndex` method of the list argument, if present.
 *
 * Supports async predicates. If a predicate returns a Promise than the entire
 * method will upgrade to async and return a Promise.
 *
 * @func
 * @since v0.0.3
 * @category data
 * @sig (a -> Boolean) -> [a] -> Boolean
 * @param {Function} fn The predicate function.
 * @param {Integer} index The index to start at.
 * @param {Array} list The array to consider.
 * @returns {Boolean} `true` if the predicate is satisfied by at least one element, `false`
 *         otherwise.
 * @example
 *
 * const lessThan0 = flip(lt)(0)
 * const lessThan2 = flip(lt)(2)
 * any(lessThan0)([1, 2]) //=> false
 * any(lessThan2)([1, 2]) //=> true
 */
const anyAtIndex = curry(
  defn('anyAtIndex', (fn, index, list) => {
    const { length } = list
    let idx = index || 0
    while (idx < length) {
      const result = fn(list[idx], idx)
      if (isPromise(result)) {
        return result.then((resolvedResult) => {
          if (resolvedResult) {
            return true
          }
          return anyAtIndex(fn, idx + 1, list)
        })
      } else if (result) {
        return true
      }
      idx += 1
    }
    return false
  })
)

export default anyAtIndex
