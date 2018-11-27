import all from '../common/all'
import curry from '../common/curry'
import defn from '../common/defn'
import isArrayLike from '../lang/isArrayLike'
import pipe from '../common/pipe'
import reduce from './reduce'

// TODO BRN: Performance of this method can be improved by not collecting all the Promises into a new object when resolving them. Instead we should use either generators or transducers to process each value.

/**
 * Takes a function and a [functor](https://github.com/fantasyland/fantasy-land#functor), applies the function to each of the functor's values, and returns  a functor of the same shape.
 *
 * Provides suitable `map` implementations for `Array` and `Object`,
 * so this function may be applied to `[1, 2, 3]` or `{x: 1, y: 2, z: 3}`.
 *
 * Dispatches to the `mapAll` method of the second argument, if present.
 *
 * This method automatically upgrades to async.
 * - If the `iteratee` or the `collection` arguments are Promises, this method will resolve those values before executing and this method will return a `Promise`.
 * - If the `iteratee` returns a `Promise`, this method will reutrn a `Promise`
 *
 * This method executes in **parallel**. If the iteratee returns a `Promise`, it will NOT wait till the `Promise` resolves before it executes the next iteration.
 *
 * @function
 * @since v0.0.19
 * @category data
 * @param {Function} iteratee The function to be called on every element of the input `list`.
 * @param {*} collection The collection to be iterated over.
 * @return {*} The new collection.
 * @example
 *
 * const double = x => x * 2
 *
 * mapAll(double, [1, 2, 3]) //=> [2, 4, 6]
 *
 * mapAll(double, {x: 1, y: 2, z: 3}) //=> {x: 2, y: 4, z: 6}
 */
const mapAll = curry(
  defn('mapAll', (iteratee, collection) =>
    pipe(
      reduce(
        (accum, value, kdx) => {
          accum[kdx] = iteratee(value, kdx)
          return accum
        },
        isArrayLike(collection) ? [] : {}
      ),
      all
    )(collection)
  )
)

export default mapAll
