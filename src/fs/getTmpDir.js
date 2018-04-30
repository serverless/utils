import crypto from 'crypto'
import fse from 'fs-extra'
import os from 'os'
import path from 'path'

const getTmpDir = async () => {
  const tmpDirPath = path.join(
    os.tmpdir(),
    'tmpdirs-serverless',
    crypto.randomBytes(8).toString('hex')
  )

  await fse.ensureDir(tmpDirPath)

  return tmpDirPath
}

export default getTmpDir
