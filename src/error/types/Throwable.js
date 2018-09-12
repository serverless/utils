import is from '../../data/is'
import generateStackTrace from '../generateStackTrace'

class Throwable {
  constructor({ causes, data, message, type }) {
    this.causes = causes || []
    this.data = data
    this.message = is(String, message) ? message : ''
    this.stack = generateStackTrace(message)
    this.type = type
  }
}

export default Throwable
