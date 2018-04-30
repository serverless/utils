import fse from 'fs-extra'
import parseFile from './parseFile'

const readFile = async (filePath) => {
  const contents = await fse.readFile(filePath, 'utf8')
  return parseFile(filePath, contents)
}

export default readFile
