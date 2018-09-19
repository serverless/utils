import isGenerator from './isGenerator'
import isPromise from './isPromise'
import slice from './slice'

const generatorReduce = function*(iteratee, accumulator, array) {
  if (isGenerator(accumulator)) {
    accumulator = yield* accumulator
  } else if (isPromise(accumulator)) {
    accumulator = yield accumulator
  }
  const length = array == null ? 0 : array.length
  let idx = 0
  while (idx < length) {
    accumulator = iteratee(accumulator, array[idx], idx)
    if (isGenerator(accumulator)) {
      accumulator = yield* accumulator
    } else if (isPromise(accumulator)) {
      accumulator = yield accumulator
    }
    idx += 1
  }
  return accumulator
}

const asyncReduce = async (iteratee, accumulator, array) => {
  if (isPromise(accumulator)) {
    accumulator = await accumulator
  } else if (isGenerator(accumulator)) {
    return generatorReduce(iteratee, accumulator, array)
  }
  const length = array == null ? 0 : array.length
  let idx = 0
  while (idx < length) {
    accumulator = iteratee(accumulator, array[idx], idx)
    if (isPromise(accumulator)) {
      accumulator = await accumulator
    } else if (isGenerator(accumulator)) {
      return generatorReduce(iteratee, accumulator, slice(idx + 1, length, array))
    }
    idx += 1
  }
  return accumulator
}

/**
 * Returns a single item by iterating through the list, successively calling
 * the iterator function and passing it an accumulator value and the current
 * value from the array, and then passing the result to the next call.
 *
 * The iterator function receives two values: *(acc, value)*. It may use
 * [`reduced`](#reduced) to shortcut the iteration.
 *
 * The arguments' order of [`reduceRight`](#reduceRight)'s iterator function
 * is *(value, acc)*.
 *
 * Note: `reduce` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.reduce` method. For more details
 * on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description
 *
 * Dispatches to the `reduce` method of the third argument, if present. When
 * doing so, it is up to the user to handle the [`reduced`](#reduced)
 * shortcuting, as this is not implemented by `reduce`.
 *
 * @func
 * @since v0.1.0
 * @category data
 * @sig ((a, b) -> a) -> a -> [b] -> a
 * @param {Function} fn The iterator function. Receives two values, the accumulator and the
 *        current element from the array.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @returns {*} The final, accumulated value.
 * @example
 *
 *      reduce(subtract, 0, [1, 2, 3, 4]) // => ((((0 - 1) - 2) - 3) - 4) = -10
 *      //          -               -10
 *      //         / \              / \
 *      //        -   4           -6   4
 *      //       / \              / \
 *      //      -   3   ==>     -3   3
 *      //     / \              / \
 *      //    -   2           -1   2
 *      //   / \              / \
 *      //  0   1            0   1
 *
 */
const reduce = (iteratee, accumulator, array) => {
  if (isPromise(accumulator)) {
    return asyncReduce(iteratee, accumulator, array)
  } else if (isGenerator(accumulator)) {
    return generatorReduce(iteratee, accumulator, array)
  }
  const length = array == null ? 0 : array.length
  let idx = 0
  while (idx < length) {
    accumulator = iteratee(accumulator, array[idx], idx)
    if (isPromise(accumulator)) {
      return asyncReduce(iteratee, accumulator, slice(idx + 1, length, array))
    } else if (isGenerator(accumulator)) {
      return generatorReduce(iteratee, accumulator, slice(idx + 1, length, array))
    }
    idx += 1
  }
  return accumulator
}

export default reduce
