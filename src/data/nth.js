import curry from './curry'
import isString from './isString'

/**
 * Returns the nth element of the given list or string. If n is negative the
 * element at index length + n is returned.
 *
 * @func
 * @since v0.0.5
 * @category data
 * @sig Number -> String -> String
 * @param {number} offset The offset from the 0 index to select from. If negative it will be subtracted from length
 * @param {*} collection The collection to select from
 * @returns {*} The value at the nth index
 * @example
 *
 * const list = ['foo', 'bar', 'baz', 'quux']
 * nth(1, list) //=> 'bar'
 * nth(-1, list) //=> 'quux'
 * nth(-99, list) //=> undefined
 *
 * nth(2, 'abc') //=> 'c'
 * nth(3, 'abc') //=> ''
 */
const nth = curry((offset, list) => {
  const idx = offset < 0 ? list.length + offset : offset
  return isString(list) ? list.charAt(idx) : list[idx]
})

export default nth
