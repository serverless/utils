import curry from '../common/curry'
import fse from 'fs-extra'

const fileExists = curry(async (filePath) => {
  try {
    const stats = await fse.lstat(filePath)
    return stats.isFile()
  } catch (error) {
    return false
  }
})

export default fileExists
