import always from './always'
import curry from './curry'
import isFunction from './isFunction'
import isUndefined from './isUndefined'
import over from './over'

/**
 * Returns the result of "setting" the portion of the given data structure
 * focused by the given lens to the given value.
 *
 * @func
 * @since v0.0.3
 * @category data
 * @param {number} index The index number to set
 * @param {*} val The new value
 * @param {Array} arr The array to clone
 * @returns {Array} A new array equivalent to the original except for the changed index.
 * @example
 *
 * assocIndex(1, 'c', ['a', 'b']) //=> ['a', 'c']
 */
const assocIndex = curry((index, val, arr) => {
  if (isUndefined(index)) {
    return val
  }
  if (isFunction(index)) {
    return over(index, always(val), arr)
  }
  const result = [...arr]
  result[index] = val
  return result
})

export default assocIndex
