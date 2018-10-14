const symIterator = typeof Symbol !== 'undefined' ? Symbol.iterator : '@@iterator'

/**
 * Checks if `value` implements the iterator symbol
 *
 * @function
 * @since v0.0.3
 * @category data
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is iterable, else `false`.
 * @example
 *
 * isIterable(new Map) //=> true
 *
 * isIterable({}) //=> false
 *
 * isIterable([]) //=> true
 */
const isIterable = (value) => value != null && value[symIterator] != null

export default isIterable
