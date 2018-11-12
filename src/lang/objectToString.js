const { toString } = Object.prototype

/**
 * Returns a string representing the object.
 *
 * See [Object.prototype.toString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString) for more information
 *
 * @function
 * @since v0.0.18
 * @category lang
 * @param {object} object The object to convert to a string
 * @returns {object} A string representing the object.
 *
 * objectToString({})
 * //=> '[object Object]'
 */
const objectToString = (object) => toString.call(object)

export default objectToString
