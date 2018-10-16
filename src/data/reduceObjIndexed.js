import reduce from './reduce'

/**
 * Alias for [reduce](#reduce) method
 *
 * @function
 * @since v0.0.3
 * @category data
 * @param {Function} fn The iterator function. Receives three values, the accumulator, the current value from the collection and the key or index.
 * @param {*} accumulator The accumulator value.
 * @param {Array|string|Object|Promise} collection The collection to iterate over.
 * @returns {*} The final, accumulated value.
 */
const reduceObjIndexed = reduce

export default reduceObjIndexed
