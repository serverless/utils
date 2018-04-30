import fileExists from './fileExists'
import readFile from './readFile'

const readFileIfExists = async (filePath) => {
  if (await fileExists(filePath)) {
    return readFile(filePath)
  }
  return false
}

export default readFileIfExists
