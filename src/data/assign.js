import curryN from '../common/curryN'
import isFunction from './isFunction'

/**
 * The assign() method is used to copy the values of all enumerable own properties from one or more source objects to a target object. It will return the target object.
 *
 * Dispatches to the `assign` method of the first parameter if it exists.
 *
 * This method is auto curried to 2 args.
 *
 * @func
 * @since v0.0.9
 * @category data
 * @param {Object} target The target object.
 * @param {...Object} sources The source object(s).
 * @returns {Object} The target object
 * @example
 *
 * const  o1 = { a: 1, b: 1, c: 1 }
 * const o2 = { b: 2, c: 2 }
 * const o3 = { c: 3 }
 *
 * assign({}, o1, o2, o3)  //=> { a: 1, b: 2, c: 3 }
 */
const assign = curryN(2, (target, ...sources) => {
  if (!!target && isFunction(target.assign)) {
    return target.assign(...sources)
  }
  return Object.assign(target, ...sources)
})

export default assign
