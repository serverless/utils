import isArray from '../base/isArray'
import isFunction from '../base/isFunction'
import isObject from '../base/isObject'
import nArySpread from './nArySpread'

/**
 * Defines a function that will invoke the named function if it exists on the last arg. If the method does not, all args are passed through to the default function.
 *
 * @function
 * @since v0.0.3
 * @category common
 * @sig defn(
 *   name: string,
 *   defaultFn: (*) => any
 * ): (...args: any[], last: any) => last[name] ? last[name](...args) : defaultFn(...args)
 * @param {string} name The name of the method to call if it exists
 * @param {Function} defaultFn The default function to execute if the named one does not exist on the last arg
 * @returns {Function} The wrapped function
 * @example
 *
 * const get = defn('get', (prop, value) => value[prop])
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
const defn = (name, defaultFn) => {
  const arity = defaultFn.length
  const override = function(...args) {
    if (args.length === 0) {
      return defaultFn.apply(this)
    }
    const obj = args[args.length - 1]
    if (!isArray(obj) && isObject(obj) && isFunction(obj[name]) && obj !== this) {
      return obj[name](...args)
    }
    return defaultFn.apply(this, args)
  }
  return nArySpread(arity, override)
}

export default defn
