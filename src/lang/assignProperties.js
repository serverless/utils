import curry from '../common/curry'
import forEach from '../data/forEach'
import keys from '../data/keys'
import defineProperty from './defineProperty'
import getProperty from './getProperty'

const assignProperties = curry((target, source) => {
  forEach((key) => {
    const descriptor = getProperty(source, key)
    defineProperty(target, key, descriptor)
  }, keys(source))
  return target
})

export default assignProperties
