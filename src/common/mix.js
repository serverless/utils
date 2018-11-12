import arrayLikeReduce from '../lang/arrayLikeReduce'
import curry from './curry'
import isFunction from '../lang/isFunction'
import isPromise from '../lang/isPromise'
import reflectOwnKeys from '../lang/reflectOwnKeys'

const mixClass = (Class, SuperClass) => {
  if (!isFunction(Class)) {
    const NewClass = class extends SuperClass {}
    return arrayLikeReduce(reflectOwnKeys(Class), NewClass, (AccClass, methodName) => {
      if (methodName !== 'constructor') {
        AccClass.prototype[methodName] = Class[methodName]
      }
      return AccClass
    })
  }
  return Class
}

/**
 * Returns an object with a `with` method that can be used to mix the given class with mixins
 *
 * @function
 * @since v0.0.4
 * @category common
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
const mix = curry((SuperClass, ...args) => ({
  with: (...mixins) =>
    arrayLikeReduce(mixins, SuperClass, (SClass, mixin) => {
      let NewClass = mixin
      if (isFunction(mixin)) {
        NewClass = mixin(SClass, ...args)
      }
      if (isPromise(NewClass)) {
        return NewClass.then((resolved) => mixClass(resolved, SClass))
      }
      return mixClass(NewClass, SClass)
    })
}))

export default mix
