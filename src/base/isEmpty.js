import getTag from './getTag'
import isArguments from './isArguments'
import isArray from './isArray'
import isArrayLike from './isArrayLike'
import isBuffer from './isBuffer'
import isPrototype from './isPrototype'
import isTypedArray from './isTypedArray'
import objectKeys from './objectKeys'

/** Used to check objects for own properties. */
const { hasOwnProperty } = Object.prototype

/**
 * Checks if `value` is an empty object, collection, map, or set.
 *
 * Objects are considered empty if they have no own enumerable string keyed
 * properties.
 *
 * Array-like values such as `arguments` objects, arrays, buffers, strings, or
 * jQuery-like collections are considered empty if they have a `length` of `0`.
 * Similarly, maps and sets are considered empty if they have a `size` of `0`.
 *
 * @function
 * @since v0.0.3
 * @category base
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
 * @example
 *
 * isEmpty(null) // => true
 *
 * isEmpty(true) // => true
 *
 * isEmpty(1) // => true
 *
 * isEmpty([1, 2, 3]) // => false
 *
 * isEmpty('abc') // => false
 *
 * isEmpty({ 'a': 1 })  // => false
 */
const isEmpty = (value) => {
  if (value == null) {
    return true
  }
  if (
    isArrayLike(value) &&
    (isArray(value) ||
      typeof value == 'string' ||
      typeof value.splice == 'function' ||
      isBuffer(value) ||
      isTypedArray(value) ||
      isArguments(value))
  ) {
    return !value.length
  }
  const tag = getTag(value)
  if (tag == '[object Map]' || tag == '[object Set]') {
    return !value.size
  }
  if (isPrototype(value)) {
    return !objectKeys(value).length
  }
  for (const key in value) {
    if (hasOwnProperty.call(value, key)) {
      return false
    }
  }
  return true
}

export default isEmpty
