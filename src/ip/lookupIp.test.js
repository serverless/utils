import lookupIp from './lookupIp'
jest.mock('../fetch/fetch', () =>
  jest.fn(() => ({
    status: 200,
    json: () => ({
      city: 'Seattle',
      country_code: 'US',
      country_name: 'United States',
      ip: '3.4.5.6',
      latitude: 47.6339,
      longitude: -122.3476,
      zip_code: '98109',
      region_code: 'WA',
      region_name: 'Washington'
    })
  }))
)

describe('lookupIp', () => {
  test('correctly looks up an ip address', async () => {
    expect(await lookupIp('3.4.5.6')).toEqual({
      city: 'Seattle',
      countryCode: 'US',
      country: 'United States',
      ip: '3.4.5.6',
      lat: 47.6339,
      lng: -122.3476,
      postalCode: '98109',
      regionCode: 'WA',
      region: 'Washington'
    })
  })

  test('Throws an error on non ip value', async () => {
    await expect((async () => lookupIp('foo.bar'))()).rejects.toThrow(/^Expected an IP address/)
  })
})
