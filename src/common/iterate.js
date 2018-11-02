import curry from './curry'
import isResolved from './isResolved'
import iterator from './iterator'
import resolveWith from './resolveWith'

const resolveNext = (next, fn, iter, recur) =>
  resolveWith((resolvedNext) => {
    if (resolvedNext.done) {
      return resolvedNext.value
    }
    return recur(fn, iter)
  }, next)

const doSeriesIteration = (fn, iter) => {
  while (true) {
    let next = iter.next()
    if (!isResolved(next)) {
      return resolveWith((resolvedNext) => {
        next = fn(resolvedNext)
        if (!isResolved(next)) {
          return resolveNext(next, fn, iter, doSeriesIteration)
        }
        if (next.done) {
          return next.value
        }
        return doSeriesIteration(fn, iter)
      }, next)
    }
    next = fn(next)
    if (!isResolved(next)) {
      return resolveNext(next, fn, iter, doSeriesIteration)
    }
    if (next.done) {
      return next.value
    }
  }
}

/**
 * This method iterates over the given collection or iterator in **series**. If the `iteratee` method returns `{ done: true }` then the iteration will complete.
 *
 * This method automatically upgrades to async. If the `iteratee` returns a Promise or a generator, this method will return a Promise or a generator. Values are iterated in order and if the iteratee returns a resolvable value the iteration will wait until that value resolves before continuing with the iteration.
 *
 * This method also supports async iterators. If an unresolved value is received from the iterator instead of an object with `value` and `done` properties, the iteration will wait for the value to resolve before continuing to the next iteration. This will also cause the method to upgrade to async and return a Promise.
 *
 * @function
 * @since v0.0.11
 * @category common
 * @param {Function} iteratee The iteratee Function
 * @param  {*} collection The collection or iterator to iterate over
 * @returns {*} The final value returned when the iteratee returns done or `undefined`
 * @example
 *
 * iterate((value, kdx) => {
 *   if (value === 'b') {
 *     return { done: true, value: kdx }
 *   }
 *   return { done: false }
 * }, ['a', 'b', 'c'])
 * //=> 1
 *
 * iterate(async (value, kdx) => new Promise((resolve, reject) => {
 *   setTimeout(() => {
 *     if (value === 'b') {
 *       return resolve({ done: true, value: kdx })
 *     }
 *     return resolve({ done: false })
 *   }, 0)
 * }), ['a', 'b', 'c'])
 * //=> 1
 */
const iterate = curry((iteratee, collection) => doSeriesIteration(iteratee, iterator(collection)))

export default iterate
