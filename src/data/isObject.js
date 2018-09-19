/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @func
 * @since 0.3.0
 * @category data
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 *      isObject({}) // => true
 *
 *      isObject([1, 2, 3]) // => true
 *
 *      isObject(Function) // => true
 *
 *      isObject(null) // => false
 */
const isObject = (value) => {
  const type = typeof value
  return value != null && (type == 'object' || type == 'function')
}

export default isObject
