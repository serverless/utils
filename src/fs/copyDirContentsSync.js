import fse from 'fs-extra'
import path from 'path'
import curry from '../common/curry'
import walkDirSync from './walkDirSync'

const copyDirContentsSync = curry((srcDir, destDir) => {
  const fullFilesPaths = walkDirSync(srcDir)

  fullFilesPaths.forEach((fullFilePath) => {
    const relativeFilePath = fullFilePath.replace(srcDir, '')
    fse.copySync(fullFilePath, path.join(destDir, relativeFilePath))
  })
})

export default copyDirContentsSync
