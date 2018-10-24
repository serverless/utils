import isString from '../base/isString'
import curry from '../common/curry'
import defn from '../common/defn'
import concat from './concat'

/**
 * Returns a new list with the given element at the front, followed by the contents of the list.
 *
 * @function
 * @since v0.0.3
 * @category data
 * @param {*} value The value to add to the end of the new list.
 * @param {Array|string} arrayLike The array like value of elements to prepend a new item to.
 * @return {Array|string} A new array or string containing the elements of the old list prepended with `value`.
 * @example
 *
 * prepend('write', ['more', 'tests']) //=> ['write', 'more', 'tests']
 * prepend('write', []) //=> ['write']
 * prepend(['write'], ['more', 'tests']) //=> ['write', 'more', ['tests']]
 * prepend('write', ' more tests') //=> 'write more tests'
 */
const prepend = curry(
  defn('prepend', (value, arrayLike) => {
    if (isString(arrayLike)) {
      return concat(value, arrayLike)
    }
    return concat([value], arrayLike)
  })
)

export default prepend
