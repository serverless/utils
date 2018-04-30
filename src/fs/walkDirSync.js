import fse from 'fs-extra'
import path from 'path'
import { append, concat, reduce } from 'ramda'

const walkDirSync = (dirPath) => {
  const list = fse.readdirSync(dirPath)
  return reduce((filePaths, filePathParam) => {
    const filePath = path.join(dirPath, filePathParam)
    const stat = fse.statSync(filePath)
    if (stat && stat.isDirectory()) {
      return concat(filePaths, walkDirSync(filePath))
    }
    return append(filePath, filePaths)
  }, [], list)
}

export default walkDirSync
