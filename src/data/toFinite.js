import defn from '../common/defn'
import isPromise from './isPromise'
import toNumber from './toNumber'

/** Used as references for various `Number` constants. */
const INFINITY = 1 / 0
const MAX_INTEGER = 1.7976931348623157e308

/**
 * Converts `value` to a finite number.
 *
 * @func
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * toFinite(3.2)
 * // => 3.2
 *
 * toFinite(Number.MIN_VALUE)
 * // => 5e-324
 *
 * toFinite(Infinity)
 * // => 1.7976931348623157e+308
 *
 * toFinite('3.2')
 * // => 3.2
 */
const toFinite = defn('toFinite', (value) => {
  if (isPromise(value)) {
    return value.then((resolvedValue) => toFinite(resolvedValue))
  }
  if (!value) {
    return value === 0 ? value : 0
  }
  value = toNumber(value)
  if (value === INFINITY || value === -INFINITY) {
    const sign = value < 0 ? -1 : 1
    return sign * MAX_INTEGER
  }
  return value === value ? value : 0
})

export default toFinite
