interface SectionHeaderProps {
  subtitle?: string
  title: string
  description?: string
  light?: boolean
  center?: boolean
}

export function SectionHeader({
  subtitle,
  title,
  description,
  light = false,
  center = false,
}: SectionHeaderProps) {
  return (
    <div className={center ? 'text-center' : ''}>
      {subtitle && (
        <p
          className={`text-sm font-semibold uppercase tracking-widest mb-2 ${
            light ? 'text-cta' : 'text-accent'
          }`}
        >
          {subtitle}
        </p>
      )}
      <h2
        className={`text-3xl md:text-4xl font-bold mb-4 ${
          light ? 'text-white' : 'text-navy'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`text-lg max-w-2xl ${center ? 'mx-auto' : ''} ${
            light ? 'text-white/80' : 'text-gray-600'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  )
}
