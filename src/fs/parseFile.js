import YAML from 'js-yaml'
import { merge } from 'ramda'
import isJsonPath from './isJsonPath'
import isYamlPath from './isYamlPath'

const parseFile = (filePath, contents, options) => {
  if (isJsonPath(filePath)) {
    return JSON.parse(contents)
  } else if (isYamlPath(filePath)) {
    return YAML.load(
      contents.toString(),
      merge(options, { filename: filePath })
    )
  } else if (filePath.endsWith('.slsignore')) {
    return contents.toString().split('\n')
  }
  return contents.toString().trim()
}

export default parseFile
