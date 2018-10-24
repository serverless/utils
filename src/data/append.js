import isString from '../base/isString'
import curry from '../common/curry'
import defn from '../common/defn'
import concat from './concat'

/**
 * Returns a new list containing the contents of the given list, followed by the given value.
 *
 * @function
 * @since v0.0.3
 * @category data
 * @param {*} value The value to add to the end of the new list.
 * @param {Array|string} arrayLike The array like value of elements to add a new item to.
 * @return {Array|string} A new array or string containing the elements of the old list followed by `value`.
 * @example
 *
 * append('tests', ['write', 'more']) //=> ['write', 'more', 'tests']
 * append('tests', []) //=> ['tests']
 * append(['tests'], ['write', 'more']) //=> ['write', 'more', ['tests']]
 * append('tests', 'write more ') //=> 'write more tests'
 */
const append = curry(
  defn('append', (value, arrayLike) => {
    if (isString(arrayLike)) {
      return concat(arrayLike, value)
    }
    return concat(arrayLike, [value])
  })
)

export default append
