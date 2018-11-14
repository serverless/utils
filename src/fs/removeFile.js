import curry from '../common/curry'
import fse from 'fs-extra'

const removeFile = curry(async (filePath) => fse.remove(filePath))

export default removeFile
