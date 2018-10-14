import Promise from 'bluebird'
import isArray from '../data/isArray'
import isFunction from '../data/isFunction'
import isObject from '../data/isObject'

/**
 * Resolves all async values in an array or object
 *
 * @function
 * @since v0.0.6
 * @category common
 * @param {*} value The array or object whose values should be resolved. If value is not an object or array, the value is simply resolved to itself
 * @returns {*} The array or object with its values resolved
 * @example
 *
 * const nums = [
 *   1,
 *   Promise.resolve(2),
 *   (async () => 3)()
 * ]
 * await all(nums) //=> [ 1, 2, 3 ]
 *
 * const keyed = {
 *   a: 1,
 *   b: Promise.resolve(2),
 *   c: (async () => 3)()
 * }
 * await all(keyed) //=> { a: 1, b: 2, c: 3 }
 *
 * await all('abc') //=> 'abc'
 * await all(123) //=> 123
 */
const all = async (value) => {
  if (isArray(value)) {
    return Promise.all(value)
  } else if (isObject(value) && !isFunction(value)) {
    return Promise.props(value)
  }
  return value
}

export default all
