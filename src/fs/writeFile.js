import fse from 'fs-extra'
import YAML from 'js-yaml'
import path from 'path'
import isJsonPath from './isJsonPath'
import isYamlPath from './isYamlPath'

const formatContents = (filePath, contents) => {
  if (isJsonPath(filePath) && typeof contents !== 'string') {
    return JSON.stringify(contents, null, 2)
  }
  if (isYamlPath(filePath) && typeof contents !== 'string') {
    return YAML.dump(contents)
  }
  return contents
}

const writeFile = async (filePath, contents = '') => {
  await fse.mkdirs(path.dirname(filePath))
  return fse.writeFile(filePath, formatContents(filePath, contents))
}

export default writeFile
