import fse from 'fs-extra'

const removeFile = async (filePath) => fse.remove(filePath)

export default removeFile
