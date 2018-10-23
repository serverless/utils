import arrayLikeKeys from '../base/arrayLikeKeys'
import isArrayLike from '../base/isArrayLike'
import isFunction from '../base/isFunction'
import isMap from '../base/isMap'
import reflectOwnKeys from '../base/reflectOwnKeys'
import resolveWith from '../common/resolveWith'

/**
 * Returns the keys of the given collection in an Array.
 *
 * Supports objects, Maps and array like values. If given an array like value, the indexes will be returned in string form.
 *
 * This method supports Promise values. If given a Promise it will return a Promise that will resolve to the keys of the resolved value of the Promise.
 *
 * Dispatches to the `keys` method of the `collection` if present (except on Map). If a `Map` is received an array of the `Map`'s keys will be returned.
 *
 * @function
 * @since v0.0.3
 * @category data
 * @param {*} collection The collection to get the keys from
 * @returns {Array<string>|Promise<Array<string>>} The keys of the given collection
 * @example
 *
 * keys({ foo: 'bar', 'baz': 'bat', bim: 'bop' }) //=> ['foo', 'baz', 'bim']
 * keys({}) //=> []
 *
 * keys(['fi', 'fo', 'fum']) //=> [ '0', '1', '2' ]
 * keys([]) //=> []
 *
 * keys('abc') //=> ['0', '1', '2']
 * keys('') //=> []
 *
 * await keys(Promise.resolve({ a: 1, b: 2 }) //=> ['a', 'b']
 */
const keys = resolveWith((collection) => {
  if (isArrayLike(collection)) {
    return arrayLikeKeys(collection)
  }

  if (isMap(collection)) {
    return Array.from(collection.keys())
  }

  if (collection != null && isFunction(collection.keys)) {
    return collection.keys()
  }

  return reflectOwnKeys(collection)
})

export default keys
