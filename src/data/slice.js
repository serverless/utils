import curry from './curry'
import defn from './defn'

/**
 * Creates a slice of `array` from `start` up to, but not including, `end`.
 *
 * **Note:** This method is used instead of
 * [`Array#slice`](https://mdn.io/Array/slice) to ensure dense arrays are
 * returned.
 *
 * @func
 * @since v0.0.3
 * @category data
 * @param {number} [start=0] The start position. A negative index will be treated as an offset from the end.
 * @param {number} [end=array.length] The end position. A negative index will be treated as an offset from the end.
 * @param {Array} array The array to slice.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * const array = [1, 2, 3, 4]
 *
 * slice(2, Infinity, array)
 * // => [3, 4]
 */
const slice = curry(
  defn('slice', (start, end, array) => {
    let length = array == null ? 0 : array.length
    if (!length) {
      return []
    }
    start = start == null ? 0 : start
    end = end === undefined ? length : end

    if (start < 0) {
      start = -start > length ? 0 : length + start
    }
    end = end > length ? length : end
    if (end < 0) {
      end += length
    }
    length = start > end ? 0 : (end - start) >>> 0
    start >>>= 0

    let index = -1
    const result = new Array(length)
    while (++index < length) {
      result[index] = array[index + start]
    }
    return result
  })
)

export default slice
