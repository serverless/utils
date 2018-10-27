import curry from '../common/curry'
import defn from '../common/defn'
import pipe from '../common/pipe'
import iterate from '../common/iterate'

/**
 * Returns the kdx of the first element of the collection which matches the predicate, or `undefined` if no element matches.
 *
 * Dispatches to the `findkdx` method of the `collection` argument, if present.
 *
 * Supports async predicates. If a predicate returns a Promise than the entire method will upgrade to async and return a Promise.
 *
 * @function
 * @since v0.0.15
 * @category data
 * @param {Function} fn The predicate function used to determine if the element is the desired one.
 * @param {Array} collection The collection to consider.
 * @returns {*|Promise} The element found, or `undefined`.
 * @example
 *
 * findKdx(
 *   (value, index) => value[index] == 2,
 *   [{a: 1}, {a: 2}, {a: 3}]
 * )
 * //=> 1
 *
 * findKdx(
 *   (value, key) => value[key] == 2,
 *   { a: 1, b: 2, c: 3 }
 * )
 * //=> 'b'
 */
const findKdx = curry(
  defn('findKdx', (fn, collection) =>
    iterate(
      (next) =>
        pipe(
          (pNext) => {
            if (pNext.done) {
              return pNext
            }
            return fn(pNext.value, pNext.kdx)
          },
          (result) => {
            if (result) {
              return {
                ...next,
                value: next.kdx,
                done: true
              }
            }
            return next
          }
        )(next),
      collection
    )
  )
)

export default findKdx
