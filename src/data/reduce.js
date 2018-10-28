import curry from '../common/curry'
import defn from '../common/defn'
import iterate from '../common/iterate'
import pipe from '../common/pipe'

/**
 * Returns a single item by iterating through the collection, successively calling the iterator function and passing it an accumulator value and the current value from the collection, and then passing the result to the next call.
 *
 * The iterator function receives three values: *(acc, value, kdx)*.
 *
 * Note: This method automatically upgrades to async.
 * - If an async `iteratee` is given to this method it will return a Promise.
 * - If a Promise is given for `iteratee`, `accumulator`, or `collection`, this method will resolve the Promise(s) and return a Promise
 *
 * Note: for arrays, `reduce` does not skip deleted or unassigned indices (sparse arrays), unlike the native `Array.prototype.reduce` method. For more details  on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description
 *
 * Dispatches to the `reduce` method of the third argument, if present.
 *
 * This method will resolve the parameters but it will not resolve the values passed to the iteratee. It will only resolve the values returned by the iteratee.
 *
 * @function
 * @since v0.0.3
 * @category data
 * @param {Function} iteratee The iterator function. Receives three values, the accumulator, the current value from the collection and the key or index.
 * @param {*} accumulator The accumulator value.
 * @param {Array|string|Object|Promise} collection The collection to iterate over.
 * @returns {*} The final, accumulated value.
 * @example
 *
 * reduce((accum, value, key) => {
 *   ...
 *   return accum
 * }, myAccum, myObject)
 *
 * reduce((accum, value, index) => {
 *   ...
 *   return accum
 * }, myAccum, myArray)
 *
 * reduce((accum, value) => {
 *   accum.push(value)
 *   return accum
 * }, [], [ Promise.resolve('foo') ]) // => [ Promise { 'foo' } ]
 *
 *
 * reduce(subtract, 0, [1, 2, 3, 4]) // => ((((0 - 1) - 2) - 3) - 4) = -10
 * //          -               -10
 * //         / \              / \
 * //        -   4           -6   4
 * //       / \              / \
 * //      -   3   ==>     -3   3
 * //     / \              / \
 * //    -   2           -1   2
 * //   / \              / \
 * //  0   1            0   1
 */
const reduce = curry(
  defn('reduce', (iteratee, accumulator, collection) => {
    let accum = accumulator
    return iterate(
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

export default reduce
