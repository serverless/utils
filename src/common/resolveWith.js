import curry from './curry'
import isGenerator from '../lang/isGenerator'
import isOp from './isOp'
import isPromise from '../lang/isPromise'
import isResolved from './isResolved'
import resolve from './resolve'
import resolveToGeneratorWith from './resolveToGeneratorWith'

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
const resolveWith = curry((fn, value) => {
  if (!isResolved(value)) {
    if (isPromise(value)) {
      return value.then((resolved) => resolveWith(fn, resolved))
    }
    if (isGenerator(value) || isOp(value)) {
      return resolveToGeneratorWith(fn, value)
    }
    value = resolve(value)
  }
  value = fn(value)
  if (!isResolved(value)) {
    return resolve(value)
  }
  return value
})

export default resolveWith
