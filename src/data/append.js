import curry from '../common/curry'
import defn from '../common/defn'
import concat from './concat'
import isString from './isString'

/**
 * Returns a new list containing the contents of the given list, followed by
 * the given element.
 *
 * @func
 * @since v0.0.3
 * @category data
 * @param {*} value The value to add to the end of the new list.
 * @param {Array} list The list of elements to add a new item to. list.
 * @return {Array} A new list containing the elements of the old list followed by `value`.
 * @example
 *
 * append('tests', ['write', 'more']) //=> ['write', 'more', 'tests']
 * append('tests', []) //=> ['tests']
 * append(['tests'], ['write', 'more']) //=> ['write', 'more', ['tests']]
 */
const append = curry(
  defn('append', (value, list) => {
    if (isString(list)) {
      return concat(list, value)
    }
    return concat(list, [value])
  })
)

export default append
