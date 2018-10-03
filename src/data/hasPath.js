import curry from '../common/curry'
import getProp from './getProp'
import hasProp from './hasProp'

/**
 * Returns whether or not a path exists in an object. Only the object's
 * own properties are checked.
 *
 * @func
 * @since v0.0.3
 * @category data
 * @typedefn Idx = String | Int
 * @sig [Idx] -> {a} -> Boolean
 * @param {Array} path The path to use.
 * @param {Object} obj The object to check the path in.
 * @returns {Boolean} Whether the path exists.
 * @example
 *
 * hasPath(['a', 'b'], {a: {b: 2}})          // => true
 * hasPath(['a', 'b'], {a: {b: undefined}})  // => true
 * hasPath('a.b', {a: {c: 2}})               // => false
 * hasPath([], {})                           // => true
 */
const hasPath = curry((path, obj) => {
  if (path.length === 0) {
    return !!obj
  }
  let val = obj
  let idx = 0
  while (idx < path.length) {
    if (hasProp(path[idx], val)) {
      val = getProp(path[idx], val)
      idx += 1
    } else {
      return false
    }
  }
  return true
})

export default hasPath
