import { keys as rKeys } from 'ramda'
import arrayLikeKeys from './arrayLikeKeys'
import concat from './concat'
import isArrayLike from './isArrayLike'
import isMap from './isMap'

const keys = (collection) => {
  if (isArrayLike(collection)) {
    return arrayLikeKeys(collection)
  }

  if (isMap(collection)) {
    return Array.from(collection.keys())
  }

  if (typeof Reflect !== 'undefined' && typeof Reflect.ownKeys === 'function') {
    return Reflect.ownKeys(collection)
  }

  let ownKeys = rKeys(collection)

  if (typeof Object.getOwnPropertySymbols === 'function') {
    ownKeys = concat(ownKeys, Object.getOwnPropertySymbols(collection))
  }

  return ownKeys
}

export default keys
