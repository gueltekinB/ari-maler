'use client'

import { useCallback, useEffect, useRef, useState, type MouseEvent, type TouchEvent } from 'react'

interface BeforeAfterSliderProps {
  before: string
  after: string
  title?: string
}

export function BeforeAfterSlider({ before, after, title }: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState(50)
  const draggingRef = useRef(false)

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    let p = ((clientX - rect.left) / rect.width) * 100
    p = Math.max(0, Math.min(100, p))
    setPos(p)
  }, [])

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    updateFromClientX(e.clientX)
  }
  const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    draggingRef.current = true
    updateFromClientX(e.clientX)
  }
  const onTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (e.touches && e.touches[0]) updateFromClientX(e.touches[0].clientX)
  }

  useEffect(() => {
    const onUp = () => {
      draggingRef.current = false
    }
    window.addEventListener('mouseup', onUp)
    return () => window.removeEventListener('mouseup', onUp)
  }, [])

  return (
    <div>
      <div
        ref={containerRef}
        onMouseMove={onMouseMove}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchMove}
        onTouchMove={onTouchMove}
        className="relative w-full aspect-4/3 overflow-hidden rounded-lg cursor-col-resize select-none bg-off-white shadow-md"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={before}
          alt={title ? `${title} – Vorher` : 'Vorher'}
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={after}
            alt={title ? `${title} – Nachher` : 'Nachher'}
            draggable={false}
            className="w-full h-full object-cover"
          />
        </div>

        <div
          className="absolute top-3.5 left-3.5 px-3 py-1.5 rounded-full bg-accent/85 backdrop-blur-sm text-white text-[11px] font-semibold uppercase tracking-wider pointer-events-none transition-opacity duration-150"
          style={{ opacity: pos > 14 ? 1 : 0 }}
        >
          Nachher
        </div>
        <div
          className="absolute top-3.5 right-3.5 px-3 py-1.5 rounded-full bg-navy/55 backdrop-blur-sm text-white text-[11px] font-semibold uppercase tracking-wider pointer-events-none transition-opacity duration-150"
          style={{ opacity: 100 - pos > 14 ? 1 : 0 }}
        >
          Vorher
        </div>

        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.15)] pointer-events-none"
          style={{ left: `${pos}%`, transform: 'translateX(-1px)' }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.25)] flex items-center justify-center gap-[3px]">
            <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
              <path d="M5 1L1 6L5 11" stroke="#1e3a5f" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
              <path d="M3 1L7 6L3 11" stroke="#1e3a5f" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
      {title && <div className="mt-3 text-[15px] font-bold text-navy">{title}</div>}
    </div>
  )
}
