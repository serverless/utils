import curry from '../common/curry'
import defn from '../common/defn'
import compact from './compact'
import getPath from './getPath'
import init from './init'
import isEmpty from './isEmpty'

const getParentPath = curry(
  defn('getParentPath', (path, value) => {
    const pathParts = compact(path)
    if (isEmpty(pathParts)) {
      return undefined
    }
    return getPath(init(pathParts), value)
  })
)

export default getParentPath
