import fse from 'fs-extra'

const fileExists = async (filePath) => {
  try {
    const stats = await fse.lstat(filePath)
    return stats.isFile()
  } catch (error) {
    return false
  }
}

export default fileExists
