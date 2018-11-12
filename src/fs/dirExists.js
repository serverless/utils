import curry from '../common/curry'
import fs from 'fs-extra'

/**
 * Determines if the given directory exists.
 *
 * This dire
 *
 * Auto curried with placeholder support
 *
 * @function
 * @since v0.0.17
 * @category fs
 * @param {string} srcDir
 * @returns {undefined} None
 * @example
 *
 * copyDirContentsSync('./some/dir', './target/dir')
 */
const dirExists = curry(async (dirPath) => {
  try {
    const stats = await fs.lstat(dirPath)
    return stats.isDirectory()
  } catch (error) {
    return false
  }
})

export default dirExists
