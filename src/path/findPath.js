import find from '../data/find'
import isString from '../data/isString'

/**
 * Finds the first path in the given args.
 *
 * @function
 * @since v0.0.3
 * @category path
 * @sig [String] -> {a} -> String
 * @param {...String} values The values to check.
 * @returns {String} The first value found that is a path.
 * @example
 *
 * findPath(null, 0, '/foo', '/bar') // => '/foo'
 */
const findPath = (...values) => find(isString)(values)

export default findPath
