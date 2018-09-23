import isFunction from './isFunction'

/**
 * Checks whether the given value is a generator.
 *
 * @func
 * @since v0.0.3
 * @category data
 * @param  {*}  value
 * @returns {Boolean}
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
