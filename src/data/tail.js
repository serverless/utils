import curry from './curry'
import defn from './defn'
import slice from './slice'

/**
 * Returns all but the first element of the given list or string (or object
 * with a `tail` method).
 *
 * Dispatches to the `slice` method of the first argument, if present.
 *
 * @func
 * @since v0.0.5
 * @category data
 * @sig [a] -> [a]
 * @param {*} collection The collection to get the tail of
 * @returns {*} The tail of the given collection
 * @example
 *
 * tail([1, 2, 3]);  //=> [2, 3]
 * tail([1, 2]);     //=> [2]
 * tail([1]);        //=> []
 * tail([]);         //=> []
 *
 * tail('abc');  //=> 'bc'
 * tail('ab');   //=> 'b'
 * tail('a');    //=> ''
 * tail('');     //=> ''
 */
const tail = curry(defn('tail', slice(1, Infinity)))

export default tail
