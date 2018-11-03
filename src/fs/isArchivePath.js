import endsWith from '../data/endsWith'

const isArchivePath = (filePath) =>
  endsWith('.zip', filePath) ||
  endsWith('.jar', filePath) ||
  endsWith('.tar', filePath) ||
  endsWith('.rar', filePath) ||
  endsWith('.gz', filePath) ||
  endsWith('.bz2', filePath) ||
  endsWith('.7z', filePath)

export default isArchivePath
