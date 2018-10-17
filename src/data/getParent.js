import curry from '../common/curry'
import defn from '../common/defn'
import castPath from './castPath'
import getParentPath from './getParentPath'
import isArray from './isArray'
import isFunction from './isFunction'
import isUndefined from './isUndefined'

/**
 * Retrieve the parent value from a given path. The parent value is the value immediately before the last path part.
 *
 * Paths can be defined by a string an array. The path parameter also accepts a function that will be used as a selector against the data.
 *
 *
 *
 * @function
 * @since v0.0.10
 * @category data
 * @param {Array|string|number|Function} path The path to use.
 * @param {Object} value The value to retrieve the parent property value from.
 * @returns {*} The data at `path`.
 * @example
 *
 * getParent(['a', 'b'], {a: {b: 2}})
 * //=> {b: 2}
 *
 * getParent(['a', 'b'], {c: {b: 2}})
 * //=> undefined
 *
 * getParent('a', {a: {b: 2}})
 * //=> {a: {b: 2}}
 *
 * getParent('a.b', {a: {b: 2}})
 * //=> {b: 2}
 *
 * getParent('a[0]', {a: [ 1, 2 ]})
 * //=> [ 1, 2 ]
 */
const getParent = curry(
  defn('getParent', (selector, value) => {
    if (isUndefined(selector)) {
      return undefined // has no parent since there's no path parts
    }
    if (isFunction(selector)) {
      return selector(value)
    }
    let parts = selector
    if (!isArray(selector)) {
      parts = castPath(selector, value)
    }
    return getParentPath(parts, value)
  })
)

export default getParent
