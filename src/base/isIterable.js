import { SYMBOL_ITERATOR } from '../constants'

/**
 * Checks if `value` implements the iterator symbol or is iterable
 *
 * @function
 * @since v0.0.3
 * @category base
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is iterable, else `false`.
 * @example
 *
 * isIterable('abc')
 * //=> true
 *
 * isIterable(new Map())
 * //=> true
 *
 * isIterable({})
 * //=> false
 *
 * isIterable([])
 * //=> true
 */
const isIterable = (value) => value != null && value[SYMBOL_ITERATOR] != null

export default isIterable
