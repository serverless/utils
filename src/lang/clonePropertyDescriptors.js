import arrayForEach from './arrayForEach'
import objectDefineProperty from './objectDefineProperty'
import objectGetOwnPropertyDescriptor from './objectGetOwnPropertyDescriptor'
import reflectOwnKeys from './reflectOwnKeys'

/**
 * Clone the properties of an object assigning the property descriptors to the clone
 *
 *
 */
const clonePropertyDescriptors = (source) => {
  const copy = {}
  arrayForEach(reflectOwnKeys(source), (key) => {
    const descriptor = objectGetOwnPropertyDescriptor(source, key)
    objectDefineProperty(copy, key, descriptor)
  })
  return copy
}

export default clonePropertyDescriptors
