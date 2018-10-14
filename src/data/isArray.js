/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @function
 * @since 0.0.3
 * @category data
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * isArray([1, 2, 3]) // => true
 *
 * isArray(document.body.children) // => false
 *
 * isArray('abc') // => false
 *
 * isArray(noop) // => false
 */
const isArray = (value) => Array.isArray(value)

export default isArray
