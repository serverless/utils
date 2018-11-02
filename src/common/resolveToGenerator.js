import isFunction from '../base/isFunction'
import isGenerator from '../base/isGenerator'
import isResolved from './isResolved'

/**
 * Resolves a value to a generator using the generator to yield values.
 *
 * @function
 * @since 0.0.16
 * @category common
 * @param {*} value The value to resolve with the generator
 * @returns {Generator}
 * @example
 *
 * const generator = resolveToGenerator('foo')
 * generator.next() //=> { value: 'foo', done: true }
 */
const resolveToGenerator = function*(value) {
  if (!isResolved(value)) {
    let result
    if (isGenerator(value)) {
      result = yield* value
    } else if (isFunction(value.resolve)) {
      result = value.resolve()
    } else {
      result = yield value
    }
    return yield* resolveToGenerator(result)
  }
  return value
}

export default resolveToGenerator
