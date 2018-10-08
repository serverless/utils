import forEach from '../data/forEach'
import keys from '../data/keys'
import defineProperty from './defineProperty'
import getProperty from './getProperty'

/**
 * Clone the properties of an object assigning the property descriptors to the clone
 *
 *
 */
const cloneProperties = (source) => {
  const copy = {}
  forEach((key) => {
    const descriptor = getProperty(source, key)
    defineProperty(copy, key, descriptor)
  }, keys(source))
  return copy
}

export default cloneProperties
