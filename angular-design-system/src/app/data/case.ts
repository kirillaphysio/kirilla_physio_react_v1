// Anonymised patient case stories (Online fókusz copy — not yet reviewed by Réka). Block text
// carries <strong> emphasis that must be preserved. Ported verbatim from LandingScreen.jsx.

export interface CaseStoryBlock {
  label: string;
  text: string;
}

export interface CaseStory {
  meta: string;
  title: string;
  blocks: CaseStoryBlock[];
  outcome: string;
  therapies: string[];
}

export const CASES: CaseStory[] = [
  {
    meta: '30-as évek · irodai munka · 4 hónapos panasz',
    title: 'Derékfájás, ami reggelre a legrosszabb',
    blocks: [
      { label: 'Panasz', text: 'Reggeli felkeléskor éles derékfájás, ami napközben enyhült, de hosszú üléstől mindig visszatért.' },
      { label: 'Mit találtam', text: 'Az állapotfelmérésen a <strong>mély stabilizátorok</strong> nem kapcsoltak be időben, a derék körüli <strong>fascia</strong> pedig feszes volt, a csípő mozgástartománya beszűkült.' },
      { label: 'Mit tettünk', text: 'Először <strong>FDM</strong>-mel oldottam a kötőszöveti feszülést, majd <strong>szegmentális stabilizációs tréninget</strong> és otthon végezhető gyakorlatsort építettünk fel.' },
    ],
    outcome: 'A reggeli fájdalom megszűnt, a napi ülés már nem hozza vissza.',
    therapies: ['FDM', 'Gyógytorna', 'Dorn terápia'],
  },
  {
    meta: '40-es évek · visszatérő fejfájás · 2 éve tart',
    title: 'Fejfájás, amire a fájdalomcsillapító nem hatott',
    blocks: [
      { label: 'Panasz', text: 'Heti több alkalommal jelentkező fejfájás a tarkótól indulva, esténként erősödve.' },
      { label: 'Mit találtam', text: 'A tarkó és a rágóizmok tónusa emelkedett volt, éjszakai <strong>fogcsikorgatás</strong> jeleivel, a <strong>paraszimpatikus idegrendszer</strong> alulműködésére utaló panaszokkal.' },
      { label: 'Mit tettünk', text: '<strong>Cranio FDM</strong> és <strong>állkapocs-ízületi terápia</strong>, mellette <strong>vagus terápia</strong> és légzésgyakorlatok az idegrendszer nyugtatására.' },
    ],
    outcome: 'A fejfájások száma heti többről havi egyre csökkent.',
    therapies: ['Cranio FDM', 'Állkapocs-ízületi terápia', 'Vagus terápia'],
  },
];
