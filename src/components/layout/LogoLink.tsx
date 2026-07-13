'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { MouseEvent } from 'react'

export function LogoLink() {
  const pathname = usePathname()

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    if (pathname === '/') {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <Link href="/" onClick={handleClick} className="flex items-center gap-3 flex-shrink-0">
      <Image
        src="/images/logo/logo-weiss.webp"
        alt="Ari Maler GmbH Logo"
        width={120}
        height={72}
        className="h-10 w-auto object-contain"
        priority
      />
    </Link>
  )
}
