import curry from '../common/curry'

const defineProperty = curry((value, prop, descriptor) =>
  Object.defineProperty(value, prop, descriptor)
)

export default defineProperty
