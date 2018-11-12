import isFunction from './isFunction'

/**
 * Checks whether the given value is a generator.
 *
 * @function
 * @since v0.0.3
 * @category lang
 * @param  {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a generator, else `false`.
 * @example
 *
 * isGenerator((function*() {})())  //=> true
 *
 * isGenerator((function() {})())   //=> false
 *
 * isGenerator({
 *   next: () => {},
 *   throw: () => {}
 * })  //=> true
 */
const isGenerator = (value) => value && isFunction(value.next) && isFunction(value.throw)

export default isGenerator
