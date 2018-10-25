import isArrayLike from './isArrayLike'
import isString from './isString'

/**
 * Returns a shallow copy of a portion of an array into a new array object selected from begin to end (end not included). The original array will not be modified.
 *
 * @function
 * @since v0.0.13
 * @category base
 * @param {Array} arrayLike The array like value to slice values from
 * @param {number} start [=0] Zero-based index at which to begin extraction. A negative index will be treated as an offset from the end.
 * @param {number} end [=array.length] Zero-based index before which to end extraction. `arrayLikeSlice` extracts up to but not including end.
 * @returns {Array} A new array with the extraced values
 * @example
 *
 * arrayLikeSlice(['a', 'b', 'c'], 0, 2)
 * //=> ['a', 'b']
 */
const arrayLikeSlice = (arrayLike, start, end) => {
  if (!isArrayLike(arrayLike)) {
    throw new TypeError(
      `arrayLikeSlice method expected 'arrayLike' to be an array like value. Instead was received ${arrayLike}`
    )
  }
  let length = arrayLike == null ? 0 : arrayLike.length
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

  if (isString(arrayLike)) {
    return arrayLike.slice(start, end)
  }

  let index = -1
  const result = new Array(length)
  while (++index < length) {
    result[index] = arrayLike[index + start]
  }
  return result
}

export default arrayLikeSlice
