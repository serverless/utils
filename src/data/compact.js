import curry from '../common/curry'
import defn from '../common/defn'
import isUndefined from '../lang/isUndefined'
import reject from './reject'

/**
 * Creates an array with all undefined values removed.
 *
 * @function
 * @since v0.0.10
 * @category data
 * @param {Array} array The array to compact.
 * @returns {Array} Returns the new array of filtered values.
 * @example
 *
 * compact([0, 1, false, 2, null, '', 3, undefined])
 * // => [0, 1, false, 2, null, '', 3]
 */
const compact = curry(defn('compact', reject(isUndefined)))

export default compact
