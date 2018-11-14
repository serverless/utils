import { baseContainsWith } from './containsWith'
import curry from '../common/curry'
import defn from '../common/defn'
import equals from './equals'

/**
 * Returns `true` if the specified value is equal, in [`equals`](#equals) terms, to at least one value of the given collection; `false` otherwise.
 *
 * @function
 * @since v0.0.18
 * @category data
 * @param {*} value The value to compare against.
 * @param {array|object|string} collection The collection to consider.
 * @returns {boolean} `true` if an equivalent value is in the collection, `false` otherwise.
 * @example
 *
 * contains(3, [1, 2, 3]) //=> true
 * contains(4, [1, 2, 3]) //=> false
 * contains({ name: 'Fred' }, [{ name: 'Fred' }]) //=> true
 * contains([42], [[42]]) //=> true
 */
const contains = curry(
  defn('contains', (value, collection) => baseContainsWith(equals, value, collection))
)

export default contains
