import endsWith from '../data/endsWith'

const isYamlPath = (filePath) => endsWith('.yml', filePath) || endsWith('.yaml', filePath)

export default isYamlPath
