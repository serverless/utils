import getTag from './getTag'

const isString = (value) => {
  const type = typeof value
  return (
    type == 'string' ||
    (type == 'object' &&
      value != null &&
      !Array.isArray(value) &&
      getTag(value) == '[object String]')
  )
}

export default isString
