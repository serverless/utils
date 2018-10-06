import lookupIp from './lookupIp'

describe('lookupIp', () => {
  test('correctly looks up an ip address', async () => {
    expect(await lookupIp('139.130.4.5')).toEqual({
      city: 'Belrose',
      countryCode: 'AU',
      country: 'Australia',
      ip: '139.130.4.5',
      lat: -33.7333,
      lng: 151.2167,
      postalCode: '2085',
      regionCode: 'NSW',
      region: 'New South Wales'
    })
  })

  test('Throws an error on non ip value', async () => {
    await expect((async () => lookupIp('foo.bar'))()).rejects.toThrow(/^Expected an IP address/)
  })
})
