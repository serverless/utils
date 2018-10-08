import fs from 'fs-extra'

const dirExists = async (dirPath) => {
  try {
    const stats = await fs.lstat(dirPath)
    return stats.isDirectory()
  } catch (error) {
    return false
  }
}

export default dirExists
