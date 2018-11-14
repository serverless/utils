import { HAS_ARGS_ENUM_BUG, HAS_OBJECT_ENUM_BUG } from '../constants'
import isArguments from './isArguments'
import objectHasOwnProperty from './objectHasOwnProperty'

const nonEnumerableProps = [
  'constructor',
  'valueOf',
  'isPrototypeOf',
  'toString',
  'propertyIsEnumerable',
  'hasOwnProperty',
  'toLocaleString'
]

const contains = (list, item) => {
  let idx = 0
  while (idx < list.length) {
    if (list[idx] === item) {
      return true
    }
    idx += 1
  }
  return false
}

/**
 * Returns a list containing the names of all the enumerable own properties of the supplied object.
 * Note that the order of the output array is not guaranteed to be consistent across different JS platforms.
 *
 * @function
 * @since v0.0.11
 * @category lang
 * @param {Object} obj The object to extract properties from
 * @returns {Array} An array of the object's own properties.
 * @example
 *
 * objectKeys({a: 1, b: 2, c: 3}) //=> ['a', 'b', 'c']
 */
const objectKeys =
  typeof Object.keys === 'function' && !HAS_ARGS_ENUM_BUG
    ? (obj) => {
        return Object(obj) !== obj ? [] : Object.keys(obj)
      }
    : (obj) => {
        if (Object(obj) !== obj) {
          return []
        }
        let prop
        let nIdx
        const ks = []
        const checkArgsLength = HAS_ARGS_ENUM_BUG && isArguments(obj)
        for (prop in obj) {
          if (objectHasOwnProperty(obj, prop) && (!checkArgsLength || prop !== 'length')) {
            ks[ks.length] = prop
          }
        }
        if (HAS_OBJECT_ENUM_BUG) {
          nIdx = nonEnumerableProps.length - 1
          while (nIdx >= 0) {
            prop = nonEnumerableProps[nIdx]
            if (objectHasOwnProperty(obj, prop) && !contains(ks, prop)) {
              ks[ks.length] = prop
            }
            nIdx -= 1
          }
        }
        return ks
      }

export default objectKeys
