import curry from '../common/curry'
import defn from '../common/defn'

/**
 * Returns a partial copy of an object omitting the keys specified.
 *
 * @function
 * @since v0.0.6
 * @category data
 * @param {Array} names an array of String property names to omit from the new object
 * @param {Object} obj The object to copy from
 * @returns {Object} A new object with properties from `names` not on it.
 * @example
 *
 * omit(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}) //=> {b: 2, c: 3}
 */
const omit = curry(
  defn('omit', (names, obj) => {
    const result = {}
    const index = {}
    const { length } = names
    let idx = 0

    while (idx < length) {
      index[names[idx]] = 1
      idx += 1
    }

    for (const prop in obj) {
      if (!Object.prototype.hasOwnProperty.call(index, prop)) {
        result[prop] = obj[prop]
      }
    }
    return result
  })
)

export default omit
