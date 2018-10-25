const objectGetOwnPropertySymbols = (object) => {
  if (typeof Object.getOwnPropertySymbols === 'function') {
    return Object.getOwnPropertySymbols(object)
  }
  return []
}

export default objectGetOwnPropertySymbols
