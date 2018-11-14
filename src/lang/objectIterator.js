import isObject from './isObject'
import reflectOwnKeys from './reflectOwnKeys'
import toString from './toString'

const iterAt = (index, keys, object) => {
  if (index < keys.length && index >= 0) {
    const key = keys[index]
    return {
      value: object[key],
      key,
      kdx: key,
      done: false
    }
  }
  return {
    done: true
  }
}

const prevIterAt = (index, keys, object) => {
  if (index < keys.length && index >= 0) {
    const key = keys[index]
    return {
      value: object[key],
      key,
      kdx: key,
      done: false
    }
  }
}

/**
 * Returns iterator for an object's keys and values.
 *
 * Note, iterates over object's own keys and symbols
 *
 * @function
 * @since v0.0.11
 * @category lang
 * @param {*} object The array object to create an iterator for.
 * @return {Iterator} A new iterator for the given object's keys and values
 * @example
 *
 * objectIterator({
 *   write: 'more',
 *   tests: 'asap',
 *   [Symbol('like')]: 'now'
 * })
 * //=> {
 * //   next: () => ({
 * //     value: *,
 * //     done: boolean,
 * //     kdx: string,
 * //     key: string
 * //   })
 * // }
 *
 * iter.next()
 * //=> { value: 'more', key: 'write', kdx: 'write', done: false }
 * iter.next()
 * //=> { value: 'asap', key: 'tests', kdx: 'tests', done: false }
 * iter.next()
 * //=> { value: 'now', key: Symbol('like'), kdx: Symbol('like'), done: false }
 * iter.next()
 * //=> { done: true }
 */
const objectIterator = (object, start = 'START') => {
  if (!isObject(object)) {
    throw new TypeError(
      `objectIterator expected object to be an Object. Instead received ${toString(object)}`
    )
  }

  const keys = reflectOwnKeys(object)
  let index = 0

  if (start === 'END') {
    index = keys.length
  }

  return {
    next: () => {
      const iter = iterAt(index, keys, object)
      const prev = prevIterAt(index - 1, keys, object)
      if (index < keys.length) {
        index += 1
      }
      return {
        ...iter,
        prev
      }
    },
    previous: () => {
      const iter = iterAt(index - 1, keys, object)
      const prev = prevIterAt(index, keys, object)
      if (index >= 0) {
        index -= 1
      }
      return {
        ...iter,
        prev
      }
    }
  }
}

export default objectIterator
