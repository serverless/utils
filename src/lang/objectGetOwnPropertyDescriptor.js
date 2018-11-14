/**
 * Returns a property descriptor for an own property
 *
 * @function
 * @since v0.0.17
 * @category lang
 * @param {object} object The object to get the property from
 * @param {string} prop The prop to get from the object
 * @returns {{
 *   configurable: boolean,
 *   enumerable: boolean,
 *   value: *,
 *   writeable: boolean,
 *   get: () => *,
 *   set: (value) => undefined
 * }} The property descriptor
 * @example
 *
 * const object = { get foo() { return 17 } }
 * objectGetOwnPropertyDescriptor(object, 'foo')
 * //=> {
 * //   configurable: true,
 * //   enumerable: true,
 * //   get: foo() { ... },
 * //   set: undefined
 * // }
 */
const objectGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor

export default objectGetOwnPropertyDescriptor
