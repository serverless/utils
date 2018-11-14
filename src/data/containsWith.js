import curry from '../common/curry'
import defn from '../common/defn'
import iterate from '../common/iterate'
import pipe from '../common/pipe'

const baseContainsWith = (predicate, value, collection) =>
  iterate(
    (next) =>
      pipe(
        (pNext) => {
          if (pNext.done) {
            return false
          }
          return predicate(value, pNext.value)
        },
        (result) => {
          if (result || next.done) {
            return {
              ...next,
              done: true,
              value: result
            }
          }
          return next
        }
      )(next),
    collection
  )

/**
 * Returns `true` if the given predicate returns true for at least one value in the given collection.
 *
 * @function
 * @since v0.0.18
 * @category data
 * @param {*} value The value to compare against.
 * @param {*} collection The collection to consider.
 * @returns {boolean} `true` if an equivalent item is in the list, `false` otherwise.
 * @example
 *
 * contains(3, [1, 2, 3]) //=> true
 * contains(4, [1, 2, 3]) //=> false
 * contains({ name: 'Fred' }, [{ name: 'Fred' }]) //=> true
 * contains([42], [[42]]) //=> true
 */
const containsWith = curry(defn('containsWith', baseContainsWith))

export default containsWith

export { baseContainsWith }
