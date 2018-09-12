import curry from './curry'
import isFunction from './isFunction'
import isMap from './isMap'
import isNil from './isNil'
import isUndefined from './isUndefined'

const getProp = curry((prop, val) => {
  if (isUndefined(prop)) {
    return val
  }
  if (isFunction(prop)) {
    return prop(val)
  }
  if (isNil(val)) {
    return undefined
  }
  if (isMap(val)) {
    return val.get(prop)
  }
  return val[prop]
})

export default getProp
