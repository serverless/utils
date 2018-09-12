import curry from './curry'
import isFunction from './isFunction'
import isMap from './isMap'
import isNil from './isNil'
import isUndefined from './isUndefined'

const hasProp = curry((prop, val) => {
  if (isUndefined(prop)) {
    return !!val
  }
  if (isFunction(prop)) {
    try {
      return !!prop(val)
    } catch (error) {
      return false
    }
  }
  if (isNil(val)) {
    return false
  }
  if (isMap(val)) {
    return val.has(prop)
  }
  return Object.prototype.hasOwnProperty.call(val, prop)
})

export default hasProp
