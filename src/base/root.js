import freeGlobal from './freeGlobal'

/** Detect free variable `self`. */
const freeSelf = typeof self == 'object' && self !== null && self.Object === Object && self // eslint-disable-line no-undef

/** Used as a reference to the global object. */
const root = freeGlobal || freeSelf || Function('return this')()

export default root
