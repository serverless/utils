import curry from '../common/curry'
import defn from '../common/defn'
import isArrayLike from './isArrayLike'

const shallowFlatten = (list, recur) => {
  const result = []
  const ilen = list.length
  let idx = 0
  while (idx < ilen) {
    if (isArrayLike(list[idx])) {
      const value = recur ? recur(list[idx], recur) : list[idx]
      let idxj = 0
      const jlen = value.length
      while (idxj < jlen) {
        result[result.length] = value[idxj]
        idxj += 1
      }
    } else {
      result[result.length] = list[idx]
    }
    idx += 1
  }
  return result
}

/**
 * Returns a new list by pulling every item out of it (and all its sub-arrays) and putting them in a new array, depth-first.
 *
 * @function
 * @since v0.0.10
 * @category data
 * @param {Array} list The array to consider.
 * @returns {Array} The flattened list.
 * @example
 *
 * flatten([1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]])
 * //=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
 */
const flatten = curry(defn('flatten', (list) => shallowFlatten(list, shallowFlatten)))

export default flatten
