/**
 * Generate a start index with an offset where if the start is less than 0 it will return an offset from the length of `length + start`
 *
 * @function
 * @since v0.0.13
 * @category base
 * @param {number} start The start index
 * @param {number} length The length of the list
 * @returns {number} A starting index
 * @example
 *
 * indexEndOffset(0, 2)
 * // => 0
 *
 * indexEndOffset(3, 2)
 * // => 2
 *
 * indexEndOffset(-1, 3)
 * // => 2
 */
const indexEndOffset = (index, length) => {
  if (index < 0) {
    index = -index > length ? 0 : length + index
  }
  if (index >= length) {
    index = length
  }
  return index
}

export default indexEndOffset
