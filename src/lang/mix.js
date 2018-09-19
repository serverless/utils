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
