import isFunction from './isFunction'

/**
 * Checks whether the given value is a Promise.
 *
 * @function
 * @since v0.0.3
 * @category lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a Promise, else `false`.
 * @example
 *
 * isPromise(new Promise(() => {})) //=> true
 *
 * isPromise({}) //=> false
 *
 * isPromise({ then: () => {} }) //=> true
 */
const isPromise = (value) => value != null && isFunction(value.then)

export default isPromise
