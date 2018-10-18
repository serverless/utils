import curry from '../common/curry'
import defn from '../common/defn'
import compact from './compact'
import getPath from './getPath'
import init from './init'
import isEmpty from './isEmpty'

/**
 * Retrieve the parent value from a given path. The parent value is the value immediately before the last path part.
 *
 *
 * @function
 * @since v0.0.10
 * @category data
 * @param {Array} path The path to use.
 * @param {*} value The value to retrieve the nested property from.
 * @returns {*} The data at `path`.
 * @example
 *
 * getParentPath(['a', 'b'], {a: {b: 2}}); //=> {b: 2}
 * getParentPath(['a', 'b'], {c: {b: 2}}); //=> undefined
 */
const getParentPath = curry(
  defn('getParentPath', (path, value) => {
    const pathParts = compact(path)
    if (isEmpty(pathParts)) {
      return undefined
    }
    return getPath(init(pathParts), value)
  })
)

export default getParentPath
