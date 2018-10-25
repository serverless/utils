import curryN from '../common/curryN'

const generateStackTrace = curryN(1, (message, shift = 3) => {
  let callstack = []

  // NOTE BRN: See more info about this line https://code.google.com/p/v8/wiki/JavaScriptStackTraceApi
  Error.stackTraceLimit = Infinity

  const error = new Error()
  callstack = error.stack.split('\n')

  let count = shift
  while (count >= 0) {
    count -= 1
    callstack.shift()
  }
  return `${message}\n ${callstack.join('\n')}`
})

export default generateStackTrace
