import curry from './curry'

/**
 * Determines if the value is an op.
 *
 * @function
 * @since 0.0.11
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
const isOp = curry((value) => !!(value && value['@@redux-saga/IO']))

export default isOp
