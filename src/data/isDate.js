import baseGetTag from './baseGetTag'
import isObjectLike from './isObjectLike'
import nodeTypes from './nodeTypes'

/* Node.js helper references. */
const nodeIsDate = nodeTypes && nodeTypes.isDate

/**
 * Checks if `value` is classified as a `Date` object.
 *
 * @function
 * @since 0.0.10
 * @category data
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a date object, else `false`.
 * @example
 *
 * isDate(new Date)
 * // => true
 *
 * isDate('Mon April 23 2012')
 * // => false
 */
const isDate = nodeIsDate
  ? (value) => nodeIsDate(value)
  : (value) => isObjectLike(value) && baseGetTag(value) == '[object Date]'

export default isDate
