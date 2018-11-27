import all from '../common/all'
import curry from '../common/curry'
import defn from '../common/defn'
import pipe from '../common/pipe'
import reduce from './reduce'

/**
 * Iterate over a collection calling a provided function `iteratee` for each element in the collection.
 *
 * `iteratee` receives two arguments: *(value, kdx)*
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
 * This method executes in **parallel**. If the iteratee returns a `Promise`, it will NOT wait till the `Promise` resolves before it executes the next iteration.
 *
 * @function
 * @since 0.0.19
 * @category data
 * @param {Function} iteratee The function to invoke. Receives two arguments, `value` and either `index` for arrays or `key` for objects.
 * @param {*} collection The collection to iterate over.
 * @returns {*} The original collection.
 * @example
 *
 * const printXPlusFive = x => console.log(x + 5);
 * forEachAll(printXPlusFive, [1, 2, 3]); //=> [1, 2, 3]
 * // logs 6
 * // logs 7
 * // logs 8
 */
const forEachAll = curry(
  defn('forEachAll', (iteratee, collection) =>
    pipe(
      reduce((accum, value, kdx) => {
        accum.push(iteratee(value, kdx))
        return accum
      }, []),
      all,
      () => collection
    )(collection)
  )
)

export default forEachAll
