import curry from '../common/curry'
import defn from '../common/defn'
import isArguments from '../lang/isArguments'
import isArray from '../lang/isArray'
import isArrayLike from '../lang/isArrayLike'
import isBuffer from '../lang/isBuffer'
import isPrototype from '../lang/isPrototype'
import isTypedArray from '../lang/isTypedArray'
import objectHasOwnProperty from '../lang/objectHasOwnProperty'
import objectKeys from '../lang/objectKeys'
import toStringTag from '../lang/toStringTag'

/**
 * Checks if `value` is an empty object, collection, map, or set.
 *
 * Objects are considered empty if they have no own enumerable string keyed
 * properties.
 *
 * Array-like values such as `arguments` objects, arrays, buffers, strings, or
 *
 * Similarly, maps and sets are considered empty if they have a `size` of `0`.
 *
 * Auto curried for placeholder support.
 *
 * @function
 * @since v0.0.3
 * @category logic
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
const isEmpty = curry(
  defn('isEmpty', (value) => {
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
    const tag = toStringTag(value)
    if (tag == '[object Map]' || tag == '[object Set]') {
      return !value.size
    }
    if (isPrototype(value)) {
      return !objectKeys(value).length
    }
    for (const key in value) {
      if (objectHasOwnProperty(value, key)) {
        return false
      }
    }
    return true
  })
)

export default isEmpty
