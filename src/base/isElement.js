import isObjectLike from './isObjectLike'
import isPlainObject from './isPlainObject'

/**
 * Checks if `value` is likely a DOM element.
 *
 * @function
 * @since 0.0.10
 * @category base
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
 * @example
 *
 * isElement(document.body)
 * // => true
 *
 * isElement('<body>')
 * // => false
 */
const isElement = (value) => {
  return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value)
}

export default isElement
