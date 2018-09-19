/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @func
 * @since 0.3.0
 * @category data
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 *      isObjectLike({}) // => true
 *
 *      isObjectLike([1, 2, 3]) // => true
 *
 *      isObjectLike(Function) // => false
 *
 *      isObjectLike(null) // => false
 */
const isObjectLike = (value) => typeof value == 'object' && value !== null

export default isObjectLike
