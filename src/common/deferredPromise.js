import Promise from 'bluebird'

/**
 * Creates a promise with the resolve and reject methods exposed as properties
 * on the promise.
 *
 * @function
 * @since v0.0.3
 * @category common
 * @returns {Promise} The promise with exposed methods
 * @example
 *
 * const promise = deferredPromise()
 * // ... do something async then eventually resolve the promise
 * promise.resolve(someValue)
 */
const deferredPromise = () => {
  let rejectPromise
  let resolvePromise
  const promise = new Promise((resolve, reject) => {
    rejectPromise = reject
    resolvePromise = resolve
  })
  promise.reject = rejectPromise
  promise.resolve = resolvePromise
  return promise
}

export default deferredPromise
