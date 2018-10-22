const { hasOwnProperty } = Object.prototype

const objectHasOwnProperty = (obj, prop) => hasOwnProperty.call(obj, prop)

export default objectHasOwnProperty
