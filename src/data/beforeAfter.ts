export interface BeforeAfterItem {
  id: string
  title: string
  description: string
  before: string
  after: string
}

export const homeFeaturedIds = ['stuetzenverkleidung', 'kellerraum', 'waschkueche']

export const beforeAfter: BeforeAfterItem[] = [
  {
    id: 'waschkueche',
    title: 'Waschküche – Boden',
    description:
      'Ein stark abgenutzter Kellerboden wurde gereinigt, ausgebessert und mit einer robusten, feuchtigkeitsbeständigen Beschichtung neu versiegelt.',
    before: '/uploads/Sortiert/01_Waschkueche_Boden/Vorher/1.1.JPEG',
    after: '/uploads/Sortiert/01_Waschkueche_Boden/Nachher/1.4.JPEG',
  },
  {
    id: 'kellerraum',
    title: 'Kellerraum – Wand',
    description:
      'Feuchte Flecken und rissiger Putz wichen einer sauber sanierten, hell gestrichenen Wand für einen frischen, trockenen Kellerraum.',
    before: '/uploads/Sortiert/02_Kellerraum_Wand/Vorher/2.JPEG',
    after: '/uploads/Sortiert/02_Kellerraum_Wand/Nachher/2.1.JPEG',
  },
  {
    id: 'eventhalle',
    title: 'Eventhalle',
    description:
      'Die grossflächigen Wände und Decken einer Eventhalle wurden fachgerecht vorbereitet und in einem einheitlichen, hellen Farbton neu gestrichen.',
    before: '/uploads/Sortiert/03_Eventhalle/Vorher/3.2.JPEG',
    after: '/uploads/Sortiert/03_Eventhalle/Nachher/3.4.JPEG',
  },
  {
    id: 'wc',
    title: 'WC – Urinale',
    description:
      'Ein in die Jahre gekommener Sanitärraum erhielt neue Wandfarbe und einen gründlich aufgefrischten Gesamteindruck.',
    before: '/uploads/Sortiert/04_WC_Urinale/Vorher/4.JPEG',
    after: '/uploads/Sortiert/04_WC_Urinale/Nachher/4.1.JPEG',
  },
  {
    id: 'tiefgarage',
    title: 'Tiefgarage – Decke',
    description:
      'Die Betondecke einer Tiefgarage wurde von Abplatzungen befreit, ausgebessert und mit einer hellen, lichtreflektierenden Beschichtung versehen.',
    before: '/uploads/Sortiert/08_Tiefgarage_Decke/Vorher/8.JPEG',
    after: '/uploads/Sortiert/08_Tiefgarage_Decke/Nachher/8.2.JPEG',
  },
  {
    id: 'stuetzenverkleidung',
    title: 'Stützenverkleidung Parkhaus',
    description:
      'Beschädigte Betonstützen im Parkhaus wurden mittels Betonkosmetik instand gesetzt und erhielten eine widerstandsfähige neue Beschichtung.',
    before: '/uploads/Sortiert/12_Stuetzenverkleidung_Parkhaus/Vorher/12.JPEG',
    after: '/uploads/Sortiert/12_Stuetzenverkleidung_Parkhaus/Nachher/12.3.JPEG',
  },
  {
    id: 'parkhaus-eingang',
    title: 'Parkhaus Eingang – Stützen',
    description:
      'Am Eingangsbereich des Parkhauses wurden die Stützen saniert und farblich neu gestaltet, für einen einladenden ersten Eindruck.',
    before: '/uploads/Sortiert/14_Parkhaus_Eingang_Stuetzen/Vorher/14.2.JPEG',
    after: '/uploads/Sortiert/14_Parkhaus_Eingang_Stuetzen/Nachher/14.7.JPEG',
  },
  {
    id: 'lift',
    title: 'Lift – Kabine',
    description:
      'Die Innenverkleidung einer Liftkabine wurde von Kratzern und Abnutzung befreit und in neuem Glanz frisch gestrichen.',
    before: '/uploads/Sortiert/17_Lift_Kabine/Vorher/17.JPEG',
    after: '/uploads/Sortiert/17_Lift_Kabine/Nachher/17.1.JPEG',
  },
  {
    id: 'buero',
    title: 'Büro – Grossraum',
    description:
      'Ein Grossraumbüro wurde während laufendem Betrieb sauber und termingerecht neu gestrichen, für ein modernes Arbeitsumfeld.',
    before: '/uploads/Sortiert/18_Buero_Grossraum/Vorher/18.JPEG',
    after: '/uploads/Sortiert/18_Buero_Grossraum/Nachher/18.5.JPEG',
  },
]
