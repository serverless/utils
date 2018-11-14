import castPath from './castPath'
import curry from '../common/curry'
import defn from '../common/defn'
import hasPath from './hasPath'
import isArray from '../lang/isArray'
import isUndefined from '../lang/isUndefined'

/**
 * Returns whether or not a path exists in an object. Only the object's
 * own properties are checked.
 *
 * @function
 * @since v0.0.3
 * @category data
 * @typedefn Idx = String | Int
 * @sig [Idx] -> {a} -> Boolean
 * @param {Array|String} selector The selector to use.
 * @param {Object} value The value to check the path in.
 * @return {Boolean} Whether the selector exists.
 * @example
 *
 * has(['a', 'b'], {a: {b: 2}})          // => true
 * has(['a', 'b'], {a: {b: undefined}})  // => true
 * has('a.b', {a: {c: 2}})               // => false
 * has([], {})                           // => true
 */
const has = curry(
  defn('has', (selector, value) => {
    if (isUndefined(selector)) {
      return !!value
    }
    let parts = selector
    if (!isArray(selector)) {
      parts = castPath(selector, value)
    }
    return hasPath(parts, value)
  })
)

export default has
