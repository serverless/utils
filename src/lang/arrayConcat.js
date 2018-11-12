import isArray from './isArray'

/**
 * Concat an array with two or more arrays. This method does not change the existing arrays, but instead returns a new array.
 *
 * @function
 * @since v0.0.13
 * @category lang
 * @param {Array} array The array concat with the given values
 * @param {...*} values The values to concat to the array
 * @returns {Array} A new array with the values concatenated
 * @example
 *
 * arrayConcat(['a', 'b', 'c'], [1, 2, 3])
 * //=> ['a', 'b', 'c', 1, 2, 3]
 *
 * arrayConcat([1, 2, 3], [4, 5, 6], [7, 8, 9])
 * //=> [1, 2, 3, 4, 5, 6, 7, 8, 9]
 *
 * arrayConcat(['a', 'b', 'c'], 1, [2, 3])
 * //=> ['a', 'b', 'c', 1, 2, 3]
 */
const arrayConcat = (array, ...values) => {
  if (!isArray(array)) {
    throw new TypeError(
      `arrayConcat method expected 'array' to be an Array. Instead it received ${array}`
    )
  }
  return array.concat(...values)
}

export default arrayConcat
