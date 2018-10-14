import lookupIp from './lookupIp'

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
