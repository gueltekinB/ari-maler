import Link from 'next/link'

interface ButtonProps {
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'outline' | 'white'
  type?: 'button' | 'submit'
  disabled?: boolean
  children: React.ReactNode
  className?: string
}

export function Button({
  href,
  onClick,
  variant = 'primary',
  type = 'button',
  disabled,
  children,
  className = '',
}: ButtonProps) {
  const base =
    'inline-block px-6 py-3 rounded font-semibold text-sm transition-colors duration-200 cursor-pointer'
  const variants = {
    primary: 'bg-cta text-white hover:bg-cta-hover',
    outline: 'border-2 border-white text-white hover:bg-white hover:text-navy',
    white: 'bg-white text-navy hover:bg-off-white',
  }
  const cls = `${base} ${variants[variant]} ${className}`

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  )
}
