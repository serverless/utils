import __ from '../common/__'
import findPath from './findPath'

describe('findPath', () => {
  test('finds the first string path', () => {
    expect(findPath(null, '/')).toBe('/')
    expect(findPath('/foo', '/bar')).toBe('/foo')
  })

  test('returns undefined if no path is found', () => {
    expect(findPath(null, true, {})).toBe(undefined)
  })

  test('curries method with placeholder', () => {
    const findPathPlaceholder = findPath(__)
    expect(findPathPlaceholder('/foo')).toBe('/foo')
  })
})
