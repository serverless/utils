const toStr = Object.prototype.toString
const fnToStr = Function.prototype.toString
const isFnRegex = /^\s*(?:function)?\*/
const hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol'
const getProto = Object.getPrototypeOf
const getGeneratorFunc = () => {
  // eslint-disable-line consistent-return
  if (!hasToStringTag) {
    return false
  }
  try {
    return Function('return function*() {}')()
  } catch (e) {}
}
const generatorFunc = getGeneratorFunc()
const GeneratorFunction = generatorFunc ? getProto(generatorFunc) : {}

/**
 * Checks whether a function is generator function.
 *
 * @function
 * @since v0.0.3
 * @category data
 * @param  {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a generator function, else `false`.
 * @example
 *
 * isGeneratorFunction(function*() {})  //=> true
 * isGeneratorFunction(function() {})   //=> false
 */
const isGeneratorFunction = (value) => {
  if (typeof value !== 'function') {
    return false
  }
  if (isFnRegex.test(fnToStr.call(value))) {
    return true
  }
  if (!hasToStringTag) {
    const str = toStr.call(value)
    return str === '[object GeneratorFunction]'
  }
  return getProto(value) === GeneratorFunction
}

export default isGeneratorFunction
