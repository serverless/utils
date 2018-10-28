import isString from '../base/isString'
import curry from '../common/curry'
import dispatchable from '../common/dispatchable'
import resolveWith from '../common/resolveWith'
import concat from './concat'

const baseAppend = (value, arrayLike) => {
  if (isString(arrayLike)) {
    return concat(arrayLike, value)
  }
  return concat(arrayLike, [value])
}

const dispatchableAppend = dispatchable('append', baseAppend)

/**
 * Returns a new list containing the contents of the given list, followed by the given value.
 *
 * This method dispatches to the `append` method of the `arrayLike` argument if it exists.
 *
 * This method will auto upgrade to async and resolve the `arrayLike` value if the `arrayLike` value is a Promise.
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
const append = curry((value, arrayLike) =>
  resolveWith((resolvedArrayLike) => dispatchableAppend(value, resolvedArrayLike), arrayLike)
)

export default append

export { baseAppend, dispatchableAppend }
