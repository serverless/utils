import getTag from './getTag'

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @func
 * @since 0.3.0
 * @category data
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * isSymbol(Symbol.iterator) // => true
 *
 * isSymbol('abc') // => false
 */
const isSymbol = (value) => {
  const type = typeof value
  return (
    type == 'symbol' || (type == 'object' && value != null && getTag(value) == '[object Symbol]')
  )
}

export default isSymbol
