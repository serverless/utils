import arrayFlatten from '../lang/arrayFlatten'
import arrayLikeReduceRight from '../lang/arrayLikeReduceRight'
import arrayLikeSlice from '../lang/arrayLikeSlice'
import identity from './identity'

/**
 * Performs right-to-left function composition. The rightmost function may have any arity; the remaining functions must be unary.
 *
 * **Note:** The result of compose is not automatically curried.
 *
 * @function
 * @since v0.0.10
 * @category common
 * @param {...Function} functions The functions to compose
 * @returns {Function}
 * @example
 *
 * const classyGreeting = (firstName, lastName) => "The name's " + lastName + ", " + firstName + " " + lastName
 * const yellGreeting = compose(toUpper, classyGreeting)
 * yellGreeting('James', 'Bond')
 * //=> "THE NAME'S BOND, JAMES BOND"
 *
 * compose(Math.abs, add(1), multiply(2))(-4) //=> 7
 */
const compose = (...functions) => {
  functions = arrayFlatten(functions)
  const { length } = functions
  if (length === 0) {
    return identity
  }

  if (length === 1) {
    return functions[0]
  }

  const lastFunc = functions[length - 1]
  const rest = arrayLikeSlice(functions, 0, length - 1)

  return (...args) =>
    arrayLikeReduceRight(rest, lastFunc(...args), (composed, func) => func(composed))
}

export default compose
