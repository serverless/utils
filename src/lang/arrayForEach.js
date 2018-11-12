/**
 * This method executes a provided function once for each array element.
 *
 * See [Array.prototype.forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) for more information
 *
 * @function
 * @since v0.0.18
 * @category lang
 * @param {array} array The array to iterate over.
 * @param {function} fn The function to execute for each element
 * @returns {array} The original array
 * @example
 *
 * const items = ['item1', 'item2', 'item3']
 * const copy = []
 *
 * for (let i=0; i<items.length; i++) {
 *   copy.push(items[i])
 * }
 * //=> ['item1', 'item2', 'item3']
 */
const arrayForEach = (array, fn) => array.forEach(fn)

export default arrayForEach
