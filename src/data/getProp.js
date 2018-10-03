import curry from '../common/curry'
import isFunction from './isFunction'
import isNil from './isNil'
import isUndefined from './isUndefined'

/**
 * Returns a function that when supplied an object returns the indicated
 * property of that object, if it exists.
 *
 * @func
 * @since v0.0.3
 * @alias prop
 * @category data
 * @sig s -> {s: a} -> a | Undefined
 * @param {String} p The property name
 * @param {Object} obj The object to query
 * @returns {*} The value at `obj.p`.
 * @example
 *
 * getProp('x', {x: 100}); //=> 100
 * getProp('x', {});       //=> undefined
 */
const getProp = curry((prop, val) => {
  if (isUndefined(prop)) {
    return val
  }
  if (isFunction(prop)) {
    return prop(val)
  }
  if (isNil(val)) {
    return undefined
  }
  if (isFunction(val.get)) {
    return val.get(prop)
  }
  return val[prop]
})

export default getProp
