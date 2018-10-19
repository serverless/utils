// Safari bug
const HAS_ARGS_ENUM_BUG = (function() {
  return arguments.propertyIsEnumerable('length')
})()

export default HAS_ARGS_ENUM_BUG
