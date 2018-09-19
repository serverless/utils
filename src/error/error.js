import throwable from './throwable'

const error = (message, reasons) => throwable({ message, reasons })

export default error
