import always from './always'
import assocPath from './assocPath'
import castPath from './castPath'
import curry from './curry'
import isArray from './isArray'
import isFunction from './isFunction'
import isUndefined from './isUndefined'
import over from './over'

const assoc = curry((selector, value, collection) => {
  if (isUndefined(selector)) {
    return value
  }
  if (isFunction(selector)) {
    return over(selector, always(value), collection)
  }
  let parts = selector
  if (!isArray(selector)) {
    parts = castPath(selector, value)
  }
  return assocPath(parts, value, collection)
})

export default assoc
