import isArrayLike from './isArrayLike'
import toString from './toString'

/**
 * Returns iterator for an array like value starting at the given index. If no index is supplied it defualts to 0.
 *
 * @function
 * @since v0.0.11
 * @category data
 * @param {*} arrayLike The array like value to create an iterator for.
 * @param {*} index The index to start at.
 * @return {Iterator} A new iterator for the given array like value
 * @example
 *
 * arrayIteratorAtIndex(['write', 'more', 'tests'])
 * //=> {
 * //   next: () => ({
 * //     value: *,
 * //     done: boolean,
 * //     kdx: integer,
 * //     index: integer
 * //   })
 * // }
 *
 * iter.next()
 * //=> { value: 'write', index: 0, kdx: 0, done: false }

 * arrayIteratorAtIndex(['write', 'more', 'tests'], 1)
 * iter.next()
 * //=> { value: 'more', index: 1, kdx: 1, done: false }
 */
const arrayIteratorAtIndex = (arrayLike, index = 0) => {
  if (!isArrayLike(arrayLike)) {
    throw new TypeError(
      `arrayIteratorAtIndex expected arrayLike to be an ArrayLike value. Instead received ${toString(
        arrayLike
      )}`
    )
  }
  return {
    next: () => {
      if (index < arrayLike.length) {
        const next = {
          value: arrayLike[index],
          index,
          kdx: index,
          done: false
        }
        index += 1
        return next
      }
      return {
        done: true
      }
    }
  }
}

export default arrayIteratorAtIndex
