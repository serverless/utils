/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @func
 * @since 0.3.0
 * @category data
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a transformer, else `false`.
 * @example
 *
 * isTransformer({
 *   ['@@transducer/step']: () => {}
 * }) // => true
 *
 * isTransformer('abc') // => false
 */
const isTransformer = (value) => value != null && typeof value['@@transducer/step'] === 'function'

export default isTransformer
