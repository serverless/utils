import curry from './curry'
import defn from './defn'

/**
 * See if an object (`val`) is an instance of the supplied constructor. This function will check up the inheritance chain, if any.
 *
 * @func
 * @since v0.0.3
 * @category data
 * @sig (* -> {*}) -> a -> boolean
 * @param {Object} constructor A constructor
 * @param {*} value The value to test
 * @return {boolean}
 * @example
 *
 * is(Object, {}); //=> true
 * is(Number, 1); //=> true
 * is(Object, 1); //=> false
 * is(String, 's'); //=> true
 * is(String, new String('')); //=> true
 * is(Object, new String('')); //=> true
 * is(Object, 's'); //=> false
 * is(Number, {}); //=> false
 */
const is = curry(
  defn('is', (construtor, value) => {
    return (value != null && value.constructor === construtor) || value instanceof construtor
  })
)

export default is
