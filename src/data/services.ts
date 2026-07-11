export interface ServiceOffering {
  title: string
  description: string
}

export interface Service {
  slug: string
  navLabel: string
  heroSubtitle: string
  title: string
  description: string
  images: string[]
  offerings: [ServiceOffering, ServiceOffering]
}

export const services: Service[] = [
  {
    slug: 'innenmalerei',
    navLabel: 'Innenmalerei',
    heroSubtitle: 'Kreative und fachgerechte Gestaltung Ihrer Innenräume',
    title: 'Innenmalerei',
    description:
      'Wir gestalten Ihre Innenräume mit Leidenschaft und Präzision. Von der Farbberatung bis zur professionellen Ausführung – bei uns sind Sie in besten Händen.',
    images: [
      '/images/services/innenmalerei-1.webp',
      '/images/services/innenmalerei-2.webp',
      '/images/services/innenmalerei-3.webp',
      '/images/services/innenmalerei-4.webp',
    ],
    offerings: [
      {
        title: 'Farbberatung und Design',
        description:
          'Unsere Experten begleiten Sie bei der Auswahl der perfekten Farben und Materialien. Wir entwickeln ein stimmiges Farbkonzept, das Ihre persönliche Note widerspiegelt und Ihren Raum optimal in Szene setzt.',
      },
      {
        title: 'Professionelle Ausführung',
        description:
          'Von der sorgfältigen Vorbereitung der Oberflächen bis zum makellosen Abschluss – wir arbeiten präzise und mit hochwertigen Materialien, damit das Ergebnis langlebig und optisch einwandfrei ist.',
      },
    ],
  },
  {
    slug: 'aussenmalerei',
    navLabel: 'Aussenmalerei',
    heroSubtitle: 'Schutz und Schönheit für Ihre Fassade',
    title: 'Aussenmalerei',
    description:
      'Ihre Fassade ist das Gesicht Ihres Gebäudes. Wir sorgen dafür, dass sie nicht nur schön aussieht, sondern auch optimal gegen Witterungseinflüsse geschützt ist.',
    images: [
      '/images/services/aussenmalerei-1.webp',
      '/images/services/aussenmalerei-2.webp',
      '/images/services/aussenmalerei-3.webp',
    ],
    offerings: [
      {
        title: 'Fassadensanierung',
        description:
          'Wir führen eine gründliche Bestandsaufnahme durch, reinigen und reparieren Risse und Schäden, und bringen anschliessend einen hochwertigen Neuanstrich auf – für eine Fassade, die wie neu aussieht.',
      },
      {
        title: 'Witterungsbeständige Anstriche',
        description:
          'Mit unseren langlebigen Beschichtungen schützen wir Ihre Fassade zuverlässig vor Wind, Regen, UV-Strahlung und Temperaturschwankungen – für dauerhaften Werterhalt Ihrer Immobilie.',
      },
    ],
  },
  {
    slug: 'betonkosmetik',
    navLabel: 'Betonkosmetik',
    heroSubtitle: 'Ästhetische Lösungen für makellose Betonoberflächen',
    title: 'Betonkosmetik',
    description:
      'Betonoberflächen leiden unter den Jahren. Wir beseitigen Schäden fachgerecht und veredeln die Oberflächen zu einem optisch ansprechenden und dauerhaften Ergebnis.',
    images: [
      '/images/services/betonkosmetik-1.webp',
      '/images/services/betonkosmetik-2.webp',
      '/images/services/betonkosmetik-3.webp',
    ],
    offerings: [
      {
        title: 'Schadensbeseitigung',
        description:
          'Risse, Abplatzungen und Verfärbungen im Beton werden von unseren Fachleuten professionell ausgebessert. Wir stellen nicht nur die Optik wieder her, sondern sorgen auch für strukturelle Stabilität.',
      },
      {
        title: 'Oberflächenveredelung',
        description:
          'Mit modernen Techniken wie Schleifen, Polieren oder speziellen Beschichtungen verleihen wir Betonoberflächen ein hochwertiges Erscheinungsbild – ob für Böden, Wände oder Aussenbereich.',
      },
    ],
  },
  {
    slug: 'anstricharbeiten',
    navLabel: 'Anstricharbeiten',
    heroSubtitle: 'Perfekte Anstriche für jeden Bedarf',
    title: 'Anstricharbeiten',
    description:
      'Ob frische Renovierung oder spezieller Schutzanstrich – wir bieten massgeschneiderte Lösungen für jeden Anstrichbedarf, innen wie aussen.',
    images: [
      '/images/services/anstricharbeiten-1.webp',
      '/images/services/anstricharbeiten-2.webp',
      '/images/services/anstricharbeiten-3.webp',
    ],
    offerings: [
      {
        title: 'Renovierungsanstriche',
        description:
          'Geben Sie Ihren Räumen oder Fassaden neues Leben. Unsere Renovierungsanstriche frischen bestehende Oberflächen auf und können gleichzeitig das gesamte Erscheinungsbild komplett neu gestalten.',
      },
      {
        title: 'Schutzanstriche',
        description:
          'Für stark beanspruchte Flächen bieten wir spezielle Schutzbeschichtungen an, die vor Abrieb, Feuchtigkeit, Chemikalien und anderen Einflüssen schützen – langlebig und zuverlässig.',
      },
    ],
  },
  {
    slug: 'dekorationsarbeiten',
    navLabel: 'Dekorationsarbeiten',
    heroSubtitle: 'Kreative Akzente für Ihre Räume',
    title: 'Dekorationsarbeiten',
    description:
      'Setzen Sie besondere Akzente in Ihren Räumen. Unsere kreativen Dekorationsarbeiten verwandeln schlichte Flächen in echte Blickfänger.',
    images: [
      '/images/services/dekorationsarbeiten-1.webp',
      '/images/services/dekorationsarbeiten-2.webp',
      '/images/services/dekorationsarbeiten-3.webp',
    ],
    offerings: [
      {
        title: 'Effektanstriche',
        description:
          'Metallic-Effekte, Marmortechniken, strukturierte Oberflächen – mit unseren Effektanstrichen verleihen wir Ihren Wänden eine einzigartige Tiefe und Eleganz, die jeden Raum zur Bühne macht.',
      },
      {
        title: 'Wandmalereien',
        description:
          'Individuelle Wandgemälde und dekorative Wandgestaltungen nach Ihren Wünschen. Ob klassisch oder modern, abstrakt oder naturgetreu – unsere Künstler setzen Ihre Visionen gekonnt um.',
      },
    ],
  },
  {
    slug: 'brand-und-wasserschadensanierungen',
    navLabel: 'Brand- und Wasserschadensanierungen',
    heroSubtitle: 'Schnelle und zuverlässige Schadensbeseitigung',
    title: 'Brand- und Wasserschadensanierungen',
    description:
      'Nach einem Brand- oder Wasserschaden zählt jede Stunde. Wir handeln schnell, fachgerecht und diskret, um Ihre Räumlichkeiten so rasch wie möglich wieder herzustellen.',
    images: [
      '/images/services/brand-wasserschaden-1.webp',
      '/images/services/brand-wasserschaden-2.webp',
      '/images/services/brand-wasserschaden-3.webp',
    ],
    offerings: [
      {
        title: 'Brandschadensanierung',
        description:
          'Russ, Geruch, geschwärzte Oberflächen – wir reinigen und sanieren gründlich. Von der Entfernung von Russspuren über Geruchsneutralisierung bis zur vollständigen Wiederherstellung übernehmen wir alles.',
      },
      {
        title: 'Wasserschadensanierung',
        description:
          'Feuchtigkeit und Schimmel nach einem Wasserschaden müssen konsequent beseitigt werden. Wir kümmern uns um Trocknung, Desinfektion und den vollständigen Wiederaufbau der betroffenen Bereiche.',
      },
    ],
  },
]
