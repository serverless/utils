import fetch from '../fetch/fetch'
import isIp from './isIp'

/**
 * Converts an ip address into an location
 *
 * @function
 * @since v0.0.6
 * @category ip
 * @param {string} ip The ip to lookup
 * @returns {{
 *   city: string,
 *   country: string,
 *   countryCode: string,
 *   ip: string,
 *   lat: number,
 *   lng: number,
 *   postalCode: string,
 *   region: string,
 *   regionCode: string,
 * }} The location
 * @example
 *
 * await lookupIp('139.130.4.5')
 * //=> {
 * //   city: 'Belrose',
 * //   country: 'Australia',
 * //   countryCode: 'AU',
 * //   ip: '139.130.4.5',
 * //   lat: -33.7333,
 * //   lng: 151.2167,
 * //   postalCode: '2085',
 * //   region: 'New South Wales',
 * //   regionCode: 'NSW'
 * // }
 */
const lookupIp = async (ip) => {
  if (!isIp(ip)) {
    throw new Error(`Expected an IP address. Instead received ${ip}`)
  }

  const response = await fetch(`https://freegeoip.app/json/${ip}`)

  if (response.status >= 400) {
    throw new Error(`Bad response from IP lookup server: ${response.body}`)
  }
  const body = await response.json()
  return {
    city: body.city,
    country: body.country_name,
    countryCode: body.country_code,
    ip: body.ip,
    lat: body.latitude,
    lng: body.longitude,
    postalCode: body.zip_code,
    region: body.region_name,
    regionCode: body.region_code
  }
}

export default lookupIp
