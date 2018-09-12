import isFunction from './isFunction'

const isGenerator = (obj) => obj && isFunction(obj.next) && isFunction(obj.throw)

export default isGenerator
