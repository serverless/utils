import YAML from 'js-yaml'
import curryN from '../common/curryN'
import merge from '../data/merge'
import isJsonPath from './isJsonPath'
import isYamlPath from './isYamlPath'

const parseFile = curryN(2, (filePath, contents, options = {}) => {
  if (isJsonPath(filePath)) {
    return JSON.parse(contents)
  } else if (isYamlPath(filePath)) {
    return YAML.load(contents.toString(), merge(options, { filename: filePath }))
  } else if (filePath.endsWith('.slsignore')) {
    return contents.toString().split('\n')
  }
  return contents.toString().trim()
})

export default parseFile
