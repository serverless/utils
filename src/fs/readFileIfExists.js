import fileExists from './fileExists'
import readFile from './readFile'

const readFileIfExists = async (filePath, options) => {
  if (await fileExists(filePath)) {
    return readFile(filePath, options)
  }
  return false
}

export default readFileIfExists
