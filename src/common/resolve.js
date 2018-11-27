import { baseIsResolved } from './isResolved'
import { baseResolveToGenerator } from './resolveToGenerator'
import curry from './curry'
import isFunction from '../lang/isFunction'
import isPromise from '../lang/isPromise'

const baseResolve = (value) => {
  if (!baseIsResolved(value)) {
    if (isFunction(value.resolve)) {
      return baseResolve(value.resolve())
    }
    if (isPromise(value)) {
      return value.then((resolved) => baseResolve(resolved))
    }
    return baseResolveToGenerator(value)
  }
  return value
}

/**
 * Resolves a value to its valueOf.
 *
 * Dispatches to the `resolve` method if it exists. If a resolve method returns a value that is also resolvable, this method will resolve that value as well.
 *
 * @function
 * @since v0.0.9
 * @category common
 * @sig [String] -> {a} -> String
 * @param {...String} values The values to check.
 * @returns {String} The first value found that is a path.
 * @example
 *
 * resolve('foo') // => 'foo'
 *
 * resolve({
 *  valueOf: () => 'bar'
 * }) //=> bar
 *
 * resolve({
 *  resolve: () => 'bar'
 * }) //=> bar
 *
 * resolve({
 *   resolve: () => ({
 *     valueOf: () => 'bar'
 *   })
 * }) //=> bar
 *
 * resolve({
 *   resolve: () => ({
 *     resolve: () => 'bar'
 *   })
 * }) //=> bar
 */
const resolve = curry(baseResolve)

export default resolve

export { baseResolve }
