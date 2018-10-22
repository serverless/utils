import flatten from '../data/flatten'
import head from '../data/head'
import length from '../data/length'
import reduce from '../data/reduce'
import tail from '../data/tail'
import identity from './identity'

// TODO BRN: This method is important at a fundamental level. Need to rewrite this to not depend upon data methods.
/**
 * Performs left-to-right function composition. The leftmost function may have
 * any arity; the remaining functions must be unary.
 *
 * In some libraries this function is named `sequence`.
 *
 * **Note:** The result of pipe is not automatically curried.
 *
 * @function
 * @since 0.0.11
 * @category common
 * @param {...Function} functions
 * @returns {Function}
 * @example
 *
 * const f = pipe(Math.pow, negate, inc)
 *
 * f(3, 4) // -(3^4) + 1
 */
const pipe = (...functions) => {
  functions = flatten(functions)
  const size = length(functions)
  if (size === 0) {
    return identity
  }

  if (size === 1) {
    return head(functions)
  }

  const firstFunc = head(functions)
  const rest = tail(functions)

  return (...args) => reduce((piped, func) => func(piped), firstFunc(...args), rest)
}

export default pipe
