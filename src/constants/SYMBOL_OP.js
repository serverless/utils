/**
 * The Symbol.for('@@op') defines an operation for a generator to evaluate
 *
 * @type {Symbol}
 * @since v0.0.16
 * @category constants
 */
const SYMBOL_OP = typeof Symbol !== 'undefined' ? Symbol.for('@@op') : '@@op'

export default SYMBOL_OP
