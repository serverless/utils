/**
 * The Symbol.iterator well-known symbol specifies the default iterator for an object. Used by for...of.
 *
 * See [Symbol.iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator) for more information.
 *
 * @type {Symbol}
 * @since 0.0.11
 * @category constants
 */
const SYMBOL_ITERATOR = typeof Symbol !== 'undefined' ? Symbol.iterator : '@@iterator'

export default SYMBOL_ITERATOR
