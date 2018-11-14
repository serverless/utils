import baseGetTag from './baseGetTag'
import isObject from './isObject'

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @function
 * @since v0.0.3
 * @category lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * isFunction(function() {}) // => true
 *
 * isFunction(/abc/) // => false
 */
const isFunction = (value) => {
  if (!isObject(value)) {
    return false
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  const tag = baseGetTag(value)
  return (
    tag == '[object Function]' ||
    tag == '[object AsyncFunction]' ||
    tag == '[object GeneratorFunction]' ||
    tag == '[object Proxy]'
  )
}

export default isFunction
