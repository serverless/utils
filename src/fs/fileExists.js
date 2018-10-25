import fse from 'fs-extra'
import curry from '../common/curry'

const fileExists = curry(async (filePath) => {
  try {
    const stats = await fse.lstat(filePath)
    return stats.isFile()
  } catch (error) {
    return false
  }
})

export default fileExists
