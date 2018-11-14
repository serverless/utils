import allWith from '../common/allWith'
import arrayFromIterator from '../lang/arrayFromIterator'
import containsWith from './containsWith'
import curry from '../common/curry'
import has from './has'
import identical from '../common/identical'
import keys from './keys'
import toFunctionName from '../lang/toFunctionName'
import toType from '../lang/toType'

/**
 * private _uniqContentEquals function.
 * That function is checking equality of 2 iterator contents with 2 assumptions
 * - iterators lengths are the same
 * - iterators values are unique
 *
 * false-positive result will be returned for comparision of, e.g.
 * - [1,2,3] and [1,2,3,4]
 * - [1,1,1] and [1,2,3]
 */

const uniqContentEquals = (aIterator, bIterator, stackA, stackB, equalsFn) => {
  const arrayA = arrayFromIterator(aIterator)
  const arrayB = arrayFromIterator(bIterator)

  function eq(_a, _b) {
    // TODO BRN: Why are we cloning the arrays here?
    return equalsFn(_a, _b, stackA.slice(), stackB.slice())
  }

  // if *a* array contains any element that is not included in *b*
  return !containsWith(
    function(valueB, aItem) {
      return !containsWith(eq, aItem, valueB)
    },
    arrayB,
    arrayA
  )
}

const baseEquals = (valueA, valueB, stackA = [], stackB = []) => {
  if (identical(valueA, valueB)) {
    return true
  }

  const typeA = toType(valueA)

  if (typeA !== toType(valueB)) {
    return false
  }

  if (valueA == null || valueB == null) {
    return false
  }

  if (typeof valueA.equals === 'function' || typeof valueB.equals === 'function') {
    return (
      typeof valueA.equals === 'function' &&
      valueA.equals(valueB) &&
      typeof valueB.equals === 'function' &&
      valueB.equals(valueA)
    )
  }

  switch (typeA) {
    case 'Arguments':
    case 'Array':
    case 'Object':
      if (
        typeof valueA.constructor === 'function' &&
        toFunctionName(valueA.constructor) === 'Promise'
      ) {
        return valueA === valueB
      }
      break
    case 'Boolean':
    case 'Date':
    case 'Number':
    case 'String':
      if (!identical(valueA.valueOf(), valueB.valueOf())) {
        return false
      }
      break
    case 'Error':
      return valueA.name === valueB.name && valueA.message === valueB.message
    case 'RegExp':
      if (
        !(
          valueA.source === valueB.source &&
          valueA.global === valueB.global &&
          valueA.ignoreCase === valueB.ignoreCase &&
          valueA.multiline === valueB.multiline &&
          valueA.sticky === valueB.sticky &&
          valueA.unicode === valueB.unicode
        )
      ) {
        return false
      }
      break
  }

  let idx = stackA.length - 1
  while (idx >= 0) {
    if (stackA[idx] === valueA) {
      return stackB[idx] === valueB
    }
    idx -= 1
  }

  switch (typeA) {
    case 'Map':
      if (valueA.size !== valueB.size) {
        return false
      }

      return uniqContentEquals(
        valueA.entries(),
        valueB.entries(),
        stackA.concat([valueA]),
        stackB.concat([valueB]),
        baseEquals
      )
    case 'Set':
      if (valueA.size !== valueB.size) {
        return false
      }

      return uniqContentEquals(
        valueA.values(),
        valueB.values(),
        stackA.concat([valueA]),
        stackB.concat([valueB]),
        baseEquals
      )
    case 'Boolean':
      if (typeof valueA !== 'object') {
        valueA = new Boolean(valueA)
      }
      if (typeof valueB !== 'object') {
        valueB = new Boolean(valueB)
      }
    case 'Number':
      if (typeof valueA !== 'object') {
        valueA = new Number(valueA)
      }
      if (typeof valueB !== 'object') {
        valueB = new Number(valueB)
      }
    case 'String':
      if (typeof valueA !== 'object') {
        valueA = new String(valueA)
      }
      if (typeof valueB !== 'object') {
        valueB = new String(valueB)
      }
    case 'Arguments':
    case 'Array':
    case 'Object':
    case 'Date':
    case 'Error':
    case 'RegExp':
    case 'Int8Array':
    case 'Uint8Array':
    case 'Uint8ClampedArray':
    case 'Int16Array':
    case 'Uint16Array':
    case 'Int32Array':
    case 'Uint32Array':
    case 'Float32Array':
    case 'Float64Array':
    case 'ArrayBuffer':
      break
    default:
      // Values of other types are only equal if identical.
      return false
  }
  const keysA = keys(valueA)
  if (keysA.length !== keys(valueB).length) {
    return false
  }

  const extendedStackA = stackA.concat([valueA])
  const extendedStackB = stackB.concat([valueB])

  idx = keysA.length - 1
  while (idx >= 0) {
    const key = keysA[idx]
    if (
      !(has(key, valueB) && baseEquals(valueB[key], valueA[key], extendedStackA, extendedStackB))
    ) {
      return false
    }
    idx -= 1
  }
  return true
}

/**
 * Returns `true` if its arguments are equivalent, `false` otherwise. Handles cyclical data structures.
 *
 * Dispatches symmetrically to the `equals` methods of both arguments, if present.
 *
 * @function
 * @since v0.0.18
 * @category data
 * @param {*} valueA
 * @param {*} valueB
 * @returns {boolean}
 * @example
 *
 * equals(1, 1)
 * //=> true
 *
 * equals(1, '1')
 * //=> false
 *
 * equals([1, 2, 3], [1, 2, 3])
 * //=> true
 *
 * const a = {}
 * a.v = a
 * const b = {}
 * b.v = b
 * equals(a, b)
 * //=> true
 */
const equals = curry((valueA, valueB) =>
  allWith(([resolvedA, resolvedB]) => baseEquals(resolvedA, resolvedB), [valueA, valueB])
)

export default equals

export { baseEquals }
