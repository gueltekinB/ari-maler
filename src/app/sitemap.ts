import type { MetadataRoute } from 'next'
import { services } from '@/data/services'

const baseUrl = 'https://ari-maler.ch'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, changeFrequency: 'monthly', priority: 1 },
    { url: `${baseUrl}/dienstleistungen`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/referenzen`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/ueber-uns`, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${baseUrl}/kontakt`, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${baseUrl}/impressum`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${baseUrl}/datenschutz`, changeFrequency: 'yearly', priority: 0.2 },
  ]

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${baseUrl}/dienstleistungen/${service.slug}`,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...staticRoutes, ...serviceRoutes]
}
