import { churchJsonLd } from '@/lib/structured-data'
import { SITE_CONFIG } from '@/lib/constants'

describe('churchJsonLd', () => {
  const data = churchJsonLd()

  it('is a schema.org Church built from SITE_CONFIG', () => {
    expect(data['@type']).toBe('Church')
    expect(data.name).toBe(SITE_CONFIG.name)
    expect(data.email).toBe(SITE_CONFIG.email)
    expect(data.address).toEqual({
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.city,
      addressRegion: SITE_CONFIG.address.state,
      postalCode: SITE_CONFIG.address.zip,
      addressCountry: SITE_CONFIG.address.country,
    })
  })

  it('writes the telephone in international form from the same number', () => {
    expect(data.telephone).toBe(`+1-${SITE_CONFIG.phone.replace(/\D/g, '').replace(/^(\d{3})(\d{3})(\d{4})$/, '$1-$2-$3')}`)
  })

  it('uses the site URL for the url and the emblem logo', () => {
    expect(data.url).toBe(SITE_CONFIG.url.replace(/\/$/, ''))
    expect(data.logo).toBe(`${data.url}/dclm_logo.png`)
  })

  it('lists only configured social links', () => {
    expect(data.sameAs).toEqual([SITE_CONFIG.youtube.channel])
    const withFacebook = churchJsonLd({
      ...SITE_CONFIG,
      socialMedia: { facebook: 'https://facebook.example/page', instagram: null },
    })
    expect(withFacebook.sameAs).toEqual([SITE_CONFIG.youtube.channel, 'https://facebook.example/page'])
  })
})
