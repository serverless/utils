import fse from 'fs-extra'

const dirExists = async (dirPath) => {
  try {
    const stats = await fse.lstat(dirPath)
    return stats.isDirectory()
  } catch (error) {
    return false
  }
}

export default dirExists
