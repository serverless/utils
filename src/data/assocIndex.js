import allWith from '../common/allWith'
import always from './always'
import curry from '../common/curry'
import dispatchable from '../common/dispatchable'
import isFunction from '../lang/isFunction'
import isUndefined from '../lang/isUndefined'
import over from './over'

const baseAssocIndex = (index, val, arr) => {
  if (isUndefined(index)) {
    return val
  }
  if (isFunction(index)) {
    return over(index, always(val), arr)
  }
  const result = [...arr]
  result[index] = val
  return result
}

const dispatchableAssocIndex = dispatchable('assocIndex', baseAssocIndex)

/**
 * Returns the result of "setting" the portion of the given data structure
 * focused by the given lens to the given value.
 *
 * @function
 * @since v0.0.3
 * @category data
 * @param {number} index The index number to set
 * @param {*} value The new value
 * @param {Array} array The array to clone
 * @returns {Array} A new array equivalent to the original except for the changed index.
 * @example
 *
 * assocIndex(1, 'c', ['a', 'b']) //=> ['a', 'c']
 */
const assocIndex = curry((index, value, array) =>
  allWith(
    ([resolvedIndex, resolvedArray]) => dispatchableAssocIndex(resolvedIndex, value, resolvedArray),
    [index, array]
  )
)

export default assocIndex

export { baseAssocIndex, dispatchableAssocIndex }
