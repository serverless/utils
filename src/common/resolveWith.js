import { baseIsOp } from './isOp'
import { baseIsResolved } from './isResolved'
import { baseResolve } from './resolve'
import { baseResolveToGeneratorWith } from './resolveToGeneratorWith'
import curry from './curry'
import isGenerator from '../lang/isGenerator'
import isPromise from '../lang/isPromise'

const baseResolveWith = (fn, value) => {
  if (!baseIsResolved(value)) {
    if (isPromise(value)) {
      return value.then((resolved) => baseResolveWith(fn, resolved))
    }
    if (isGenerator(value) || baseIsOp(value)) {
      return baseResolveToGeneratorWith(fn, value)
    }
    value = baseResolve(value)
  }
  value = fn(value)
  if (!baseIsResolved(value)) {
    return baseResolve(value)
  }
  return value
}

/**
 * Resolves a value to the given method.
 *
 * If the value to be resolved is a promise then this method will return a promise. The fn method will be triggered once the promise resolves.
 *
 * If the value to be resolved is a generator, this method will return a generator.
 *
 * @function
 * @since 0.0.11
 * @category common
 * @param {Function} fn The function to execute at the end of the resolution
 * @param {*} value The value to resolve with the generator
 * @returns {Generator}
 * @example
 *
 * await resolveWith(
 *   (resolvedValue) => 'bar' // resolvedValue == 'foo'
 *   Promise.resolve('foo')
 * ) //=> 'bar'
 *
 * resolveWith(
 *   (resolvedValue) => 'bar' // resolvedValue == 'foo'
 *   'foo'
 * ) //=> 'bar'
 */
const resolveWith = curry(baseResolveWith)

export default resolveWith

export { baseResolveWith }
