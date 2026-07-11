export type Service = { id: string; label: string };

export type ServiceCard = { id: string; num: string; title: string; desc: string };

export type ServiceDetail = {
  eyebrow: string;
  title: string;
  subtitle: string;
  intro: string;
  features: { title: string; text: string }[];
};

export const SERVICES: Service[] = [
  { id: 'innenmalerei', label: 'Innenmalerei' },
  { id: 'aussenmalerei', label: 'Aussenmalerei' },
  { id: 'betonkosmetik', label: 'Betonkosmetik' },
  { id: 'dekorationsarbeiten', label: 'Dekorationsarbeiten' },
  { id: 'brandwasser', label: 'Brand- & Wasserschadensanierung' },
];

export const SERVICE_CARDS: ServiceCard[] = [
  { id: 'innenmalerei', num: '01', title: 'Innenmalerei', desc: 'Kreative Gestaltung Ihrer Innenräume mit hochwertigen Materialien und präziser Ausführung.' },
  { id: 'aussenmalerei', num: '02', title: 'Aussenmalerei', desc: 'Ästhetisch ansprechende und langlebige Fassaden, die vor Witterungseinflüssen schützen.' },
  { id: 'betonkosmetik', num: '03', title: 'Betonkosmetik', desc: 'Professionelle Bearbeitung und Veredelung von Betonflächen für ein makelloses Erscheinungsbild.' },
  { id: 'dekorationsarbeiten', num: '04', title: 'Dekorationsarbeiten', desc: 'Effektanstriche, Wandmalereien und dekorative Gestaltung für individuelle Raumakzente.' },
  { id: 'brandwasser', num: '05', title: 'Brand- & Wasserschadensanierung', desc: 'Schnelle und zuverlässige Schadensbeseitigung nach Brand- oder Wasserschäden.' },
];

export const SERVICE_DATA: Record<string, ServiceDetail> = {
  innenmalerei: {
    eyebrow: 'Dienstleistungen',
    title: 'Innenmalerei',
    subtitle: 'Kreative und fachgerechte Gestaltung Ihrer Innenräume.',
    intro: 'Unsere Innenmalerei-Dienstleistungen umfassen eine Vielzahl von Techniken und Stilen, um Ihren Wohn- oder Arbeitsraum genau nach Ihren Wünschen zu gestalten. Wir verwenden nur hochwertige Farben und Materialien, um ein langlebiges und ästhetisch ansprechendes Ergebnis zu erzielen.',
    features: [
      { title: 'Farbberatung & Design', text: 'Unsere Experten beraten Sie gerne bei der Auswahl der passenden Farben und Designs, die Ihren Raum zum Strahlen bringen. Wir berücksichtigen Ihre persönlichen Vorlieben sowie die funktionalen Anforderungen jedes Raumes.' },
      { title: 'Professionelle Ausführung', text: 'Mit höchster Präzision und Sorgfalt führen wir alle Malerarbeiten durch. Vom Abdecken und Vorbereiten der Flächen bis hin zum finalen Anstrich sorgen wir für ein makelloses Finish.' },
    ],
  },
  aussenmalerei: {
    eyebrow: 'Dienstleistungen',
    title: 'Aussenmalerei',
    subtitle: 'Schutz und Schönheit für Ihre Fassade.',
    intro: 'Die Aussengestaltung Ihres Gebäudes ist entscheidend für den ersten Eindruck und den Schutz vor Witterungseinflüssen. Mit unseren professionellen Aussenmalerarbeiten erhalten Sie eine ästhetisch ansprechende und langlebige Fassade.',
    features: [
      { title: 'Fassadenrenovierung', text: 'Wir übernehmen die komplette Renovierung Ihrer Fassade, von der gründlichen Reinigung bis zur fachgerechten Reparatur und dem abschliessenden Neuanstrich. Ihre Fassade erstrahlt in neuem Glanz und ist optimal geschützt.' },
      { title: 'Witterungsbeständige Anstriche', text: 'Unsere hochwertigen Anstriche sind speziell für den Aussenbereich entwickelt und bieten langfristigen Schutz gegen Umwelteinflüsse wie Regen, Schnee und UV-Strahlung.' },
    ],
  },
  betonkosmetik: {
    eyebrow: 'Dienstleistungen',
    title: 'Betonkosmetik',
    subtitle: 'Ästhetische Lösungen für makellose Betonoberflächen.',
    intro: 'Mit unserer Betonkosmetik sorgen wir dafür, dass Betonflächen nicht nur funktional, sondern auch optisch ansprechend sind. Kleine Makel und Schäden werden professionell ausgebessert, sodass Ihre Betonflächen wie neu aussehen.',
    features: [
      { title: 'Schadensbeseitigung', text: 'Risse, Abplatzungen oder Farbunterschiede im Beton beseitigen wir schnell und zuverlässig. Unsere Techniken garantieren eine nahtlose Reparatur und ein homogenes Erscheinungsbild.' },
      { title: 'Oberflächenveredelung', text: 'Wir bieten verschiedene Veredelungstechniken an, um Ihre Betonflächen aufzuwerten. Ob Schleifen, Polieren oder spezielle Beschichtungen – wir haben die passende Lösung für Ihre Anforderungen.' },
    ],
  },
  dekorationsarbeiten: {
    eyebrow: 'Dienstleistungen',
    title: 'Dekorationsarbeiten',
    subtitle: 'Kreative Akzente für Ihre Räume.',
    intro: 'Mit unseren Dekorationsarbeiten setzen wir kreative Akzente in Ihren Räumen. Ob Wandmalereien, spezielle Effektanstriche oder dekorative Elemente – wir gestalten Ihre Räume individuell und einzigartig.',
    features: [
      { title: 'Effektanstriche', text: 'Unsere Effektanstriche bieten eine Vielzahl von Gestaltungsmöglichkeiten. Von Metallic-Effekten über Marmortechniken bis hin zu Strukturputzen – wir schaffen besondere Highlights an Ihren Wänden.' },
      { title: 'Wandmalereien', text: 'Individuelle Wandmalereien verleihen Ihren Räumen eine persönliche Note. Unsere Künstler setzen Ihre Ideen in einzigartige Kunstwerke um, die jeden Raum aufwerten.' },
    ],
  },
  brandwasser: {
    eyebrow: 'Dienstleistungen',
    title: 'Brand- & Wasserschadensanierung',
    subtitle: 'Schnelle und zuverlässige Schadensbeseitigung.',
    intro: 'Im Falle von Brand- oder Wasserschäden stehen wir Ihnen mit unserer umfassenden Sanierungserfahrung zur Seite. Wir sorgen für eine schnelle und gründliche Beseitigung der Schäden und stellen den ursprünglichen Zustand wieder her.',
    features: [
      { title: 'Brandschadensanierung', text: 'Nach einem Brand kümmern wir uns um die Entfernung von Russ und Brandrückständen, die Geruchsbeseitigung und die vollständige Wiederherstellung Ihrer Räume.' },
      { title: 'Wasserschadensanierung', text: 'Bei Wasserschäden bieten wir eine umfassende Trocknung und Sanierung der betroffenen Bereiche. Unsere Experten sorgen dafür, dass Feuchtigkeit restlos entfernt wird und keine Folgeschäden entstehen.' },
    ],
  },
};
