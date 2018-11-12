import isPlainFunction from './isPlainFunction'

const isIterator = (value) => value != null && isPlainFunction(value.next)

export default isIterator
