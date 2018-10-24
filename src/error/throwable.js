import curry from '../common/curry'
import Throwable from './types/Throwable'

const throwable = curry((values) => new Throwable(values))

export default throwable
