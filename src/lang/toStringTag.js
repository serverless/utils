import baseGetTag from './baseGetTag'

// TODO BRN: Merge this work with toType

/** `Object#toString` result references. */
const dataViewTag = '[object DataView]'
const mapTag = '[object Map]'
const objectTag = '[object Object]'
const promiseTag = '[object Promise]'
const setTag = '[object Set]'
const weakMapTag = '[object WeakMap]'

/** Used to detect maps, sets, and weakmaps. */
const dataViewCtorString = `${DataView}`
const mapCtorString = `${Map}`
const promiseCtorString = `${Promise}`
const setCtorString = `${Set}`
const weakMapCtorString = `${WeakMap}`

/**
 * Returns a string valued property that is used in the creation of the default string description of an object.
 *
 * See [toStringTag Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) for more information
 *
 * @function
 * @since v0.0.17
 * @category lang
 * @param {*} val The value to get the tag for
 * @return {string} The string tag of the value
 * @example
 *
 * toStringTag(undefined)
 * // => '[object Undefined]'
 *
 * toStringTag({})
 * // => '[object Object]'
 */
let toStringTag = baseGetTag

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if (
  (DataView && toStringTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
  toStringTag(new Map()) != mapTag ||
  toStringTag(Promise.resolve()) != promiseTag ||
  toStringTag(new Set()) != setTag ||
  toStringTag(new WeakMap()) != weakMapTag
) {
  toStringTag = (value) => {
    const result = baseGetTag(value)
    const Ctor = result == objectTag ? value.constructor : undefined
    const ctorString = Ctor ? `${Ctor}` : ''

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag
        case mapCtorString:
          return mapTag
        case promiseCtorString:
          return promiseTag
        case setCtorString:
          return setTag
        case weakMapCtorString:
          return weakMapTag
      }
    }
    return result
  }
}

export default toStringTag
