'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ServicesDropdown } from '@/components/navigation/ServicesDropdown'
import { MobileMenu } from '@/components/layout/MobileMenu'
import { LogoLink } from '@/components/layout/LogoLink'

const navLinks = [
  { href: '/referenzen', label: 'Referenzen' },
  { href: '/ueber-uns', label: 'Über uns' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const isHome = usePathname() === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 border-b ${
        isHome && !scrolled ? 'bg-[#667892]' : 'bg-navy'
      } ${scrolled ? 'border-white/10 shadow-md' : 'border-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16 md:h-20">
          <LogoLink />

          <nav className="hidden md:flex items-center gap-6">
            <ul className="flex items-center gap-6">
              <ServicesDropdown />
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/90 hover:text-white font-medium transition-colors py-2"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/kontakt"
              className="bg-cta hover:bg-cta-hover text-white font-semibold px-5 py-2 rounded transition-colors text-sm"
            >
              Kontakt
            </Link>
          </nav>

          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
