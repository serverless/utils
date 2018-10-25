import curry from '../common/curry'
import defn from '../common/defn'
import iterateRight from '../common/iterateRight'
import pipe from '../common/pipe'

/**
 * Returns a single item by iterating through the collection, successively calling the iterator function and passing it an accumulator value,  the current value and the index or key from the collection, and then passing the result to the next call.
 *
 * Similar to [`reduce`](#reduce), except moves through the input list from the right to the left.
 *
 * The iterator function receives three values: *(acc, value, kdx)*.
 *
 * Supports async reducers. This method will automatically upgrade to async if given an async reducer.
 *
 * Dispatches to the `reduce` method of the third argument, if present.
 *
 * Note: `reduceRight` does not skip deleted or unassigned indices (sparse arrays), unlike the native `Array.prototype.reduceRight` method. For more details on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight#Description
 *
 * @function
 * @since v0.0.10
 * @category data
 * @param {Function} fn The iterator function. Receives three values, the accumulator, the current value from the collection and the key or index.
 * @param {*} accumulator The accumulator value.
 * @param {Array|string|Object|Promise} collection The collection to iterate over.
 * @returns {*} The final, accumulated value.
 * @example
 *
 * reduceRight(subtract, 0, [1, 2, 3, 4]) // => (1 - (2 - (3 - (4 - 0)))) = -2
 * //    -               -2
 * //   / \              / \
 * //  1   -            1   3
 * //     / \              / \
 * //    2   -     ==>    2  -1
 * //       / \              / \
 * //      3   -            3   4
 * //         / \              / \
 * //        4   0            4   0
 */
const reduceRight = curry(
  defn('reduceRight', (iteratee, accumulator, collection) => {
    let accum = accumulator
    return iterateRight(
      (next) =>
        pipe(
          (pNext) => {
            if (pNext.done) {
              return accum
            }
            return iteratee(accum, pNext.value, pNext.kdx)
          },
          (nextAccum) => {
            accum = nextAccum
            if (next.done) {
              return {
                ...next,
                value: accum
              }
            }
            return next
          }
        )(next),
      collection
    )
  })
)

export default reduceRight
