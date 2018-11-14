import curry from '../common/curry'
import defn from '../common/defn'
import isArrayLike from '../lang/isArrayLike'
import pipe from '../common/pipe'
import reduce from './reduce'

/**
 * Takes a function and a [functor](https://github.com/fantasyland/fantasy-land#functor), applies the function to each of the functor's values, and returns  a functor of the same shape.
 *
 * Provides suitable `map` implementations for `Array` and `Object`,
 * so this function may be applied to `[1, 2, 3]` or `{x: 1, y: 2, z: 3}`.
 *
 * Dispatches to the `map` method of the second argument, if present.
 *
 * @function
 * @since v0.0.13
 * @category data
 * @param {Function} iteratee The function to be called on every element of the input `list`.
 * @param {*} collection The collection to be iterated over.
 * @return {*} The new collection.
 * @example
 *
 * const double = x => x * 2
 *
 * map(double, [1, 2, 3]) //=> [2, 4, 6]
 *
 * map(double, {x: 1, y: 2, z: 3}) //=> {x: 2, y: 4, z: 6}
 */
const map = curry(
  defn('map', (iteratee, collection) =>
    reduce(
      (accum, value, kdx) =>
        pipe(
          () => iteratee(value, kdx),
          (result) => {
            accum[kdx] = result
            return accum
          }
        )(),
      isArrayLike(collection) ? [] : {},
      collection
    )
  )
)

export default map
