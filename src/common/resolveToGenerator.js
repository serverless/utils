import { baseIsResolved } from './isResolved'
import curry from './curry'
import isFunction from '../lang/isFunction'
import isGenerator from '../lang/isGenerator'

const baseResolveToGenerator = function*(value) {
  if (!baseIsResolved(value)) {
    let result
    if (isGenerator(value)) {
      result = yield* value
    } else if (isFunction(value.resolve)) {
      result = value.resolve()
    } else {
      result = yield value
    }
    return yield* baseResolveToGenerator(result)
  }
  return value
}

/**
 * Resolves a value to a generator using the generator to yield values.
 *
 * @function
 * @since v0.0.16
 * @category common
 * @param {*} value The value to resolve with the generator
 * @returns {Generator}
 * @example
 *
 * const generator = resolveToGenerator('foo')
 * generator.next() //=> { value: 'foo', done: true }
 */
const resolveToGenerator = curry(baseResolveToGenerator)

export default resolveToGenerator

export { baseResolveToGenerator }
