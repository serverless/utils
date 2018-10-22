import isFunction from '../base/isFunction'
import isNil from '../base/isNil'
import isUndefined from '../base/isUndefined'
import curry from '../common/curry'
import defn from '../common/defn'

/**
 * Returns a function that when supplied an object returns the indicated  property of that object, if it exists.
 *
 * @function
 * @since v0.0.3
 * @alias prop
 * @category data
 * @sig s -> {s: a} -> a | Undefined
 * @param {string|number|Function} prop The property name or property selector
 * @param {Object} value The value to query
 * @returns {*} The value at the given property
 * @example
 *
 * getProp('x', {x: 100}) //=> 100
 * getProp('x', {})       //=> undefined
 * getProp(undefined, {})  //=> {}
 * getProp(1, ['foo', 'bar'])  //=> 'bar'
 * getProp((value) => value[0], ['foo', 'bar'])  //=> 'foo'
 * getProp('foo', {
 *   foo: 'bar',
 *   get(prop) { return this[prop] }
 * }) //=> 'bar'
 */
const getProp = curry(
  defn('getProp', (prop, value) => {
    if (isUndefined(prop)) {
      return value
    }
    if (isFunction(prop)) {
      return prop(value)
    }
    if (isNil(value)) {
      return undefined
    }
    if (isFunction(value.get)) {
      return value.get(prop)
    }
    return value[prop]
  })
)

export default getProp
