import curryN from '../common/curryN'
import isArray from '../lang/isArray'
import isKey from '../lang/isKey'
import isString from '../lang/isString'
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
