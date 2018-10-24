import fse from 'fs-extra'
import YAML from 'js-yaml'
import path from 'path'
import curryN from '../common/curryN'
import isJsonPath from './isJsonPath'
import isYamlPath from './isYamlPath'

const formatContents = (filePath, contents, options) => {
  if (isJsonPath(filePath) && typeof contents !== 'string') {
    return JSON.stringify(contents, null, 2)
  }
  if (isYamlPath(filePath) && typeof contents !== 'string') {
    return YAML.dump(contents, options)
  }
  return contents
}

const writeFile = curryN(1, async (filePath, contents = '', options = {}) => {
  await fse.mkdirs(path.dirname(filePath))
  return fse.writeFile(filePath, formatContents(filePath, contents, options))
})

export default writeFile
