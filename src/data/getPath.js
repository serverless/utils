import curry from './curry'
import getProp from './getProp'
import isUndefined from './isUndefined'

/**
 * Retrieve the value at a given path.
 *
 * @func
 * @category Object
 * @typedefn Idx = String | Int
 * @sig [Idx] -> {a} -> a | Undefined
 * @param {Array} path The path to use.
 * @param {Object} obj The object to retrieve the nested property from.
 * @return {*} The data at `path`.
 * @example
 *
 *      getPath(['a', 'b'], {a: {b: 2}}); //=> 2
 *      getPath(['a', 'b'], {c: {b: 2}}); //=> undefined
 */
const getPath = curry((path, obj) => {
  let val = obj
  let idx = 0
  while (idx < path.length) {
    val = getProp(path[idx], val)
    if (isUndefined(val)) {
      return val
    }
    idx += 1
  }
  return val
})

export default getPath
