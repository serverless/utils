import indexEndOffset from './indexEndOffset'
import isArrayLike from './isArrayLike'
import toString from './toString'

const iterAt = (index, arrayLike) => {
  if (index < arrayLike.length && index >= 0) {
    return {
      value: arrayLike[index],
      index,
      kdx: index,
      done: false
    }
  }
  return {
    done: true
  }
}

const prevIterAt = (index, arrayLike) => {
  if (index < arrayLike.length && index >= 0) {
    return {
      value: arrayLike[index],
      index,
      kdx: index,
      done: false
    }
  }
}

/**
 * Returns iterator for an array like value.
 *
 * @function
 * @since v0.0.11
 * @category lang
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
    index = arrayLike.length
  } else if (index === 'START') {
    index = 0
  }
  index = indexEndOffset(index, arrayLike.length)

  return {
    next: () => {
      const iter = iterAt(index, arrayLike)
      const prev = prevIterAt(index - 1, arrayLike)
      if (index < arrayLike.length) {
        index += 1
      }
      return {
        ...iter,
        prev
      }
    },
    previous: () => {
      const iter = iterAt(index - 1, arrayLike)
      const prev = prevIterAt(index, arrayLike)
      if (index >= 0) {
        index -= 1
      }
      return {
        ...iter,
        prev
      }
    }
  }
}

export default arrayLikeIterator
