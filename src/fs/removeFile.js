import fse from 'fs-extra'
import curry from '../common/curry'

const removeFile = curry(async (filePath) => fse.remove(filePath))

export default removeFile
