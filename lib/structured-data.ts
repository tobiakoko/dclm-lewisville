import { SITE_CONFIG, type SiteConfig } from '@/lib/constants'

/** schema.org Church for the JSON-LD block in the root layout, built only from SITE_CONFIG */
export function churchJsonLd(config: SiteConfig = SITE_CONFIG) {
  const url = config.url.replace(/\/$/, '')
  const sameAs = [config.youtube.channel, config.socialMedia.facebook, config.socialMedia.instagram].filter(
    (link): link is string => link !== null
  )

  return {
    '@context': 'https://schema.org',
    '@type': 'Church',
    name: config.name,
    url,
    logo: `${url}/dclm_logo.png`,
    telephone: `+1-${config.phone.replace(/\D/g, '').replace(/^(\d{3})(\d{3})(\d{4})$/, '$1-$2-$3')}`,
    email: config.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: config.address.street,
      addressLocality: config.address.city,
      addressRegion: config.address.state,
      postalCode: config.address.zip,
      addressCountry: config.address.country,
    },
    sameAs,
  }
}
