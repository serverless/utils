import { ensureDir } from 'fs-extra'
import { join } from 'path'
import { randomBytes } from 'crypto'
import { tmpdir } from 'os'
import curry from '../common/curry'

const getTmpDir = curry(async () => {
  const tmpDirPath = join(tmpdir(), 'tmpdirs-serverless', randomBytes(8).toString('hex'))

  await ensureDir(tmpDirPath)

  return tmpDirPath
})

export default getTmpDir
