import isArray from '../base/isArray'
import isFunction from '../base/isFunction'
import isObject from '../base/isObject'
import nArySpread from './nArySpread'

/**
 * Returns a function that dispatches with different strategies based on the object in list position (last argument). If it is an array, executes [fn].
 *
 * Otherwise, it will default to executing [fn].
 *
 * @function
 * @since v0.0.6
 * @category common
 * @param {string} name The name of the method to call if it exists
 * @param {Function} fn The default function to execute if the named one does not exist on the last arg
 * @returns {Function} A function that dispatches on object in list position
 * @example
 * const get = dispatchable('get', (prop, value) => value[prop])
 * get('a', { a: 'foo' }) //=> 'foo'
 *
 * const obj = {
 *   props: {
 *     a: 'bar'
 *   }
 *   get: (prop) => obj.props[prop]
 * }
 * get('a', obj) //=> 'bar'
 */
const dispatchable = (name, fn) => {
  const arity = fn.length
  const override = function(...args) {
    if (args.length === 0) {
      return fn.apply(this)
    }
    const obj = args[args.length - 1]
    if (!isArray(obj) && isObject(obj) && isFunction(obj[name]) && obj !== this) {
      return obj[name](...args)
    }
    return fn.apply(this, args)
  }
  return nArySpread(arity, override)
}

export default dispatchable
