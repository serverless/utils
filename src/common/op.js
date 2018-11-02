import { SYMBOL_OP } from '../constants'

/**
 * Creates an op object that can be yielded by a generator and intercepted/executed by any generator middleware
 *
 * @function
 * @since v0.0.16
 * @category common
 * @param {Function} fn The function to execute when the op is executed
 * @returns {Object} The op object
 */
const op = (fn) => ({ [SYMBOL_OP]: fn })

export default op
