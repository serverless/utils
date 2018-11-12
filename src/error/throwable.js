import Throwable from './types/Throwable'
import curry from '../common/curry'

const throwable = curry((values) => new Throwable(values))

export default throwable
