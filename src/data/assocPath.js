import { baseAssocIndex } from './assocIndex'
import { baseAssocProp } from './assocProp'
import allWith from '../common/allWith'
import curry from '../common/curry'
import dispatchable from '../common/dispatchable'
import has from './has'
import isArray from '../lang/isArray'
import isInteger from '../lang/isInteger'
import isNil from '../lang/isNil'

const baseAssocPath = (path, value, collection) => {
  if (path.length === 0) {
    return value
  }
  const [part] = path
  if (path.length > 1) {
    const nextCollection =
      !isNil(collection) && has(part, collection) ? collection[part] : isInteger(path[1]) ? [] : {}
    value = baseAssocPath(Array.prototype.slice.call(path, 1), value, nextCollection)
  }
  if (isInteger(part) && isArray(collection)) {
    return baseAssocIndex(part, value, collection)
  }
  return baseAssocProp(part, value, collection)
}

const dispatchableAssocPath = dispatchable('assocPath', baseAssocPath)

/**
 * Makes a shallow clone of an object, setting or overriding the nodes required
 * to create the given path, and placing the specific value at the tail end of
 * that path. Note that this copies and flattens prototype properties onto the
 * new object as well. All non-primitive properties are copied by reference.
 *
 * @function
 * @since v0.0.3
 * @category data
 * @param {Array} path The path to set
 * @param {*} value The new value
 * @param {*} collection The collection to clone
 * @returns {*} A new collection equivalent to the original except along the specified path.
 * @example
 *
 * assocPath(['a', 'b', 'c'], 42, {a: {b: {c: 0}}}) //=> {a: {b: {c: 42}}}
 *
 * // Any missing or non-object keys in path will be overridden
 * assocPath(['a', 0, 'c'], 42, {a: 5}) //=> {a: [{c: 42}]}
 */
const assocPath = curry((path, value, collection) =>
  allWith(
    ([resolvedPath, resolvedCollection]) =>
      dispatchableAssocPath(resolvedPath, value, resolvedCollection),
    [path, collection]
  )
)

export default assocPath

export { baseAssocPath, dispatchableAssocPath }
