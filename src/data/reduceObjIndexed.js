import curry from '../common/curry'
import keys from './keys'
import prop from './prop'
import reduce from './reduce'

const reduceObjIndexed = curry((reducer, accum, obj) =>
  reduce((acc, key) => reducer(acc, prop(key, obj), key), accum, keys(obj))
)

export default reduceObjIndexed
