import { baseIsResolved } from './isResolved'
import { baseResolve } from './resolve'
import { baseResolveToGenerator } from './resolveToGenerator'
import curry from './curry'
import isGenerator from '../lang/isGenerator'

const baseResolveToGeneratorWith = function*(fn, value) {
  if (!baseIsResolved(value)) {
    value = baseResolve(value)
    let result
    if (isGenerator(value)) {
      result = yield* value
    } else {
      result = yield value
    }
    return yield* baseResolveToGeneratorWith(fn, result)
  }
  value = fn(value)
  if (!baseIsResolved(value)) {
    return yield* baseResolveToGenerator(value)
  }
  return value
}

/**
 * Resolves a value to a generator using the generator to yield values. When the generator is complete the fn method is executed with the final result.
 *
 * @function
 * @since v0.0.11
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
const resolveToGeneratorWith = curry(baseResolveToGeneratorWith)

export default resolveToGeneratorWith

export { baseResolveToGeneratorWith }
