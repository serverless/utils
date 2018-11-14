import curry from '../common/curry'
import defn from '../common/defn'
import nth from '../common/nth'

/**
 * Returns the last element of the given list or string.
 *
 * @function
 * @since v0.0.3
 * @category data
 * @sig [a] -> a | Undefined
 * @param {*} list The list to get the last element from
 * @returns {*} The last element of the given list or string
 * @example
 *
 * last(['fi', 'fo', 'fum']) //=> 'fum'
 * last([]) //=> undefined
 *
 * last('abc') //=> 'c'
 * last(''); //=> ''
 */
const last = curry(defn('last', nth(-1)))

export default last
