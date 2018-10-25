import isArray from '../base/isArray'
import isFunction from '../base/isFunction'
import isMap from '../base/isMap'
import curry from '../common/curry'
import resolveWith from '../common/resolveWith'
import getProp from './getProp'
import keys from './keys'

/**
 * Returns an array of all the values of the given collection.
 *
 * Note that the order of the output array is not guaranteed across different JS platforms.
 *
 * Supports objects, Maps and array like values.
 *
 * This method supports Promise values. If given a Promise it will return a Promise that will resolve to the values of the resolved value of the Promise.
 *
 * Dispatches to the `values` method of the `collection` if present (except on `Map`). If a `Map` is received an array of the `Map`'s keys will be returned.
 *
 * @function
 * @since v0.0.12
 * @category data
 * @param {*} collection The collection to extract values from
 * @returns {Array<*>|Promise<Array<*>>} An array of the values of the `collection`
 * @example
 *
 * values({a: 1, b: 2, c: 3}) //=> [1, 2, 3]
 * values({}) //=> []
 *
 * values(['fi', 'fo', 'fum']) //=> [ 'fi', 'fo', 'fum' ]
 * values([]) //=> []
 *
 * values('abc') //=> ['a', 'b', 'c']
 * values('') //=> []
 *
 * await values(Promise.resolve({ a: 1, b: 2 }) //=> [1, 2]
 */
const values = curry(
  resolveWith((collection) => {
    if (isMap(collection)) {
      return Array.from(collection.values())
    }
    if (collection != null && !isArray(collection) && isFunction(collection.values)) {
      return collection.values()
    }
    const props = keys(collection)
    const { length } = props
    const vals = []
    let idx = 0
    while (idx < length) {
      vals[idx] = getProp(props[idx], collection)
      idx += 1
    }
    return vals
  })
)

export default values
