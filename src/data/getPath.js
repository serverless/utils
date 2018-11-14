import compact from './compact'
import curry from '../common/curry'
import defn from '../common/defn'
import getProp from './getProp'
import isArray from '../lang/isArray'
import isUndefined from '../lang/isUndefined'

/**
 * Retrieve the value at a given path.
 *
 * @function
 * @since v0.0.3
 * @category data
 * @typedefn Idx = String | Int
 * @sig [Idx] -> {a} -> a | Undefined
 * @param {Array} path The path to use.
 * @param {Object} obj The object to retrieve the nested property from.
 * @returns {*} The data at `path`.
 * @example
 *
 * getPath(['a', 'b'], {a: {b: 2}}); //=> 2
 * getPath(['a', 'b'], {c: {b: 2}}); //=> undefined
 */
const getPath = curry(
  defn('getPath', (path, obj) => {
    if (!isArray(path)) {
      throw new TypeError(`getPath expected path to be an Array. Instead received ${path}`)
    }
    const pathParts = compact(path)
    let val = obj
    let idx = 0
    while (idx < pathParts.length) {
      val = getProp(pathParts[idx], val)
      if (isUndefined(val)) {
        return val
      }
      idx += 1
    }
    return val
  })
)

export default getPath
