import curry from './curry'
import isGenerator from '../lang/isGenerator'
import isResolved from './isResolved'
import resolve from './resolve'
import resolveToGenerator from './resolveToGenerator'

/**
 * Resolves a value to a generator using the generator to yield values. When the generator is complete the fn method is executed with the final result.
 *
 * @function
 * @since 0.0.11
 * @category common
 * @param {Function} fn The function to execute at the end of the generator's resolution
 * @param {*} value The value to resolve with the generator
 * @returns {Generator}
 * @example
 *
 * const generator = resolveToGeneratorWith(
 *   (resolvedValue) => //=> 'foo'
 *   'foo'
 * )
 * generator.next() //=> { done: true } triggers the fn method
 */
const resolveToGeneratorWith = curry(function*(fn, value) {
  if (!isResolved(value)) {
    value = resolve(value)
    let result
    if (isGenerator(value)) {
      result = yield* value
    } else {
      result = yield value
    }
    return yield* resolveToGeneratorWith(fn, result)
  }
  value = fn(value)
  if (!isResolved(value)) {
    return yield* resolveToGenerator(value)
  }
  return value
})

export default resolveToGeneratorWith
