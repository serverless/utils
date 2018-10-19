import curry from '../common/curry'
import hasProp from './hasProp'
import isArguments from './isArguments'

// cover IE < 9 keys issues
const hasEnumBug = !{ toString: null }.propertyIsEnumerable('toString')

const nonEnumerableProps = [
  'constructor',
  'valueOf',
  'isPrototypeOf',
  'toString',
  'propertyIsEnumerable',
  'hasOwnProperty',
  'toLocaleString'
]

// Safari bug
const hasArgsEnumBug = (function() {
  return arguments.propertyIsEnumerable('length')
})()

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
 * @category data
 * @param {Object} obj The object to extract properties from
 * @returns {Array} An array of the object's own properties.
 * @example
 *
 * objectKeys({a: 1, b: 2, c: 3}) //=> ['a', 'b', 'c']
 */
const objectKeys =
  typeof Object.keys === 'function' && !hasArgsEnumBug
    ? curry((obj) => {
        return Object(obj) !== obj ? [] : Object.keys(obj)
      })
    : curry((obj) => {
        if (Object(obj) !== obj) {
          return []
        }
        let prop
        let nIdx
        const ks = []
        const checkArgsLength = hasArgsEnumBug && isArguments(obj)
        for (prop in obj) {
          if (hasProp(prop, obj) && (!checkArgsLength || prop !== 'length')) {
            ks[ks.length] = prop
          }
        }
        if (hasEnumBug) {
          nIdx = nonEnumerableProps.length - 1
          while (nIdx >= 0) {
            prop = nonEnumerableProps[nIdx]
            if (hasProp(prop, obj) && !contains(ks, prop)) {
              ks[ks.length] = prop
            }
            nIdx -= 1
          }
        }
        return ks
      })

export default objectKeys
