import isFunction from './isFunction'

const isPromise = (obj) => obj && isFunction(obj.then)

export default isPromise
