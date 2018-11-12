import arrayForEach from './arrayForEach'
import objectDefineProperty from './objectDefineProperty'
import objectGetOwnPropertyDescriptor from './objectGetOwnPropertyDescriptor'
import reflectOwnKeys from './reflectOwnKeys'

const assignPropertyDescriptors = (target, source) => {
  arrayForEach(reflectOwnKeys(source), (key) => {
    const descriptor = objectGetOwnPropertyDescriptor(source, key)
    objectDefineProperty(target, key, descriptor)
  })
  return target
}

export default assignPropertyDescriptors
