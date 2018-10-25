import isString from '../base/isString'
import curry from '../common/curry'

const ipv4Maybe = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/
const ipv6Block = /^[0-9A-F]{1,4}$/i

/**
 * Determines whether the given value is an IP address
 *
 * @function
 * @since v0.0.6
 * @category ip
 * @param {string} value The value to check
 * @param {string | number} version The IP version number '4' or '6'
 * @returns {boolean} True if the value is an ip address, otherwise false
 * @example
 *
 * isIp('255.255.255.0') //=> true
 * isIp('255.255.255.0', 4) //=> true
 * isIp('255.255.255.0', 6) //=> false
 * isIp('2001:db8:abcd:0012:0000:0000:0000:0000') //=> true
 * isIp('2001:db8:abcd:0012:0000:0000:0000:0000', 4) //=> false
 * isIp('2001:db8:abcd:0012:0000:0000:0000:0000', 6) //=> true
 */
const isIp = curry((value, version = '') => {
  if (!isString(value)) {
    return false
  }
  version = String(version)
  if (!version) {
    return isIp(value, 4) || isIp(value, 6)
  } else if (version === '4') {
    if (!ipv4Maybe.test(value)) {
      return false
    }
    const parts = value.split('.').sort((partA, partB) => partA - partB)
    return parts[3] <= 255
  } else if (version === '6') {
    const blocks = value.split(':')
    let foundOmissionBlock = false // marker to indicate ::

    // At least some OS accept the last 32 bits of an IPv6 address
    // (i.e. 2 of the blocks) in IPv4 notation, and RFC 3493 says
    // that '::ffff:a.b.c.d' is valid for IPv4-mapped IPv6 addresses,
    // and '::a.b.c.d' is deprecated, but also valid.
    const foundIPv4TransitionBlock = isIp(blocks[blocks.length - 1], 4)
    const expectedNumberOfBlocks = foundIPv4TransitionBlock ? 7 : 8

    if (blocks.length > expectedNumberOfBlocks) {
      return false
    }
    // initial or final ::
    if (value === '::') {
      return true
    } else if (value.substr(0, 2) === '::') {
      blocks.shift()
      blocks.shift()
      foundOmissionBlock = true
    } else if (value.substr(value.length - 2) === '::') {
      blocks.pop()
      blocks.pop()
      foundOmissionBlock = true
    }

    let i = 0
    const { length } = blocks
    while (i < length) {
      // test for a :: which can not be at the string start/end
      // since those cases have been handled above
      if (blocks[i] === '' && i > 0 && i < length - 1) {
        if (foundOmissionBlock) {
          return false // multiple :: in address
        }
        foundOmissionBlock = true
      } else if (foundIPv4TransitionBlock && i === length - 1) {
        // it has been checked before that the last
        // block is a valid IPv4 address
      } else if (!ipv6Block.test(blocks[i])) {
        return false
      }
      i = i + 1
    }
    if (foundOmissionBlock) {
      return length >= 1
    }
    return length === expectedNumberOfBlocks
  }
  return false
})

export default isIp
