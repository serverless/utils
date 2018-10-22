import baseGetTag from './baseGetTag'
import isObjectLike from './isObjectLike'

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @function
 * @since v0.0.3
 * @category base
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1
 * }
 *
 * isPlainObject(new Foo) // => false
 *
 * isPlainObject([1, 2, 3]) // => false
 *
 * isPlainObject({ 'x': 0, 'y': 0 }) // => true
 *
 * isPlainObject(Object.create(null)) // => true
 */
const isPlainObject = (value) => {
  if (!isObjectLike(value) || baseGetTag(value) != '[object Object]') {
    return false
  }
  if (Object.getPrototypeOf(value) === null) {
    return true
  }
  let proto = value
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto)
  }
  return Object.getPrototypeOf(value) === proto
}

export default isPlainObject
