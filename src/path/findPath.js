import isString from '../base/isString'
import curryN from '../common/curryN'
import find from '../data/find'

const findString = find(isString)

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
const findPath = curryN(1, (...values) => findString(values))

export default findPath
