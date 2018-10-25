import indexEndOffset from './indexEndOffset'
import isArrayLike from './isArrayLike'
import toString from './toString'

/**
 * Returns iterator for an array like value.
 *
 * @function
 * @since v0.0.11
 * @category base
 * @param {*} arrayLike The array like value to create an iterator for.
 * @param {*} index The index to start at.
 * @return {Iterator} A new iterator for the given array like value
 * @example
 *
 * arrayLikeIterator(['write', 'more'])
 * //=> {
 * //   next: () => ({
 * //     value: *,
 * //     done: boolean,
 * //     kdx: integer,
 * //     index: integer
 * //   }),
 * //   previous: () => ({
 * //     value: *,
 * //     done: boolean,
 * //     kdx: integer,
 * //     index: integer
 * //   })
 * // }
 * arrayLikeIterator('tests')
 * //=> {
 * //   next: () => ({
 * //     value: *,
 * //     done: boolean,
 * //     kdx: integer,
 * //     index: integer
 * //   })
 * //   previous: () => ({
 * //     value: *,
 * //     done: boolean,
 * //     kdx: integer,
 * //     index: integer
 * //   })
 * // }
 */
const arrayLikeIterator = (arrayLike, index = 0) => {
  if (!isArrayLike(arrayLike)) {
    throw new TypeError(
      `arrayLikeIterator expected arrayLike to be an ArrayLike value. Instead received ${toString(
        arrayLike
      )}`
    )
  }
  if (index === 'END') {
    index = arrayLike.length - 1
  } else if (index === 'START') {
    index = 0
  }
  index = indexEndOffset(index, arrayLike.length)
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
    },
    previous: () => {
      if (index >= 0) {
        const next = {
          value: arrayLike[index],
          index,
          kdx: index,
          done: false
        }
        index -= 1
        return next
      }
      return {
        done: true
      }
    }
  }
}

export default arrayLikeIterator
