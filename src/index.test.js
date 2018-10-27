describe('index', () => {
  test('require runs without error', () => {
    expect(() => {
      require('./')
    }).not.toThrow()
  })

  test('has base methods', () => {
    const mod = require('./base')
    expect(mod).toMatchObject({
      arrayConcat: expect.any(Function),
      arrayFlatten: expect.any(Function),
      arrayLikeIterator: expect.any(Function),
      arrayLikeKeys: expect.any(Function),
      arrayLikeReduce: expect.any(Function),
      arrayLikeReduceRight: expect.any(Function),
      arrayLikeSlice: expect.any(Function),
      baseGetTag: expect.any(Function),

      // NOTE BRN: This is commented out because it causes an extremely long diff to happen in Jest
      // freeGlobal: expect.any(Object),

      getTag: expect.any(Function),
      indexEndOffset: expect.any(Function),
      isArguments: expect.any(Function),
      isArray: expect.any(Function),
      isArrayBuffer: expect.any(Function),
      isArrayLike: expect.any(Function),
      isBoolean: expect.any(Function),
      isBuffer: expect.any(Function),
      isDate: expect.any(Function),
      isElement: expect.any(Function),
      isError: expect.any(Function),
      isFunction: expect.any(Function),
      isGenerator: expect.any(Function),
      isGeneratorFunction: expect.any(Function),
      isIndex: expect.any(Function),
      isInfinity: expect.any(Function),
      isInteger: expect.any(Function),
      isIterable: expect.any(Function),
      isIterator: expect.any(Function),
      isKey: expect.any(Function),
      isLength: expect.any(Function),
      isMap: expect.any(Function),
      isNaN: expect.any(Function),
      isNativeObject: expect.any(Function),
      isNil: expect.any(Function),
      isNull: expect.any(Function),
      isNumber: expect.any(Function),
      isObject: expect.any(Function),
      isObjectLike: expect.any(Function),
      isPlainFunction: expect.any(Function),
      isPlainObject: expect.any(Function),
      isPromise: expect.any(Function),
      isPrototype: expect.any(Function),
      isRegExp: expect.any(Function),
      isSet: expect.any(Function),
      isString: expect.any(Function),
      isSymbol: expect.any(Function),
      isTransformer: expect.any(Function),
      isTypedArray: expect.any(Function),
      isUndefined: expect.any(Function),
      isUrl: expect.any(Function),
      isWeakMap: expect.any(Function),
      isWeakSet: expect.any(Function),

      // NOTE BRN: This is commented out because it causes an extremely long diff to happen in Jest
      // nodeTypes: expect.any(Object),

      objectCreate: expect.any(Function),
      objectGetOwnPropertySymbols: expect.any(Function),
      objectHasOwnProperty: expect.any(Function),
      objectIterator: expect.any(Function),
      objectKeys: expect.any(Function),

      // NOTE BRN: This is commented out because it causes an extremely long diff to happen in Jest
      // root: expect.any(Object),

      reflectOwnKeys: expect.any(Function),
      toFinite: expect.any(Function),
      toInteger: expect.any(Function),
      toNumber: expect.any(Function),
      toObject: expect.any(Function),
      toString: expect.any(Function)
    })
  })

  test('has common methods', () => {
    const mod = require('./common')
    expect(mod).toMatchObject({
      __: expect.any(Object),
      all: expect.any(Function),
      allWith: expect.any(Function),
      apply: expect.any(Function),
      complement: expect.any(Function),
      compose: expect.any(Function),
      curry: expect.any(Function),
      curryN: expect.any(Function),
      deferredPromise: expect.any(Function),
      defn: expect.any(Function),
      dispatchable: expect.any(Function),
      identity: expect.any(Function),
      isOp: expect.any(Function),
      isResolved: expect.any(Function),
      iterate: expect.any(Function),
      iterateRight: expect.any(Function),
      iterator: expect.any(Function),
      memoize: expect.any(Function),
      memoizeWith: expect.any(Function),
      nAry: expect.any(Function),
      nArySpread: expect.any(Function),
      nth: expect.any(Function),
      isOp: expect.any(Function),
      pipe: expect.any(Function),
      resolveToGeneratorWith: expect.any(Function),
      resolveWith: expect.any(Function),
      sleep: expect.any(Function)
    })
  })

  test('has constants', () => {
    const mod = require('./constants')
    expect(mod).toMatchObject({
      HAS_ARGS_ENUM_BUG: expect.any(Boolean),
      HAS_OBJECT_ENUM_BUG: expect.any(Boolean),
      MAX_SAFE_INTEGER: expect.any(Number),
      SYMBOL_ITERATOR: expect.anything()
    })
  })

  test('has data methods', () => {
    const mod = require('./data')
    expect(mod).toMatchObject({
      addIndex: expect.any(Function),
      always: expect.any(Function),
      any: expect.any(Function),
      anyAtIndex: expect.any(Function),
      append: expect.any(Function),
      assign: expect.any(Function),
      assoc: expect.any(Function),
      assocIndex: expect.any(Function),
      assocPath: expect.any(Function),
      assocProp: expect.any(Function),
      castPath: expect.any(Function),
      clone: expect.any(Function),
      compact: expect.any(Function),
      concat: expect.any(Function),
      contains: expect.any(Function),
      endsWith: expect.any(Function),
      equals: expect.any(Function),
      every: expect.any(Function),
      everyAtIndex: expect.any(Function),
      filter: expect.any(Function),
      filterAtIndex: expect.any(Function),
      find: expect.any(Function),
      findAtIndex: expect.any(Function),
      findKdx: expect.any(Function),
      first: expect.any(Function),
      flatten: expect.any(Function),
      forEach: expect.any(Function),
      forEachIndexed: expect.any(Function),
      forEachObjIndexed: expect.any(Function),
      generateRandomId: expect.any(Function),
      get: expect.any(Function),
      getParent: expect.any(Function),
      getParentPath: expect.any(Function),
      getPath: expect.any(Function),
      getProp: expect.any(Function),
      has: expect.any(Function),
      hasPath: expect.any(Function),
      hasProp: expect.any(Function),
      head: expect.any(Function),
      init: expect.any(Function),
      is: expect.any(Function),
      join: expect.any(Function),
      keys: expect.any(Function),
      last: expect.any(Function),
      length: expect.any(Function),
      lens: expect.any(Function),
      lensIndex: expect.any(Function),
      lensPath: expect.any(Function),
      lensProp: expect.any(Function),
      map: expect.any(Function),
      mapIndexed: expect.any(Function),
      mapObjIndexed: expect.any(Function),
      merge: expect.any(Function),
      mergeDeep: expect.any(Function),
      omit: expect.any(Function),
      over: expect.any(Function),
      pick: expect.any(Function),
      prepend: expect.any(Function),
      prop: expect.any(Function),
      propOr: expect.any(Function),
      reduce: expect.any(Function),
      reduceIndexed: expect.any(Function),
      reduceObjIndexed: expect.any(Function),
      reduceRight: expect.any(Function),
      reject: expect.any(Function),
      set: expect.any(Function),
      shallowEquals: expect.any(Function),
      slice: expect.any(Function),
      sort: expect.any(Function),
      split: expect.any(Function),
      stringToPath: expect.any(Function),
      tail: expect.any(Function),
      uniq: expect.any(Function),
      union: expect.any(Function),
      values: expect.any(Function),
      walk: expect.any(Function),
      walkReduce: expect.any(Function),
      walkReduceDepthFirst: expect.any(Function),
      walkReducePath: expect.any(Function),
      whereEq: expect.any(Function),
      without: expect.any(Function)
    })
  })

  test('has error methods', () => {
    const mod = require('./error')
    expect(mod).toMatchObject({
      createException: expect.any(Function),
      error: expect.any(Function),
      generateStackTrace: expect.any(Function),
      throwable: expect.any(Function)
    })
  })

  test('has fetch methods', () => {
    const mod = require('./fetch')
    expect(mod).toMatchObject({
      fetch: expect.any(Function)
    })
  })

  test('has fs methods', () => {
    const mod = require('./fs')
    expect(mod).toMatchObject({
      copyDirContentsSync: expect.any(Function),
      dirExists: expect.any(Function),
      fileExists: expect.any(Function),
      getTmpDir: expect.any(Function),
      isDirectory: expect.any(Function),
      isJsonPath: expect.any(Function),
      isYamlPath: expect.any(Function),
      packDir: expect.any(Function),
      parseFile: expect.any(Function),
      pathExists: expect.any(Function),
      readdir: expect.any(Function),
      readdirDirectories: expect.any(Function),
      readdirDirectoryNames: expect.any(Function),
      readFile: expect.any(Function),
      readFileIfExists: expect.any(Function),
      removeFile: expect.any(Function),
      walkDirSync: expect.any(Function),
      writeFile: expect.any(Function)
    })
  })

  test('has ip methods', () => {
    const mod = require('./ip')
    expect(mod).toMatchObject({
      isIp: expect.any(Function),
      lookupIp: expect.any(Function)
    })
  })

  test('has lang methods', () => {
    const mod = require('./lang')
    expect(mod).toMatchObject({
      assignProperties: expect.any(Function),
      cloneProperties: expect.any(Function),
      defineProperty: expect.any(Function),
      getProperty: expect.any(Function),
      mix: expect.any(Function)
    })
  })

  test('has logic methods', () => {
    const mod = require('./logic')
    expect(mod).toMatchObject({
      and: expect.any(Function),
      isEmpty: expect.any(Function),
      not: expect.any(Function),
      or: expect.any(Function)
    })
  })

  test('has path methods', () => {
    const mod = require('./path')
    expect(mod).toMatchObject({
      findPath: expect.any(Function)
    })
  })
})
