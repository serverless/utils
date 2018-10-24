const { hasOwnProperty } = Object.prototype

const objectHasOwnProperty = (object, prop) => hasOwnProperty.call(object, prop)

export default objectHasOwnProperty
