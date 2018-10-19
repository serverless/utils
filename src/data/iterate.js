import isResolved from '../common/isResolved'
import resolveWith from '../common/resolveWith'
import getProp from './getProp'
import iterator from './iterator'

const getDone = getProp('done')
const getValue = getProp('value')

const resolveNext = (next, fn, iter, recur) =>
  resolveWith((resolvedNext) => {
    if (getDone(resolvedNext)) {
      return getValue(resolvedNext)
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
        if (getDone(next)) {
          return getValue(next)
        }
        return doSeriesIteration(fn, iter)
      }, next)
    }
    next = fn(next)
    if (!isResolved(next)) {
      return resolveNext(next, fn, iter, doSeriesIteration)
    }
    if (getDone(next)) {
      return getValue(next)
    }
  }
}

/**
 * This method iterates over the given collection or iterator in series. If the iterate method Returns done: true then the iteration will complete
 *
 * @function
 * @since v0.0.11
 * @category data
 * @param {Function} fn The iteratee Function
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
 */
const iterate = (fn, collection) => doSeriesIteration(fn, iterator(collection))

export default iterate
