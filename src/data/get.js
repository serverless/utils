import curry from '../common/curry'
import defn from '../common/defn'
import castPath from './castPath'
import getPath from './getPath'
import isArray from './isArray'
import isFunction from './isFunction'
import isUndefined from './isUndefined'

const get = defn(
  'get',
  curry((selector, value) => {
    if (isUndefined(selector)) {
      return value
    }
    if (isFunction(selector)) {
      return selector(value)
    }
    let parts = selector
    if (!isArray(selector)) {
      parts = castPath(selector, value)
    }
    return getPath(parts, value)
  })
)

export default get
