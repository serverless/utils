import isArrayLike from '../base/isArrayLike'
import isPromise from '../base/isPromise'
import curry from '../common/curry'
import defn from '../common/defn'
import errorUnexpectedType from './errors/errorUnexpectedType'
import concat from './concat'

/**
 * Takes a predicate and a `Filterable`, and returns a new filterable of the same type containing the members of the given filterable which satisfy the given predicate starting from the given index. Filterable objects include plain objects or any object that has a filter method such as `Array`.
 *
 * Dispatches to the `filter` method of the second argument, if present.
 *
 * Supports async predicates. If a predicate returns a Promise than the entire method will upgrade to async and return a Promise.
 *
 * @function
 * @since v0.0.6
 * @category data
 * @param {Function} fn The predicate function.
 * @param {Integer} index The index to start at.
 * @param {Array} list The array to consider.
 * @returns {Array} The filtered list
 * @example
 *
 * const isEven = n => n % 2 === 0;
 *
 * filterAtIndex(isEven, 0, [1, 2, 3, 4]) //=> [2, 4]
 * filterAtIndex(isEven, 2, [1, 2, 3, 4]) //=> [4]
 *
 * await filter(async (value) => isEven(value), [1, 2, 3, 4]) //=> [2, 4]
 */
const filterAtIndex = curry(
  defn('filterAtIndex', (fn, index, list) => {
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

    const filtered = []
    while (idx < length) {
      const result = fn(list[idx], idx)
      if (isPromise(result)) {
        return result.then((resolvedResult) => {
          if (resolvedResult) {
            filtered.push(list[idx])
          }
          return concat(filtered, filterAtIndex(fn, idx + 1, list))
        })
      } else if (result) {
        filtered.push(list[idx])
      }
      idx += 1
    }
    return filtered
  })
)

export default filterAtIndex
