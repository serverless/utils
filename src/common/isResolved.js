import { baseIsOp } from './isOp'
import curry from './curry'
import isFunction from '../lang/isFunction'
import isGenerator from '../lang/isGenerator'
import isObject from '../lang/isObject'
import isPromise from '../lang/isPromise'

const baseIsResolved = (value) =>
  !isObject(value) ||
  !(isPromise(value) || isFunction(value.resolve) || isGenerator(value) || baseIsOp(value))

/**
 * Determines if the value is a resolvable value.
 *
 * @function
 * @since 0.0.11
 * @category common
 * @param {*} value
 * @returns {boolean}
 * @example
 *
 * isResolved({
 *   ['@@redux-saga/IO']: 'op'
 * })
 * //=> false
 *
 * isResolved((function* () {})())
 * //=> false
 *
 * isResolved(new Promise(() => {})))
 * //=> false
 *
 * isResolved({ resolve: () => 'foo' })
 * //=> false
 *
 * isResolved(null)
 * //=> true
 *
 * isResolved(undefined)
 * //=> true
 *
 * isResolved('abc')
 * //=> true
 */
const isResolved = curry(baseIsResolved)

export default isResolved

export { baseIsResolved }
