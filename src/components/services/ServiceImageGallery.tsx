import Image from 'next/image'

interface ServiceImageGalleryProps {
  images: string[]
  title: string
}

export function ServiceImageGallery({ images, title }: ServiceImageGalleryProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((src, i) => (
        <div key={i} className="relative aspect-[3/2] rounded-lg overflow-hidden shadow-md">
          <Image
            src={src}
            alt={`${title} – Bild ${i + 1}`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      ))}
    </div>
  )
}
