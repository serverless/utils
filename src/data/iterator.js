import { SYMBOL_ITERATOR } from '../constants'
import arrayIterator from './arrayIterator'
import isArrayLike from './isArrayLike'
import isIterable from './isIterable'
import isIterator from './isIterator'
import isObjectLike from './isObjectLike'
import objectIterator from './objectIterator'

/**
 * This method generates an iterator for the given value
 *
 * @function
 * @since v0.0.11
 * @category data
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
const iterator = (value) => {
  if (isIterator(value)) {
    return value
  }
  if (isArrayLike(value)) {
    return arrayIterator(value)
  }
  if (isIterable(value)) {
    return value[SYMBOL_ITERATOR]()
  }
  if (isObjectLike(value)) {
    return objectIterator(value)
  }
  throw new Error(
    `iterator method expected to receive an iterable value. Instead the method was given ${value}.`
  )
}

export default iterator
