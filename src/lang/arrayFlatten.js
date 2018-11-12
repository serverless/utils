import isArray from './isArray'

const shallowFlatten = (list, recur) => {
  const result = []
  const ilen = list.length
  let idx = 0
  while (idx < ilen) {
    const item = list[idx]
    if (isArray(item) && list !== item) {
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
 * Returns a new array by pulling every item out of it (and all its sub-arrays) and putting them in a new array, depth-first.
 *
 * @function
 * @since v0.0.13
 * @category lang
 * @param {Array} array The array to consider.
 * @returns {Array} The flattened list.
 * @example
 *
 * arrayFlatten([1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]])
 * //=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
 */
const arrayFlatten = (array) => {
  if (!isArray(array)) {
    throw new TypeError(
      `arrayFlatten method expected 'array' to be an Array. Instead it received ${array}`
    )
  }
  return shallowFlatten(array, shallowFlatten)
}

export default arrayFlatten
