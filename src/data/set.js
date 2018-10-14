import defn from '../common/defn'
import assoc from './assoc'

/**
 * This method is an alias for `assoc`
 *
 * Makes a shallow clone of an object, setting or overriding the specified property with the given value. Note that this copies and flattens prototype properties onto the new object as well. All non-primitive properties are copied by reference.
 *
 * Supports path based property selectors 'foo.bar' and functional selectors which performs an 'over' on the entire collection and sets each matching selector to the given value.
 *
 * dispatches to the `set` method of the 3rd argument if available
 *
 * @function
 * @since v0.0.3
 * @category data
 * @sig String -> a -> {k: v} -> {k: v}
 * @param {Array | String | Function} selector The property path to set or functional selector
 * @param {*} value The new value
 * @param {*} collection The collection to clone and assign the new value
 * @returns {*} A new collection equivalent to the original except for the changed selector path.
 * @example
 *
 * set('c', 3, {a: 1, b: 2})          //=> {a: 1, b: 2, c: 3}
 * set('c.d', 3, {a: 1, b: 2})        //=> {a: 1, b: 2, c: { d: 3 }}
 * set([ 'c', 'd' ], 3, {a: 1, b: 2}) //=> {a: 1, b: 2, c: { d: 3 }}
 */
const set = defn('set', assoc)

export default set
