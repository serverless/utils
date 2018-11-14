import toStringTag from './toStringTag'

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @function
 * @since 0.0.3
 * @category lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * isSymbol(Symbol.iterator)
 * // => true
 * isSymbol(Symbol('abc'))
 * // => true
 * isSymbol(Symbol.for('abc'))
 * // => true
 *
 * isSymbol('abc')
 * // => false
 */
const isSymbol = (value) => {
  const type = typeof value
  return (
    type == 'symbol' ||
    (type == 'object' && value != null && toStringTag(value) == '[object Symbol]')
  )
}

export default isSymbol
