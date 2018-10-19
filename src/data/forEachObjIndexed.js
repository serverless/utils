import forEach from './forEach'

/**
 * Alias for [forEach](#forEach) method
 *
 * @function
 * @since 0.0.3
 * @category data
 * @param {Function} fn The function to invoke. Receives two arguments, `value` and either `index` for arrays or `key` for objects.
 * @param {*} collection The collection to iterate over.
 * @returns {*} The original collection.
 */
const forEachObjIndexed = forEach

export default forEachObjIndexed
