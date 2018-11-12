import { join } from 'path'
import curry from '../common/curry'
import filter from '../data/filter'
import isDirectory from './isDirectory'
import map from '../data/map'
import readdir from './readdir'

const readdirDirectories = curry(async (dirPath) => {
  const paths = map((pathName) => join(dirPath, pathName), await readdir(dirPath))
  return filter(isDirectory, paths)
})

export default readdirDirectories
