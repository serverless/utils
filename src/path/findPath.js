import find from '../data/find'
import isString from '../data/isString'

const findPath = (...values) => find(isString)(values)

export default findPath
