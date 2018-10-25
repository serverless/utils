import { SYMBOL_ITERATOR } from '../constants'
import arrayLikeIterator from '../base/arrayLikeIterator'
import isArrayLike from '../base/isArrayLike'
import isIterable from '../base/isIterable'
import isIterator from '../base/isIterator'
import isObjectLike from '../base/isObjectLike'
import objectIterator from '../base/objectIterator'
import curry from './curry'

// TODO BRN: Move this to the common folder
/**
 * This method generates an iterator for the given value
 *
 * @function
 * @since v0.0.11
 * @category common
 * @param {Function} fn The iteratee Function
 * @param  {*} collection The collection or iterator to iterate over
 * @returns {*} The final value returned when the iteratee returns done or `undefined`
 * @example
 *
 * iterator(['a', 'b', 'c'])
 * //=> { next: () => { value: string, index: number, kdx: umber, done: boolean }}
 *
 * iterator('abc')
 * //=> { next: () => { value: string, index: number, kdx: umber, done: boolean }}
 *
 * iterator({ a: 1, b: 2, c: 3 })
 * //=> { next: () => { value: number, key: string, kdx: string, done: boolean }}
 */
const iterator = curry((value, start = 'START') => {
  if (isIterator(value)) {
    return value
  }
  if (isArrayLike(value)) {
    return arrayLikeIterator(value, start)
  }
  if (isIterable(value)) {
    return value[SYMBOL_ITERATOR]()
  }
  if (isObjectLike(value)) {
    return objectIterator(value, start)
  }
  throw new Error(
    `iterator method expected to receive an iterable value. Instead the method was given ${value}.`
  )
})

iterator.END = 'END'
iterator.START = 'START'

export default iterator
