export function ContactInfo() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-navy mb-4">Kontaktangaben</h2>
        <p className="text-gray-600 leading-relaxed">
          Wir freuen uns auf Ihre Anfrage und melden uns so schnell wie möglich bei Ihnen.
        </p>
      </div>

      <div className="space-y-5">
        <div className="flex gap-4 items-start">
          <div className="flex-shrink-0 w-10 h-10 bg-navy rounded-full flex items-center justify-center text-white mt-1">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-navy">Adresse</p>
            <address className="not-italic text-gray-600 text-sm mt-1">
              Therwilerstrasse 24<br />
              4103 Bottmingen<br />
              Schweiz
            </address>
          </div>
        </div>

        <div className="flex gap-4 items-start">
          <div className="flex-shrink-0 w-10 h-10 bg-navy rounded-full flex items-center justify-center text-white mt-1">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-navy">Telefon</p>
            <a href="tel:0797996262" className="text-gray-600 text-sm mt-1 block hover:text-accent transition-colors">
              079 799 62 62
            </a>
          </div>
        </div>

        <div className="flex gap-4 items-start">
          <div className="flex-shrink-0 w-10 h-10 bg-navy rounded-full flex items-center justify-center text-white mt-1">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-navy">E-Mail</p>
            <a href="mailto:info@ari-maler.ch" className="text-gray-600 text-sm mt-1 block hover:text-accent transition-colors">
              info@ari-maler.ch
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
