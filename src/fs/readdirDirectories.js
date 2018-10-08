import { join } from 'path'
import filter from '../data/filter'
import map from '../data/map'
import isDirectory from './isDirectory'
import readdir from './readdir'

const readdirDirectories = async (dirPath) => {
  const paths = map((pathName) => join(dirPath, pathName), await readdir(dirPath))
  return filter(isDirectory, paths)
}

export default readdirDirectories
