import toStringTag from './toStringTag'

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @function
 * @since 0.0.3
 * @category lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
 * @example
 *
 * isString('abc') // => true
 *
 * isString(1) // => false
 */
const isString = (value) => {
  const type = typeof value
  return (
    type == 'string' ||
    (type == 'object' &&
      value != null &&
      !Array.isArray(value) &&
      toStringTag(value) == '[object String]')
  )
}

export default isString
