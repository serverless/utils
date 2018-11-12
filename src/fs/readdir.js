import curryN from '../common/curryN'
import fs from 'fs-extra'

const readdir = curryN(1, fs.readdir)

export default readdir
