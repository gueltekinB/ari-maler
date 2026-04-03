'use client'

import { useState } from 'react'
import Image from 'next/image'
import { services } from '@/data/services'

export function GalleryGrid() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)

  const allImages = services.flatMap((s) =>
    s.images.map((src) => ({ src, alt: `${s.navLabel} – Ari Maler GmbH`, category: s.navLabel })),
  )

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {allImages.map(({ src, alt }, i) => (
          <button
            key={i}
            onClick={() => setLightbox({ src, alt })}
            className="w-full block overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-zoom-in"
          >
            <Image
              src={src}
              alt={alt}
              width={800}
              height={600}
              className="w-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </button>
        ))}
      </div>

      {lightbox && (
        <dialog
          open
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 w-full max-w-none m-0 p-4"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-10 right-0 text-white text-2xl font-bold hover:text-gray-300"
              aria-label="Schliessen"
            >
              ✕
            </button>
            <Image
              src={lightbox.src}
              alt={lightbox.alt}
              width={1200}
              height={900}
              className="w-full h-auto max-h-[85vh] object-contain rounded"
            />
            <p className="text-white text-sm text-center mt-2 opacity-75">{lightbox.alt}</p>
          </div>
        </dialog>
      )}
    </>
  )
}
