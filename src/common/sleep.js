import curry from './curry'

/**
 * Sleeps for the given amount of `wait` milliseconds before resolving the returned `Promise`
 *
 * @function
 * @since v0.0.4
 * @category common
 * @sig sleep(
 *   wait: number
 * ): Promise
 * @param {number} wait The number of milliseconds to wait before resoliving the Promise
 * @returns {Promise} Resolves once the given amount of time has ellapsed.
 * @example
 *
 * await sleep(1000)
 * // 1000+ milliseconds later
 */
const sleep = curry(async (wait) => new Promise((resolve) => setTimeout(() => resolve(), wait)))

export default sleep
