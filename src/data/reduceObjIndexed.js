import { curry, keys, prop, reduce } from 'ramda'

const reduceObjIndexed = curry((reducer, accum, obj) => reduce(
  (acc, key) => reducer(acc, prop(key), key),
  accum,
  keys(obj)
))

export default reduceObjIndexed
