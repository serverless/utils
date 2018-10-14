import isFunction from '../data/isFunction'
import isPromise from '../data/isPromise'
import reduce from '../data/reduce'
import reduceObjIndexed from '../data/reduceObjIndexed'

const mixClass = (Class, SuperClass) => {
  if (!isFunction(Class)) {
    const NewClass = class extends SuperClass {}
    return reduceObjIndexed(
      (AccClass, method, methodName) => {
        if (methodName !== 'constructor') {
          AccClass.prototype[methodName] = method
        }
        return AccClass
      },
      NewClass,
      Class
    )
  }
  return Class
}

/**
 * Returns an object with a `with` method that can be used to mix the given class with mixins
 *
 * @function
 * @since v0.0.4
 * @category lang
 * @param {class} SuperClass The class that you want the mixins to extend
 * @param {...*} args Additional arguments to pass to the mixin
 * @returns {{
 *   with: (
 *     ...mixins: (SuperClass: class, ...args: *) => class
 *   ) => class
 * }}
 * @example
 *
 * const mixin = (SuperClass, ...args) => class extends SuperClass { ... }
 * class mix(Parent, ...args).with(mixin) { ... }
 */
const mix = (SuperClass, ...args) => ({
  with: (...mixins) =>
    reduce(
      (Class, mixin) => {
        let NewClass = mixin
        if (isFunction(mixin)) {
          NewClass = mixin(Class, ...args)
        }
        if (isPromise(NewClass)) {
          return NewClass.then((resolved) => mixClass(resolved, Class))
        }
        return mixClass(NewClass, Class)
      },
      SuperClass,
      mixins
    )
})

export default mix
