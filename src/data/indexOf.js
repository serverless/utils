import { baseIndexOfAtIndex } from './indexOfAtIndex'
import curry from '../common/curry'
import defn from '../common/defn'

/**
 * Returns the position of the first occurrence of an item in an array, or -1 if the item is not included in the array. [`equals`](#equals) is used to determine equality.
 *
 * This method automatically upgrades to async if either of the parameters are a Promise
 *
 * @function
 * @since v0.0.18
 * @category data
 * @param {*} value The value to find.
 * @param {Array} list The list to search in.
 * @return {Number} the index of the value, or -1 if the value is not found.
 * @example
 *
 * indexOf(3, [1,2,3,4]) //=> 2
 * indexOf(10, [1,2,3,4]) //=> -1
 */
const indexOf = curry(defn('indexOf', (value, list) => baseIndexOfAtIndex(value, 0, list)))

export default indexOf
