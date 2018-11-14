import curryN from '../common/curryN'
import fs from 'fs-extra'

const pathExists = curryN(1, fs.pathExists)

export default pathExists
