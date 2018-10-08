import throwable from './throwable'

const error = (message, { data, reasons, type }) => throwable({ message, data, reasons, type })

export default error
