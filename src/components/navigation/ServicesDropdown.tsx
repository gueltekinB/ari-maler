import Link from 'next/link'
import { services } from '@/data/services'

export function ServicesDropdown() {
  return (
    <li className="relative group">
      <Link
        href="/dienstleistungen"
        className="flex items-center gap-1 text-white/90 hover:text-white font-medium py-2 transition-colors"
      >
        Dienstleistungen
        <svg
          className="w-4 h-4 transition-transform group-hover:rotate-180"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </Link>
      <div className="absolute top-full left-0 hidden group-hover:block min-w-72 bg-navy-dark shadow-xl rounded-b z-50">
        {services.map((s) => (
          <Link
            key={s.slug}
            href={`/dienstleistungen/${s.slug}`}
            className="block px-5 py-3 text-white/85 hover:text-white hover:bg-navy-light transition-colors text-sm border-b border-white/10 last:border-0"
          >
            {s.navLabel}
          </Link>
        ))}
      </div>
    </li>
  )
}
