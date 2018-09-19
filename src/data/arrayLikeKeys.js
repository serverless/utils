import isArguments from './isArguments'
import isBuffer from './isBuffer'
import isIndex from './isIndex'
import isTypedArray from './isTypedArray'

/** Used to check objects for own properties. */
const { hasOwnProperty } = Object.prototype

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @func
 * @since v0.0.3
 * @category data
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
const arrayLikeKeys = (value, inherited) => {
  const isArr = Array.isArray(value)
  const isArg = !isArr && isArguments(value)
  const isBuff = !isArr && !isArg && isBuffer(value)
  const isType = !isArr && !isArg && !isBuff && isTypedArray(value)
  const skipIndexes = isArr || isArg || isBuff || isType
  const { length } = value
  const result = new Array(skipIndexes ? length : 0)
  let index = skipIndexes ? -1 : length
  while (++index < length) {
    result[index] = `${index}`
  }
  for (const key in value) {
    if (
      (inherited || hasOwnProperty.call(value, key)) &&
      !(
        skipIndexes &&
        // Safari 9 has enumerable `arguments.length` in strict mode.
        (key == 'length' ||
        // Node.js 0.10 has enumerable non-index properties on buffers.
        (isBuff && (key == 'offset' || key == 'parent')) ||
        // PhantomJS 2 has enumerable non-index properties on typed arrays.
        (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) || // Skip index properties.
          isIndex(key, length))
      )
    ) {
      result.push(key)
    }
  }
  return result
}

export default arrayLikeKeys
