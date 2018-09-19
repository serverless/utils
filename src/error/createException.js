// eslint-disable-next-line consistent-return
const createException = () => {
  try {
    // eslint-disable-next-line no-undef
    undef()
  } catch (e) {
    return e
  }
}

export default createException
