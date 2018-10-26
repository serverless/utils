import isFunction from '../base/isFunction'
import curry from '../common/curry'
import defn from '../common/defn'

/**
 * Returns a string made by inserting the `separator` between each element and
 * concatenating all the elements into a single string.
 *
 * Supports Promises. If a Promise is received for either parameter than the entire method will upgrade to async and return a Promise.
 *
 * @function
 * @since v0.0.6
 * @category data
 * @param {number|string|Promise<number|string>} separator The string used to separate the elements.
 * @param {Array|Promise<Array>} list The list of elements to join into a string.
 * @returns {string|Promise<string>} The string made by concatenating `list` with `separator`.
 * @example
 *
 * const spacer = join(' ')
 * spacer(['a', 2, 3.4])   //=> 'a 2 3.4'
 * join('|', [1, 2, 3])    //=> '1|2|3'
 * await join(Promise.resolve('|'), Promise.resolve([1, 2, 3]))    //=> '1|2|3'
 */
const join = curry(
  defn('join', (seperator, list) => {
    if (list != null && isFunction(list.join)) {
      return list.join(seperator)
    }
    throw new TypeError(`${toString(list)} does not have a method named 'join'`)
  })
)

export default join
