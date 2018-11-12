import curry from '../common/curry'
import defn from '../common/defn'
import stringToLowerCase from '../lang/stringToLowerCase'
import toString from '../lang/toString'

/**
 * Converts the given value to a string and then converts it to lower case.
 *
 * This method resolves both parameters before executing.
 *
 * This method will automatically upgrade to async if a Promise is received for either value.
 *
 * @function
 * @since v0.0.16
 * @category string
 * @param {*} value
 * @returns {string} the given value converted to a string and lower cased
 * @example
 *
 * lowerCase('ABC') //=> 'abc'
 * lowerCase(true) //=> 'true'
 * lowerCase(123) //=> '123'
 * await lowerCase(Promise.resolve(123)) //=> '123'
 */
const lowerCase = curry(defn('lowerCase', (value) => stringToLowerCase(toString(value))))

export default lowerCase
