import { createReadStream, createWriteStream } from 'fs-extra'
import archiver from 'archiver'
import contains from '../data/contains'
import curryN from '../common/curryN'
import forEach from '../data/forEach'
import isEmpty from '../logic/isEmpty'
import last from '../data/last'
import path from 'path'
import readFileIfExists from './readFileIfExists'
import split from '../data/split'

const VALID_FORMATS = ['zip', 'tar']
const isValidFormat = (format) => contains(format, VALID_FORMATS)

const packDir = curryN(2, async (inputDirPath, outputFilePath, append = []) => {
  const format = last(split('.', outputFilePath))

  if (!isValidFormat(format)) {
    throw new Error('Please provide a valid format. Either a "zip" or a "tar"')
  }

  const ignore = (await readFileIfExists(path.join(inputDirPath, '.slsignore'))) || []
  return new Promise((resolve, reject) => {
    const output = createWriteStream(outputFilePath)
    const archive = archiver(format, {
      zlib: { level: 9 }
    })

    output.on('open', () => {
      archive.pipe(output)

      if (!isEmpty(append)) {
        forEach((file) => {
          const stream = createReadStream(file)
          archive.append(stream, { name: path.basename(file) })
        }, append)
      }

      archive.glob(
        '**/*',
        {
          cwd: inputDirPath,
          ignore
        },
        {}
      )
      archive.finalize()
    })

    archive.on('error', (err) => reject(err))
    output.on('close', () => resolve(outputFilePath))
  })
})

export default packDir
