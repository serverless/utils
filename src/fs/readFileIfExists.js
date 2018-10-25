import curryN from '../common/curryN'
import fileExists from './fileExists'
import readFile from './readFile'

const readFileIfExists = curryN(1, async (filePath, options = {}) => {
  if (await fileExists(filePath)) {
    return readFile(filePath, options)
  }
  return false
})

export default readFileIfExists
