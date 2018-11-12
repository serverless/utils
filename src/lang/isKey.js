import isSymbol from './isSymbol'

/** Used to match property names within property paths. */
const reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/
const reIsPlainProp = /^\w*$/

const isKey = (value, object) => {
  if (Array.isArray(value)) {
    return false
  }
  const type = typeof value
  if (type == 'number' || type == 'boolean' || value == null || isSymbol(value)) {
    return true
  }
  return (
    reIsPlainProp.test(value) ||
    !reIsDeepProp.test(value) ||
    (object != null && value in Object(object))
  )
}

export default isKey
