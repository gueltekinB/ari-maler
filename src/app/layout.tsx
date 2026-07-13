import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { LocalBusinessJsonLd } from '@/components/seo/LocalBusinessJsonLd'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Ari Maler GmbH – Malerarbeiten & Sanierungen in der Region Basel',
    template: '%s | Ari Maler GmbH',
  },
  description:
    'Ihr Experte für Malerarbeiten und Sanierungen in der Region Basel. Innen- und Aussenmalerei, Betonkosmetik, Dekorationsarbeiten und Schadensanierungen.',
  metadataBase: new URL('https://ari-maler.ch'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    locale: 'de_CH',
    type: 'website',
    siteName: 'Ari Maler GmbH',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className="h-full scroll-smooth" data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col antialiased">
        <LocalBusinessJsonLd />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
