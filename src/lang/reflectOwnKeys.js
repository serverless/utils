import arrayConcat from './arrayConcat'
import objectGetOwnPropertySymbols from './objectGetOwnPropertySymbols'
import objectKeys from './objectKeys'

const reflectOwnKeys = (object) => {
  if (typeof Reflect !== 'undefined' && typeof Reflect.ownKeys === 'function') {
    return Reflect.ownKeys(object)
  }

  return arrayConcat(objectKeys(object), objectGetOwnPropertySymbols(object))
}

export default reflectOwnKeys
