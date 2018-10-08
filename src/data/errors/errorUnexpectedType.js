import error from '../../error/error'

const errorUnexpectedType = (expectedType, value) =>
  error(`Expected the type ${expectedType} but instead found ${value}`, { type: 'UnexpectedType' })

export default errorUnexpectedType
