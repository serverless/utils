// import curry from './curry'

// TODO BRN: Only add support for placeholders, do not curry
/**
 * A function that does nothing but return the parameter supplied to it. Good as a default or placeholder function.
 *
 * @function
 * @since v0.0.10
 * @category common
 * @param {*} value The value to return.
 * @return {*} The input value.
 * @example
 *
 * identity(1)
 * //=> 1
 *
 * const obj = {}
 * identity(obj) === obj
 * //=> true

 * identity()
 * //=> undefined
 */
const identity = (value) => {
  return value
}

export default identity
