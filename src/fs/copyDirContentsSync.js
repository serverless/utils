import curry from '../common/curry'
import fse from 'fs-extra'
import path from 'path'
import walkDirSync from './walkDirSync'

/**
 * Coppies the contents of one directory to another synchronously
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
const copyDirContentsSync = curry((srcDir, destDir) => {
  const fullFilesPaths = walkDirSync(srcDir)

  fullFilesPaths.forEach((fullFilePath) => {
    const relativeFilePath = fullFilePath.replace(srcDir, '')
    fse.copySync(fullFilePath, path.join(destDir, relativeFilePath))
  })
})

export default copyDirContentsSync
