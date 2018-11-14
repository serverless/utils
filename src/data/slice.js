import arrayLikeSlice from '../lang/arrayLikeSlice'
import curry from '../common/curry'
import defn from '../common/defn'

/**
 * Creates a slice of `arrayLike` from `start` up to, but not including, `end`.
 *
 * **Note:** This method is used instead of
 * [`Array#slice`](https://mdn.io/Array/slice) to ensure dense arrays are returned.
 *
 * This method
 *
 * @function
 * @since v0.0.3
 * @category data
 * @param {number} [start=0] The start position. A negative index will be treated as an offset from the end.
 * @param {number} [end=array.length] The end position. A negative index will be treated as an offset from the end.
 * @param {Array|string} arrayLike The array like value to slice.
 * @returns {Array|string} Returns the slice of `arrayLike`.
 * @example
 *
 * const array = [1, 2, 3, 4]
 *
 * slice(2, Infinity, array)
 * // => [3, 4]
 *
 * const string = 'abcd'
 *
 * slice(0, 2, string)
 * // => 'ab'
 */
const slice = curry(defn('slice', (start, end, arrayLike) => arrayLikeSlice(arrayLike, start, end)))

export default slice
