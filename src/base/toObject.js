import isFunction from './isFunction'

/**
 * Converts `value` to a plain object flattening inherited enumerable string keyed properties of `value` to own properties of the plain object.
 *
 * @function
 * @since v0.0.9
 * @category data
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2
 * }
 *
 * Foo.prototype.c = 3
 *
 * assign({ 'a': 1 }, new Foo)
 * // => { 'a': 1, 'b': 2 }
 *
 * assign({ 'a': 1 }, toObject(new Foo))
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */
const toObject = (value) => {
  if (value != null && isFunction(value.toObject)) {
    return value.toObject()
  }
  value = Object(value)
  const result = {}
  for (const key in value) {
    result[key] = value[key]
  }
  return result
}

export default toObject
