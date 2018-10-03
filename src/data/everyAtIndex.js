import curry from '../common/curry'
import defn from '../common/defn'
import errorUnexpectedType from './errors/errorUnexpectedType'
import isArrayLike from './isArrayLike'
import isPromise from './isPromise'

/**
 * Returns `true` if all elements of the list match the predicate starting at the given index, `false` otherwise.
 *
 * Dispatches to the `everyAtIndex` method of the list argument, if present.
 *
 * Supports async predicates. If a predicate returns a Promise than the entire method will upgrade to async and return a Promise.
 *
 * @func
 * @since v0.0.6
 * @category data
 * @param {Function} fn The predicate function.
 * @param {Integer} index The index to start at.
 * @param {Array} list The array to consider.
 * @returns {Boolean} `true` if the predicate is satisfied by at least one element, `false`  otherwise.
 * @example
 *
 * const lessThan0 = flip(lt)(0)
 * const lessThan2 = flip(lt)(2)
 * any(lessThan0)([1, 2]) //=> false
 * any(lessThan2)([1, 2]) //=> true
 */
const everyAtIndex = curry(
  defn('everyAtIndex', (fn, index, list) => {
    if (!isArrayLike(list)) {
      throw errorUnexpectedType('ArrayLike', list)
    }
    const { length } = list
    let idx = index || 0
    if (idx < 0) {
      idx = length + idx
    }
    if (idx < 0) {
      idx = 0
    }

    while (idx < length) {
      const result = fn(list[idx], idx)
      if (isPromise(result)) {
        return result.then((resolvedResult) => {
          if (!resolvedResult) {
            return false
          }
          return everyAtIndex(fn, idx + 1, list)
        })
      } else if (!result) {
        return false
      }
      idx += 1
    }
    return true
  })
)

export default everyAtIndex
