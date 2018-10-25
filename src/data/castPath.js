import isArray from '../base/isArray'
import isKey from '../base/isKey'
import isString from '../base/isString'
import curryN from '../common/curryN'
import stringToPath from './stringToPath'

const castPath = curryN(1, (value, object = {}) => {
  if (isArray(value)) {
    return value
  }
  if (isKey(value, object) || !isString(value)) {
    return [value]
  }
  return stringToPath(value)
})

export default castPath
