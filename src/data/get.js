import curry from '../common/curry'
import defn from '../common/defn'
import castPath from './castPath'
import getPath from './getPath'
import isArray from './isArray'
import isFunction from './isFunction'
import isUndefined from './isUndefined'

/**
 * Retrieve the value at a given path.
 *
 * Paths can be defined by a string an array. The path parameter also accepts a function that will be used as a selector against the data.
 *
 *
 *
 * @function
 * @since v0.0.3
 * @category data
 * @param {Array|string|number|Function} path The path to use.
 * @param {Object} value The value to retrieve the nested property from.
 * @returns {*} The data at `path`.
 * @example
 *
 * getPath(['a', 'b'], {a: {b: 2}}); //=> 2
 * getPath(['a', 'b'], {c: {b: 2}}); //=> undefined
 */
const get = defn(
  'get',
  curry((selector, value) => {
    if (isUndefined(selector)) {
      return value
    }
    if (isFunction(selector)) {
      return selector(value)
    }
    let parts = selector
    if (!isArray(selector)) {
      parts = castPath(selector, value)
    }
    return getPath(parts, value)
  })
)

export default get
