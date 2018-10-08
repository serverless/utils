import { join } from 'path'
import filter from '../data/filter'
import isDirectory from './isDirectory'
import readdir from './readdir'

const readdirDirectoryNames = async (dirPath) => {
  const pathNames = await readdir(dirPath)
  return filter(async (pathName) => isDirectory(join(dirPath, pathName)), pathNames)
}

export default readdirDirectoryNames
