// cover IE < 9 keys issues
const HAS_OBJECT_ENUM_BUG = !{ toString: null }.propertyIsEnumerable('toString')

export default HAS_OBJECT_ENUM_BUG
