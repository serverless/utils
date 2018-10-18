import flatten from '../data/flatten'
import head from '../data/head'
import init from '../data/init'
import last from '../data/last'
import length from '../data/length'
import reduceRight from '../data/reduceRight'
import identity from './identity'

/**
 * Performs right-to-left function composition. The rightmost function may have any arity; the remaining functions must be unary.
 *
 * **Note:** The result of compose is not automatically curried.
 *
 * @function
 * @since v0.0.10
 * @category common
 * @param {...Function} ...functions The functions to compose
 * @returns {Function}
 * @example
 *
 * const classyGreeting = (firstName, lastName) => "The name's " + lastName + ", " + firstName + " " + lastName
 * const yellGreeting = compose(toUpper, classyGreeting)
 *  yellGreeting('James', 'Bond') //=> "THE NAME'S BOND, JAMES BOND"
 *
 * compose(Math.abs, add(1), multiply(2))(-4) //=> 7
 */
const compose = (...funcs) => {
  funcs = flatten(funcs)
  const size = length(funcs)
  if (size === 0) {
    return identity
  }

  if (size === 1) {
    return head(funcs)
  }

  const lastFunc = last(funcs)
  const rest = init(funcs)

  return (...args) => reduceRight((composed, func) => func(composed), lastFunc(...args), rest)
}

export default compose
