/**
 * Defines a new property directly on an object, or modifies an existing property on an object, and returns the object.
 *
 * See [Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) for more information
 *
 * @function
 * @since v0.0.18
 * @category lang
 * @param {object} object The object on which to define the property.
 * @param {string} prop The name or Symbol of the property to be defined or modified.
 * @param {object} descriptor The descriptor for the property being defined or modified.
 * @returns {object} The object that was passed to the function.
 *
 * const object1 = {}
 *
 * objectDefineProperty(object1, 'property1', {
 *   value: 42,
 *   writable: false
 * })
 *
 * object1.property1 = 77
 * // throws an error in strict mode
 *
 * object1.property1
 * //=> 42
 */
const objectDefineProperty = Object.defineProperty

export default objectDefineProperty
