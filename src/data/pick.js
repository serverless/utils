import curry from '../common/curry'
import defn from '../common/defn'

/**
 * Returns a partial copy of an object containing only the keys specified. If
 * the key does not exist, the property is ignored.
 *
 * Supports Promises. If a Promise is received for either parameter than the entire method will upgrade to async and return a Promise.
 *
 * @function
 * @since v0.0.6
 * @category data
 * @param {Array|Promise<Array>} names an array of String property names to copy onto a new object
 * @param {Object|Promise<Object>} object The object to copy from
 * @returns {Object|Promise<Object>} A new object with only properties from `names` on it.
 * @example
 *
 * pick(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}) //=> {a: 1, d: 4}
 * pick(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}) //=> {a: 1}
 * await pick(
 *   Promise.resolve(['a', 'd']),
 *   Promise.resolve({a: 1, b: 2, c: 3, d: 4})
 * ) //=> {a: 1, d: 4}
 */
const pick = curry(
  defn('pick', (names, object) => {
    const result = {}
    let idx = 0
    while (idx < names.length) {
      const name = names[idx]
      if (name in object) {
        result[name] = object[name]
      }
      idx += 1
    }
    return result
  })
)

export default pick
