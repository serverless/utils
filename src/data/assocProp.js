import curry from '../common/curry'
import always from './always'
import isFunction from './isFunction'
import isMap from './isMap'
import isUndefined from './isUndefined'
import over from './over'

/**
 * Returns the result of "setting" the portion of the given data structure
 * focused by the given lens to the given value.
 *
 * @func
 * @since v0.0.3
 * @category data
 * @sig String -> a -> {k: v} -> {k: v}
 * @param {String} prop The property name to set
 * @param {*} val The new value
 * @param {Object|Map} obj The object to clone
 * @returns {Object} A new object equivalent to the original except for the changed property.
 * @example
 *
 * assocProp('c', 3, {a: 1, b: 2}); //=> {a: 1, b: 2, c: 3}
 */
const assocProp = curry((prop, val, obj) => {
  if (isUndefined(prop)) {
    return val
  }
  if (isFunction(prop)) {
    return over(prop, always(val), obj)
  }
  if (isMap(obj)) {
    const result = new Map(obj.entries())
    return result.set(prop, val)
  }
  const result = {}
  for (const objProp in obj) {
    result[objProp] = obj[objProp]
  }
  result[prop] = val
  return result
})

export default assocProp
