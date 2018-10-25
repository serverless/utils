import fs from 'fs-extra'
import curryN from '../common/curryN'

const pathExists = curryN(1, fs.pathExists)

export default pathExists
