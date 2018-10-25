import indexEndOffset from './indexEndOffset'
import isArrayLike from './isArrayLike'
import isGenerator from './isGenerator'
import isInteger from './isInteger'
import isPromise from './isPromise'

const generatorReduceRight = function*(arrayLike, accum, iteratee, index) {
  if (isGenerator(accum)) {
    accum = yield* accum
  }
  while (index >= 0) {
    accum = iteratee(accum, arrayLike[index], index)
    if (isGenerator(accum)) {
      accum = yield* accum
    } else if (isPromise(accum)) {
      accum = yield accum
    }
    index -= 1
  }
  return accum
}

const doArrayLikeReduceRight = (arrayLike, accum, iteratee, index) => {
  if (isPromise(accum)) {
    return accum.then((resolvedAccum) =>
      doArrayLikeReduceRight(arrayLike, resolvedAccum, iteratee, index)
    )
  } else if (isGenerator(accum)) {
    return generatorReduceRight(arrayLike, accum, iteratee, index)
  }
  while (index >= 0) {
    accum = iteratee(accum, arrayLike[index], index)
    if (isPromise(accum)) {
      return accum.then((resolvedAccum) =>
        doArrayLikeReduceRight(arrayLike, resolvedAccum, iteratee, index - 1)
      )
    } else if (isGenerator(accum)) {
      return generatorReduceRight(arrayLike, accum, iteratee, index - 1)
    }
    index -= 1
  }
  return accum
}

const arrayLikeReduceRight = (arrayLike, accum, iteratee, index) => {
  if (!isArrayLike(arrayLike)) {
    throw new TypeError(
      `arrayLikeReduceRight expected an array like value. Instead it received ${arrayLike}`
    )
  }
  const { length } = arrayLike
  index = isInteger(index) ? index : length - 1
  index = indexEndOffset(index, length)
  return doArrayLikeReduceRight(arrayLike, accum, iteratee, index)
}

export default arrayLikeReduceRight
