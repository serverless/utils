import curry from '../common/curry'
import isArray from './isArray'
import isFunction from './isFunction'
import isPromise from './isPromise'
import isString from './isString'
import toString from './toString'

/**
 * Returns the result of concatenating the given lists or strings.
 *
 * Note: `concat` expects both arguments to be of the same type,
 * unlike the native `Array.prototype.concat` method. It will throw
 * an error if you `concat` an Array with a non-Array value.
 *
 * Dispatches to the `concat` method of the first argument, if present.
 *
 * Supports Promises. If a Promise is received for either parameter than the entire method will upgrade to async and return a Promise.
 *
 * @function
 * @since v0.0.6
 * @category data
 * @param {Array|String|Promise} firstList The first list
 * @param {Array|String|Promise} secondList The second list
 * @returns {Array|String} A list consisting of the elements of `firstList` followed by the elements of `secondList`.
 *
 * @example
 *
 * concat('ABC', 'DEF') // 'ABCDEF'
 * concat([4, 5, 6], [1, 2, 3]) //=> [4, 5, 6, 1, 2, 3]
 * concat([], []) //=> []
 * await concat(Promise.resolve([4, 5, 6]), Promise.resolve([1, 2, 3])) //=> [4, 5, 6, 1, 2, 3]
 */
const concat = curry((firstList, secondList) => {
  if (isPromise(firstList)) {
    return firstList.then((resolvedFirstList) => concat(resolvedFirstList, secondList))
  }
  if (isPromise(secondList)) {
    return secondList.then((resolvedSecondList) => concat(firstList, resolvedSecondList))
  }
  if (isArray(firstList)) {
    if (isArray(secondList)) {
      return firstList.concat(secondList)
    }
    throw new TypeError(`${toString(secondList)} is not an array`)
  }
  if (isString(firstList)) {
    if (isString(secondList)) {
      return firstList + secondList
    }
    throw new TypeError(`${toString(secondList)} is not a string`)
  }
  if (firstList != null && isFunction(firstList.concat)) {
    return firstList.concat(secondList)
  }
  throw new TypeError(`${toString(firstList)} does not have a method named "concat"`)
})

export default concat
