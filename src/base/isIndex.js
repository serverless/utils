import { MAX_SAFE_INTEGER } from '../constants'

/** Used to detect unsigned integer values. */
const reIsUint = /^(?:0|[1-9]\d*)$/

/**
 * Checks if `value` is a valid array-like index.
 *
 * @function
 * @since v0.0.3
 * @category base
 * @param {*} value The value to check.
 * @param {number} length [=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 * @example
 *
 * isIndex(0)
 * //=> true
 *
 * isIndex(1)
 * //=> true
 *
 * isIndex(-1)
 * //=> false
 */
const isIndex = (value, length = MAX_SAFE_INTEGER) => {
  // NOTE BRN: max safe length is exactly MAX_SAFE_INTEGER since the length of an array cannot safely be greater than the max integer.
  const type = typeof value
  return (
    !!length &&
    (type == 'number' || (type != 'symbol' && reIsUint.test(value))) &&
    (value > -1 && value % 1 == 0 && value < length)
  )
}

export default isIndex
