'use client'

import { useState } from 'react'
import Link from 'next/link'
import { services } from '@/data/services'

const navLinks = [
  { href: '/referenzen', label: 'Referenzen' },
  { href: '/ueber-uns', label: 'Über uns' },
  { href: '/kontakt', label: 'Kontakt' },
]

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-white p-2 rounded focus:outline-none"
        aria-label="Navigation öffnen"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-navy-dark shadow-xl z-50">
          <nav className="px-4 py-4 flex flex-col">
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className="flex items-center justify-between text-white/90 hover:text-white font-medium py-3 border-b border-white/10 w-full text-left"
            >
              Dienstleistungen
              <svg
                className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {servicesOpen && (
              <div className="bg-navy/50 rounded mb-1">
                <Link
                  href="/dienstleistungen"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 text-white/70 hover:text-white text-sm border-b border-white/10"
                >
                  Alle Dienstleistungen
                </Link>
                {services.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/dienstleistungen/${s.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-2 text-white/70 hover:text-white text-sm border-b border-white/10 last:border-0"
                  >
                    {s.navLabel}
                  </Link>
                ))}
              </div>
            )}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-white/90 hover:text-white font-medium py-3 border-b border-white/10 last:border-0"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}
