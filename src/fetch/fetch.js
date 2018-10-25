import crossFetch from 'cross-fetch'
import curryN from '../common/curryN'

/**
 * Fetch provides a generic definition of Request and Response objects (and other things involved with network requests). This will allow them to be used wherever they are needed in the future, whether it’s for service workers, Cache API and other similar things that handle or modify requests and responses, or any kind of use case that might require you to generate your own responses programmatically.
 *
 * See the [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) API docs for more information.
 *
 * Auto curried with placeholder support
 *
 * @function
 * @since v0.0.6
 * @category fetch
 * @param {string} url
 * @returns {Promise<Response>} the web request response
 * @example
 *
 * const response = await fetch('http://example.com/movies.json')
 * const data = await response.json()
 * console.log(JSON.stringify(data))
 */
const fetch = curryN(1, crossFetch)

export default fetch
