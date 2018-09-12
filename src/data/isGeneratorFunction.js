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

const isGeneratorFunction = (fn) => {
  if (typeof fn !== 'function') {
    return false
  }
  if (isFnRegex.test(fnToStr.call(fn))) {
    return true
  }
  if (!hasToStringTag) {
    const str = toStr.call(fn)
    return str === '[object GeneratorFunction]'
  }
  return getProto(fn) === GeneratorFunction
}

export default isGeneratorFunction
