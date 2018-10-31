import complement from '../common/complement'
import curry from '../common/curry'
import defn from '../common/defn'
import filter from './filter'

// TODO BRN: Improve this method to maintain the original array in memory when no changes are made

/**
 * The complement of [`filter`](#filter).
 *
 * @function
 * @since v0.0.16
 * @category data
 * @param {Function} predicate
 * @param {*} filterable
 * @returns {*}
 * @example
 *
 * isOdd = (n) => n % 2 === 1
 *
 * remove(isOdd, [1, 2, 3, 4]) //=> [2, 4]
 *
 * remove(isOdd, {a: 1, b: 2, c: 3, d: 4}) //=> {b: 2, d: 4}
 */
const remove = curry(
  defn('remove', (predicate, filterable) => filter(complement(predicate), filterable))
)

export default remove
