import curry from '../common/curry'
import defn from '../common/defn'
import equals from './equals'
import isFunction from '../lang/isFunction'
import isNaN from '../lang/isNaN'
import toType from '../lang/toType'

const baseIndexOfAtIndex = (value, index, list) => {
  let inf
  let item
  const { length } = list
  // Array.prototype.indexOf doesn't exist below IE9
  if (isFunction(list.indexOf)) {
    switch (toType(value)) {
      case 'Number':
        if (value === 0) {
          // manually crawl the list to distinguish between +0 and -0
          inf = 1 / value
          while (index < length) {
            item = list[index]
            if (item === 0 && 1 / item === inf) {
              return index
            }
            index += 1
          }
          return -1
        } else if (isNaN(value)) {
          while (index < list.length) {
            item = list[index]
            if (isNaN(item)) {
              return index
            }
            index += 1
          }
          return -1
        }
        // non-zero numbers can utilise Set
        return list.indexOf(value, index)

      // all these types can utilise Set
      case 'String':
      case 'Boolean':
      case 'Function':
      case 'Undefined':
        return list.indexOf(value, index)

      case 'Null':
        // null can utilise Set
        return list.indexOf(value, index)
    }
  }
  // anything else not covered above, defer to R.equals
  while (index < length) {
    if (equals(list[index], value)) {
      return index
    }
    index += 1
  }
  return -1
}

/**
 * Returns the position of the first occurrence of an item in an array, or -1 if the item is not included in the array. [`equals`](#equals) is used to determine equality.
 *
 * This method automatically upgrades to async if any of the parameters are a Promise
 *
 * @function
 * @since v0.0.18
 * @category data
 * @param {*} value The value to find.
 * @param {Array} list The list to search in.
 * @param {number} index The index to start at.
 * @return {Number} the index of the value, or -1 if the value is not found.
 * @example
 *
 * indexOfAtIndex(3, 0, [1,2,3,4]) //=> 2
 * indexOfAtIndex(3, 3, [1,2,3,4]) //=> -1
 */
const indexOfAtIndex = curry(defn('indexOfAtIndex', baseIndexOfAtIndex))

export default indexOfAtIndex

export { baseIndexOfAtIndex }
