import objectToString from './objectToString'

/**
 * Gives a single-word string description of the (native) type of a value, returning such answers as 'Object', 'Number', 'Array', or 'Null'. Does not attempt to distinguish user Object types any further, reporting them all as 'Object'.
 *
 * @function
 * @since v0.0.18
 * @category lang
 * @param {*} value The value to test
 * @returns {string}
 * @example
 *
 * toType({}) //=> 'Object'
 * toType(1) //=> 'Number'
 * toType(false) //=> 'Boolean'
 * toType('s') //=> 'String'
 * toType(null) //=> 'Null'
 * toType([]) //=> 'Array'
 * toType(/[A-z]/) //=> 'RegExp'
 * toType(() => {}) //=> 'Function'
 * toType(undefined) //=> 'Undefined'
 */
const toType = (value) => {
  return value === null
    ? 'Null'
    : value === undefined
    ? 'Undefined'
    : objectToString(value).slice(8, -1)
}

export default toType
