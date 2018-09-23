const symIterator = typeof Symbol !== 'undefined' ? Symbol.iterator : '@@iterator'

const isIterable = (value) => value != null && value[symIterator] != null

export default isIterable
