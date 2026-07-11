import Image from 'next/image'

interface PageHeroProps {
  subtitle?: string
  title: string
  description?: string
  bgImage?: string
}

export function PageHero({ subtitle, title, description, bgImage }: PageHeroProps) {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {bgImage ? (
        <>
          <Image src={bgImage} alt={title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-navy/75" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-navy to-navy-light" />
      )}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {subtitle && (
          <p className="text-cta text-sm font-semibold uppercase tracking-widest mb-3">
            {subtitle}
          </p>
        )}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{title}</h1>
        {description && <p className="text-lg text-white/80 max-w-2xl">{description}</p>}
      </div>
    </section>
  )
}
