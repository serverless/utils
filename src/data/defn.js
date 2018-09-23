import isArray from './isArray'
import isFunction from './isFunction'
import isObject from './isObject'
import nAry from './nAry'

const defn = (name, defaultFn, arity = defaultFn.length) => {
  let override = function(...args) {
    if (args.length === 0) {
      return defaultFn.apply(this)
    }
    const obj = args[args.length - 1]
    if (!isArray(obj) && isObject(obj) && isFunction(obj[name]) && obj !== this) {
      return obj[name](...args)
    }
    return defaultFn.apply(this, args)
  }
  if (arity) {
    override = nAry(arity, override)
  }
  return override
}

export default defn
