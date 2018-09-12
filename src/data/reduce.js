import isGenerator from './isGenerator'
import isPromise from './isPromise'
import slice from './slice'

const generatorReduce = function*(iteratee, accumulator, array) {
  if (isGenerator(accumulator)) {
    accumulator = yield* accumulator
  } else if (isPromise(accumulator)) {
    accumulator = yield accumulator
  }
  const length = array == null ? 0 : array.length
  let idx = 0
  while (idx < length) {
    accumulator = iteratee(accumulator, array[idx], idx)
    if (isGenerator(accumulator)) {
      accumulator = yield* accumulator
    } else if (isPromise(accumulator)) {
      accumulator = yield accumulator
    }
    idx += 1
  }
  return accumulator
}

const asyncReduce = async (iteratee, accumulator, array) => {
  if (isPromise(accumulator)) {
    accumulator = await accumulator
  } else if (isGenerator(accumulator)) {
    return generatorReduce(iteratee, accumulator, array)
  }
  const length = array == null ? 0 : array.length
  let idx = 0
  while (idx < length) {
    accumulator = iteratee(accumulator, array[idx], idx)
    if (isPromise(accumulator)) {
      accumulator = await accumulator
    } else if (isGenerator(accumulator)) {
      return generatorReduce(iteratee, accumulator, slice(idx + 1, length, array))
    }
    idx += 1
  }
  return accumulator
}

const reduce = (iteratee, accumulator, array) => {
  if (isPromise(accumulator)) {
    return asyncReduce(iteratee, accumulator, array)
  } else if (isGenerator(accumulator)) {
    return generatorReduce(iteratee, accumulator, array)
  }
  const length = array == null ? 0 : array.length
  let idx = 0
  while (idx < length) {
    accumulator = iteratee(accumulator, array[idx], idx)
    if (isPromise(accumulator)) {
      return asyncReduce(iteratee, accumulator, slice(idx + 1, length, array))
    } else if (isGenerator(accumulator)) {
      return generatorReduce(iteratee, accumulator, slice(idx + 1, length, array))
    }
    idx += 1
  }
  return accumulator
}

export default reduce
