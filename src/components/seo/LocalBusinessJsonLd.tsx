export function LocalBusinessJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: 'Ari Maler GmbH',
    image: 'https://ari-maler.ch/images/logo/logo-original.webp',
    url: 'https://ari-maler.ch',
    telephone: '+41797996262',
    email: 'info@ari-maler.ch',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Therwilerstrasse 24',
      postalCode: '4103',
      addressLocality: 'Bottmingen',
      addressCountry: 'CH',
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Region Basel',
    },
    founder: {
      '@type': 'Person',
      name: 'Toylan Ari',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
