import fs from 'fs-extra'
import curry from '../common/curry'

const dirExists = curry(async (dirPath) => {
  try {
    const stats = await fs.lstat(dirPath)
    return stats.isDirectory()
  } catch (error) {
    return false
  }
})

export default dirExists
