import indexEndOffset from './indexEndOffset'
import isArrayLike from './isArrayLike'
import isGenerator from './isGenerator'
import isPromise from './isPromise'

const generatorReduce = function*(arrayLike, accum, iteratee, index) {
  if (isGenerator(accum)) {
    accum = yield* accum
  }
  const { length } = arrayLike
  while (index < length) {
    accum = iteratee(accum, arrayLike[index], index)
    if (isGenerator(accum)) {
      accum = yield* accum
    } else if (isPromise(accum)) {
      accum = yield accum
    }
    index += 1
  }
  return accum
}

const doArrayLikeReduce = (arrayLike, accum, iteratee, index = 0) => {
  const { length } = arrayLike
  if (isPromise(accum)) {
    return accum.then((resolvedAccum) =>
      doArrayLikeReduce(arrayLike, resolvedAccum, iteratee, index)
    )
  } else if (isGenerator(accum)) {
    return generatorReduce(arrayLike, accum, iteratee, index)
  }
  while (index < length) {
    accum = iteratee(accum, arrayLike[index], index)
    if (isPromise(accum)) {
      return accum.then((resolvedAccum) =>
        doArrayLikeReduce(arrayLike, resolvedAccum, iteratee, index + 1)
      )
    } else if (isGenerator(accum)) {
      return generatorReduce(arrayLike, accum, iteratee, index + 1)
    }
    index += 1
  }
  return accum
}

const arrayLikeReduce = (arrayLike, accum, iteratee, index = 0) => {
  if (!isArrayLike(arrayLike)) {
    throw new TypeError(
      `arrayLikeReduce expected an array like value. Instead it received ${arrayLike}`
    )
  }
  const { length } = arrayLike
  index = indexEndOffset(index, length)
  return doArrayLikeReduce(arrayLike, accum, iteratee, index)
}

export default arrayLikeReduce
