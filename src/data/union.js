import compose from '../common/compose'
import concat from './concat'
import curry from '../common/curry'
import uniq from './uniq'

/**
 * Combines two lists into a set (i.e. no duplicates) composed of the elements
 * of each list.
 *
 * @function
 * @since v0.0.10
 * @category data
 * @param {Array} firstList The first list.
 * @param {Array} secondList The second list.
 * @return {Array} The first and second lists concatenated, with duplicates removed.
 * @example
 *
 * union([1, 2, 3], [2, 3, 4]) //=> [1, 2, 3, 4]
 */
const union = curry(
  compose(
    uniq,
    concat
  )
)

export default union
