/**
 * Logs the given values.
 *
 * Returns the first arg so that this method can be placed into a pipe.
 *
 * @function
 * @since v0.0.18
 * @category logging
 * @param {...*} values The values to log.
 * @returns {*} Returns the first value
 * @example
 *
 * log('foo', 'bar')
 * // logs: 'foobar'
 * //=> 'foo'
 *
 * pipe(
 *   () => 'foo',
 *   log,
 * )()
 * // logs: 'foo'
 * //=> 'foo'
 */
const log = (...values) => {
  // eslint-disable-next-line no-console
  console.log(...values)
  return values[0]
}

export default log
