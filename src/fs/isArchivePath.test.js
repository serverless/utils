import isArchivePath from './isArchivePath'

describe('isArchivePath', () => {
  test('identifies archive', () => {
    expect(isArchivePath('ok_file.zip')).toBe(true)
    expect(isArchivePath('ok_file.jar')).toBe(true)
    expect(isArchivePath('ok_file.tar')).toBe(true)
    expect(isArchivePath('ok_file.rar')).toBe(true)
    expect(isArchivePath('ok_file.gz')).toBe(true)
    expect(isArchivePath('ok_file.bz2')).toBe(true)
    expect(isArchivePath('ok_file.7z')).toBe(true)
  })

  test('returns false for all other values', () => {
    expect(isArchivePath(null)).toBe(false)
    expect(isArchivePath(undefined)).toBe(false)
    expect(isArchivePath(new String('xyz'))).toBe(false)
    expect(isArchivePath('./code')).toBe(false)
    expect(isArchivePath('file.js')).toBe(false)
  })
})
