import curry from '../common/curry'
import defn from '../common/defn'
import iterate from '../common/iterate'
import pipe from '../common/pipe'

/**
 * Iterate over a collection calling a provided function `fn` for each element in the collection .
 *
 * `fn` receives two arguments: *(value, kdx)*
 *
 * Note: `forEach` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.forEach` method. For more
 * details on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Description
 *
 * Also note that, unlike `Array.prototype.forEach`, this `forEach` returns
 * the original value. In some libraries this function is named `each`.
 *
 * Dispatches to the `forEach` method of the second argument, if present.
 *
 * This method automatically upgrades to async.
 * - If the `iteratee` or the `collection` arguments are Promises, this method will resolve those values before executing and this method will return a `Promise`.
 * - If the `iteratee` returns a `Promise`, this method will reutrn a `Promise`
 *
 * This method executes in **series**. If the iteratee returns a `Promise`, it will wait till the `Promise` resolves before it executes the next iteration.
 *
 * @function
 * @since v0.0.3
 * @category data
 * @param {Function} fn The function to invoke. Receives two arguments, `value` and either `index` for arrays or `key` for objects.
 * @param {*} collection The collection to iterate over.
 * @returns {*} The original collection.
 * @example
 *
 * const printXPlusFive = x => console.log(x + 5);
 * forEach(printXPlusFive, [1, 2, 3]); //=> [1, 2, 3]
 * // logs 6
 * // logs 7
 * // logs 8
 */
const forEach = curry(
  defn('forEach', (fn, collection) =>
    pipe(
      () =>
        iterate(
          (next) =>
            pipe(
              (pNext) => {
                if (pNext.done) {
                  return pNext
                }
                return fn(pNext.value, pNext.kdx, collection)
              },
              () => next
            )(next),
          collection
        ),
      () => collection
    )()
  )
)

export default forEach
