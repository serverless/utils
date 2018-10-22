import Promise from 'bluebird'
import isArray from '../base/isArray'
import isFunction from '../base/isFunction'
import isIterator from '../base/isIterator'
import isObject from '../base/isObject'
import isPromise from '../base/isPromise'
import iterate from '../data/iterate'

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
const all = (value) => {
  // TODO BRN: add support for more than one parameter
  // TODO BRN: add support for generators
  // TODO BRN: add support for async iterators
  let result
  if (isArray(value) || isIterator(value)) {
    result = []
  } else if (isObject(value) && !isFunction(value)) {
    result = {}
  } else {
    return value
  }
  let resolveAsync = false
  iterate((next) => {
    if (next.done) {
      return next
    }
    result[next.kdx] = next.value
    if (isPromise(next.value)) {
      resolveAsync = true
    }
  }, value)

  if (resolveAsync) {
    if (isArray(result)) {
      return Promise.all(result)
    } else if (isObject(result)) {
      return Promise.props(result)
    }
  }

  return value
}

export default all
