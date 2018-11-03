import endsWith from '../data/endsWith'

/**
 * Checks if `filePath` is classified as an `Archive`.
 *
 * @function
 * @since 0.0.16
 * @category fs
 * @param {*} filePath The value to check.
 * @returns {boolean} Returns `true` if `filePath` is an archive, else `false`.
 * @example
 *
 * isArchivePath('ok.zip') // => true
 *
 * isArray('./code') // => false
 */
const isArchivePath = (filePath) =>
  endsWith('.zip', filePath) ||
  endsWith('.jar', filePath) ||
  endsWith('.tar', filePath) ||
  endsWith('.rar', filePath) ||
  endsWith('.gz', filePath) ||
  endsWith('.bz2', filePath) ||
  endsWith('.7z', filePath)

export default isArchivePath
