import Image from 'next/image'
import Link from 'next/link'
import { services } from '@/data/services'

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <Image
              src="/images/logo/logo-weiss.webp"
              alt="Ari Maler GmbH"
              width={140}
              height={84}
              className="h-12 w-auto object-contain mb-4"
            />
            <p className="text-white/70 text-sm leading-relaxed">
              Ihr zuverlässiger Partner für Malerarbeiten und Sanierungen in der Region Basel. Qualität, Präzision und Kundenzufriedenheit stehen bei uns an erster Stelle.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Dienstleistungen</h3>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/dienstleistungen/${s.slug}`}
                    className="text-white/70 hover:text-white text-sm transition-colors"
                  >
                    {s.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Kontakt</h3>
            <address className="not-italic text-white/70 text-sm space-y-2">
              <p>Ari Maler GmbH</p>
              <p>Therwilerstrasse 24</p>
              <p>4103 Bottmingen</p>
              <p className="pt-2">
                <a href="tel:0797996262" className="hover:text-white transition-colors">
                  079 799 62 62
                </a>
              </p>
              <p>
                <a href="mailto:info@ari-maler.ch" className="hover:text-white transition-colors">
                  info@ari-maler.ch
                </a>
              </p>
            </address>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-white/50 text-xs">
          <p>&copy; {new Date().getFullYear()} Ari Maler GmbH. Alle Rechte vorbehalten.</p>
          <div className="flex gap-4">
            <Link href="/impressum" className="hover:text-white transition-colors">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-white transition-colors">Datenschutz</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
