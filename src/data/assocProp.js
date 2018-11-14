import allWith from '../common/allWith'
import always from './always'
import curry from '../common/curry'
import dispatchable from '../common/dispatchable'
import isFunction from '../lang/isFunction'
import isMap from '../lang/isMap'
import isUndefined from '../lang/isUndefined'
import objectIterator from '../lang/objectIterator'
import over from './over'

const baseAssocProp = (prop, value, object) => {
  if (isUndefined(prop)) {
    return value
  }
  if (isFunction(prop)) {
    return over(prop, always(value), object)
  }
  if (isMap(object)) {
    const result = new Map(object.entries())
    return result.set(prop, value)
  }
  const result = {}
  const iterator = objectIterator(object)
  let next = { done: false }
  while (!next.done) {
    next = iterator.next()
    if (!next.done) {
      result[next.key] = object[next.key]
    }
  }
  result[prop] = value
  return result
}

const dispatchableAssocProp = dispatchable('assocProp', baseAssocProp)

/**
 * Returns the result of "setting" the portion of the given data structure
 * focused by the given lens to the given value.
 *
 * @function
 * @since v0.0.3
 * @category data
 * @param {string} prop The property name to set
 * @param {*} value The new value
 * @param {Object|Map} object The object to clone
 * @returns {Object} A new object equivalent to the original except for the changed property.
 * @example
 *
 * assocProp('c', 3, {a: 1, b: 2}); //=> {a: 1, b: 2, c: 3}
 */
const assocProp = curry((prop, value, object) =>
  allWith(
    ([resolvedProp, resolvedObject]) => dispatchableAssocProp(resolvedProp, value, resolvedObject),
    [prop, object]
  )
)

export default assocProp

export { baseAssocProp, dispatchableAssocProp }
