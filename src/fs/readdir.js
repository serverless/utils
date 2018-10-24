import fs from 'fs-extra'
import curryN from '../common/curryN'

const readdir = curryN(1, fs.readdir)

export default readdir
