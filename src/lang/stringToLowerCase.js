import isString from './isString'

/**
 * Returns the given string value converted to lower case.
 *
 * @function
 * @since v0.0.16
 * @category lang
 * @param {string} string The string to convert to lower case
 * @returns {string} A new array with the values concatenated
 * @example
 *
 * stringToLowerCase('ABC') //=> 'abc'
 */
const stringToLowerCase = (string) => {
  if (!isString(string)) {
    throw new TypeError(
      `stringToLowerCase method expected 'string' to be a string. Instead it received ${string}`
    )
  }
  return string.toLowerCase()
}

export default stringToLowerCase
