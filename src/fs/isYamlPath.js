import { endsWith } from 'ramda'

const isYamlPath = (filePath) => endsWith('.yml', filePath) || endsWith('.yaml', filePath)

export default isYamlPath
