import arrayFlatten from '../lang/arrayFlatten'
import curry from '../common/curry'
import defn from '../common/defn'

/**
 * Returns a new list by pulling every item out of it (and all its sub-arrays) and putting them in a new array, depth-first.
 *
 * This method automatically upgrades to async. If a Promise is given as the list this method will resolve the promise as the list and return a Promise that resolves to the flattened list.
 *
 * @function
 * @since v0.0.10
 * @category data
 * @param {Array|Promise<Array>} array The array to consider.
 * @returns {Array|Promise<Array>} The flattened array.
 * @example
 *
 * flatten([1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]])
 * //=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
 */
const flatten = curry(defn('flatten', arrayFlatten))

export default flatten
