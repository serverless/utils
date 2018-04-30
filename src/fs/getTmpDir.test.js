import dirExists from './dirExists'
import getTmpDir from './getTmpDir'

describe('#getTmpDir()', () => {
  it('should create and return a namespaced tmp directory path', async () => {
    const tmpDirPath = await getTmpDir()

    expect(tmpDirPath).toMatch(/.+tmpdirs-serverless.+/)
    expect(await dirExists(tmpDirPath)).toEqual(true)
  })
})
