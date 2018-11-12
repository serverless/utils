import allWith from '../common/allWith'
import always from './always'
import assocPath from './assocPath'
import castPath from './castPath'
import curry from '../common/curry'
import dispatchable from '../common/dispatchable'
import isArray from '../lang/isArray'
import isFunction from '../lang/isFunction'
import isUndefined from '../lang/isUndefined'
import over from './over'

const baseAssoc = (selector, value, collection) => {
  if (isUndefined(selector)) {
    return value
  }
  if (isFunction(selector)) {
    return over(selector, always(value), collection)
  }
  let parts = selector
  if (!isArray(selector)) {
    parts = castPath(selector, collection)
  }
  return assocPath(parts, value, collection)
}

const dispatchableAssoc = dispatchable('assoc', baseAssoc)

/**
 * Makes a shallow clone of an object, setting or overriding the specified property with the given value. Note that this copies and flattens prototype properties onto the new object as well. All non-primitive properties are copied by reference.
 *
 * Supports path based property selectors 'foo.bar' and functional selectors which performs an over on the entire collection and sets each matching selector to the given value.
 *
 * @function
 * @since v0.0.3
 * @category data
 * @sig String -> a -> {k: v} -> {k: v}
 * @param {Array | String | Function} selector The property path to set or functional selector
 * @param {*} value The new value
 * @param {*} collection The collection to clone and assign the new value
 * @returns {*} A new collection equivalent to the original except for the changed selector path.
 * @example
 *
 * assoc('c', 3, {a: 1, b: 2})          //=> {a: 1, b: 2, c: 3}
 * assoc('c.d', 3, {a: 1, b: 2})        //=> {a: 1, b: 2, c: { d: 3 }}
 * assoc([ 'c', 'd' ], 3, {a: 1, b: 2}) //=> {a: 1, b: 2, c: { d: 3 }}
 */
const assoc = curry((selector, value, collection) =>
  allWith(
    ([resolvedSelector, resolvedCollection]) =>
      dispatchableAssoc(resolvedSelector, value, resolvedCollection),
    [selector, collection]
  )
)

export default assoc

export { baseAssoc, dispatchableAssoc }
