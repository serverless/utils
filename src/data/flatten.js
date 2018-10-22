import isArrayLike from '../base/isArrayLike'
import isString from '../base/isString'
import curry from '../common/curry'
import defn from '../common/defn'
import resolveWith from '../common/resolveWith'

const shallowFlatten = (list, recur) => {
  const result = []
  const ilen = list.length
  let idx = 0
  while (idx < ilen) {
    const item = list[idx]
    if (isArrayLike(item) && !isString(item) && list !== item) {
      const value = recur ? recur(item, recur) : item
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
 * This method automatically upgrades to async. If a Promise is given as the list this method will resolve the promise as the list and return a Promise that resolves to the flattened list.
 *
 * @function
 * @since v0.0.10
 * @category data
 * @param {Array|Promise<Array>} list The array to consider.
 * @returns {Array|Promise<Array>} The flattened list.
 * @example
 *
 * flatten([1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]])
 * //=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
 */
const flatten = curry(defn('flatten', resolveWith((list) => shallowFlatten(list, shallowFlatten))))

export default flatten
