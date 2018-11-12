import curry from './curry'

const baseIdentical = (valueA, valueB) => {
  // SameValue algorithm
  if (valueA === valueB) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    // Added the nonzero y check to make Flow happy, but it is redundant
    return valueA !== 0 || valueB !== 0 || 1 / valueA === 1 / valueB
  }
  // Step 6.a: NaN == NaN
  return valueA !== valueA && valueB !== valueB
}

/**
 * Returns true if its arguments are identical, false otherwise. Values are identical if they reference the same memory. `NaN` is identical to `NaN`; `0` and `-0` are not identical.
 *
 *  [Object.is](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) polyfill to avoid requiring consumers ship their own
 *
 * @function
 * @since v0.0.18
 * @category common
 * @param {*} valueA
 * @param {*} valueB
 * @returns {Boolean}
 * @example
 *
 * const o = {}
 * identical(o, o) //=> true
 * identical(1, 1) //=> true
 * identical(1, '1') //=> false
 * identical([], []) //=> false
 * identical(0, -0) //=> false
 * identical(NaN, NaN) //=> true
 */
const identical = curry(baseIdentical)

export default identical

export { baseIdentical }
