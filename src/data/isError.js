import baseGetTag from './baseGetTag'
import isObjectLike from './isObjectLike'
import isPlainObject from './isPlainObject'

/**
 * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`, `SyntaxError`, `TypeError`, or `URIError` object.
 *
 * @since 0.0.10
 * @category data
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an error object, else `false`.
 * @example
 *
 * isError(new Error)
 * // => true
 *
 * isError(Error)
 * // => false
 */
const isError = (value) => {
  if (!isObjectLike(value)) {
    return false
  }
  const tag = baseGetTag(value)
  return (
    tag == '[object Error]' ||
    tag == '[object DOMException]' ||
    (typeof value.message == 'string' && typeof value.name == 'string' && !isPlainObject(value))
  )
}

export default isError
