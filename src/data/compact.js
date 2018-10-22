import isUndefined from '../base/isUndefined'
import defn from '../common/defn'
import reject from './reject'

/**
 * Creates an array with all undefined values removed.
 *
 * @function
 * @since 0.0.10
 * @category data
 * @param {Array} array The array to compact.
 * @returns {Array} Returns the new array of filtered values.
 * @example
 *
 * compact([0, 1, false, 2, null, '', 3, undefined])
 * // => [0, 1, false, 2, null, '', 3]
 */
const compact = defn('compact', (array) => reject(isUndefined, array))

export default compact
