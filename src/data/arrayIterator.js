import arrayIteratorAtIndex from './arrayIteratorAtIndex'
import isArrayLike from './isArrayLike'
import toString from './toString'

/**
 * Returns iterator for an array like value.
 *
 * @function
 * @since v0.0.11
 * @category data
 * @param {*} arrayLike The array like value to create an iterator for.
 * @return {Iterator} A new iterator for the given array like value
 * @example
 *
 * arrayIterator(['write', 'more'])
 * //=> {
 * //   next: () => ({
 * //     value: *,
 * //     done: boolean,
 * //     kdx: integer,
 * //     index: integer
 * //   })
 * // }
 * arrayIterator('tests')
 * //=> {
 * //   next: () => ({
 * //     value: *,
 * //     done: boolean,
 * //     kdx: integer,
 * //     index: integer
 * //   })
 * // }
 */
const arrayIterator = (arrayLike) => {
  if (!isArrayLike(arrayLike)) {
    throw new TypeError(
      `arrayIterator expected arrayLike to be an ArrayLike value. Instead received ${toString(
        arrayLike
      )}`
    )
  }
  return arrayIteratorAtIndex(arrayLike, 0)
}

export default arrayIterator
