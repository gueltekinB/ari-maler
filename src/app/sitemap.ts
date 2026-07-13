import type { MetadataRoute } from 'next'
import { services } from '@/data/services'

const baseUrl = 'https://ari-maler.ch'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: `${baseUrl}/dienstleistungen`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/referenzen`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/ueber-uns`, lastModified, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${baseUrl}/kontakt`, lastModified, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${baseUrl}/impressum`, lastModified, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${baseUrl}/datenschutz`, lastModified, changeFrequency: 'yearly', priority: 0.2 },
  ]

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${baseUrl}/dienstleistungen/${service.slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...staticRoutes, ...serviceRoutes]
}
