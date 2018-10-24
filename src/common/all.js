import BdPromise from 'bluebird'
import isArray from '../base/isArray'
import isFunction from '../base/isFunction'
import isIterator from '../base/isIterator'
import isObject from '../base/isObject'
import isPromise from '../base/isPromise'
import iterate from '../data/iterate'
import curry from './curry'
import resolve from './resolve'
import resolveWith from './resolveWith'

/**
 * Resolves all async values in an array or object
 *
 * Auto curried for placeholder support.
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
const all = curry(
  resolveWith((value) => {
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

    // TODO BRN: This needs to be piped and returned in order to support generators and async iterators
    iterate((next) => {
      if (next.done) {
        return next
      }
      const nextValue = resolve(next.value)
      result[next.kdx] = nextValue
      if (isPromise(nextValue)) {
        resolveAsync = true
      }
    }, value)

    // TODO BRN: These methods won't resolve values after the promise has been resolved and won't resolve generators
    if (resolveAsync) {
      if (isArray(result)) {
        return Promise.all(result)
      } else if (isObject(result)) {
        return Promise.resolve(BdPromise.props(result))
      }
    }

    return value
  })
)

export default all
