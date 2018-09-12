import isArray from './isArray'
import isKey from './isKey'
import isString from './isString'
import stringToPath from './stringToPath'

const castPath = (value, object) => {
  if (isArray(value)) {
    return value
  }
  if (isKey(value, object) || !isString(value)) {
    return [value]
  }
  return stringToPath(value)
}

export default castPath
