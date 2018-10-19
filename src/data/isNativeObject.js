import getTag from './getTag'
import isObject from './isObject'
import isTypedArray from './isTypedArray'

/**
 * Checks if `value` is native JavaScript object instance.
 *
 * @function
 * @since 0.0.10
 * @category data
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native JS object instance
 * @example
 *
 * isNativeObject(new WeakSet())
 * // => true
 *
 * isNativeObject({})
 * // => false
 *
 * class MyObject {}
 * isNativeObject(new MyObject())
 * // => false
 */
const isNativeObject = (value) => {
  if (isObject(value)) {
    const tag = getTag(value)
    switch (tag) {
      case '[object Arguments]':
      case '[object Array]':
      case '[object ArrayBuffer]':
      case '[object AsyncFunction]':
      case '[object Boolean]':
      case '[object Buffer]':
      case '[object Date]':
      case '[object DOMException]':
      case '[object Error]':
      case '[object Function]':
      case '[object Generator]':
      case '[object GeneratorFunction]':
      case '[object Number]':
      case '[object Promise]':
      case '[object Proxy]':
      case '[object RegExp]':
      case '[object Set]':
      case '[object String]':
      case '[object Symbol]':
      case '[object WeakMap]':
      case '[object WeakSet]':
        return true
    }
    if (isTypedArray(value)) {
      return true
    }
  }
  return false
}

export default isNativeObject
