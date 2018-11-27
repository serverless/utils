import { SYMBOL_OP } from '../constants'
import curry from './curry'

const baseIsOp = (value) => !!(value && (value[SYMBOL_OP] || value['@@redux-saga/IO']))

/**
 * Determines if the value is an op.
 *
 * @function
 * @since v0.0.11
 * @category common
 * @param {*} value
 * @returns {boolean}
 * @example
 *
 * isOp({
 *   ['@@redux-saga/IO']: 'op'
 * })
 * //=> true
 */
const isOp = curry(baseIsOp)

export default isOp

export { baseIsOp }
