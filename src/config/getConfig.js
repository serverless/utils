import createConfig from './createConfig'
import getServerlessrcPath from './getServerlessrcPath'
import fileExists from '../fs/fileExists'

const getConfig = async () => {
  if (!await fileExists(getServerlessrcPath())) {
    createConfig()
  }
  return require('rc')('serverless')
}

export default getConfig
