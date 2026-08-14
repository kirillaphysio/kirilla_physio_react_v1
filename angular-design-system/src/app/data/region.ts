// Symptom router — the body map regions and, per region, the complaints Réka sees there plus
// the three therapy ids she most often works with. Ported verbatim from LandingScreen.jsx.

export interface BodyRegion {
  id: string;
  label: string;
  x: string;
  y: string;
  side?: 'left' | 'right';
}

export interface RegionDetail {
  complaints: string[];
  therapies: string[];
}

export const REGIONS: BodyRegion[] = [
  { id: 'fej', label: 'Fej, fejfájás', x: '50%', y: '6%', side: 'right' },
  { id: 'nyak', label: 'Nyak', x: '50%', y: '15%' },
  { id: 'vall', label: 'Váll, kar', x: '78%', y: '23%', side: 'right' },
  { id: 'derek', label: 'Derék, hát', x: '40%', y: '34%' },
  { id: 'has', label: 'Belsőszervi panasz', x: '58%', y: '42%', side: 'right' },
  { id: 'csipo', label: 'Csípő', x: '42%', y: '53%' },
  { id: 'terd', label: 'Térd', x: '60%', y: '68%', side: 'right' },
  { id: 'boka', label: 'Boka, láb', x: '40%', y: '93%' },
];

export const REGION_DETAIL: Record<string, RegionDetail> = {
  fej: {
    complaints: ['izom- és kötőszövet eredetű fejfájás', 'stresszhez kötődő, visszatérő fejfájás', 'állkapocs-ízületi panasz, fogcsikorgatás'],
    therapies: ['cranio_terapia', 'alkapocs_izuleti', 'vagus_terapia'],
  },
  nyak: {
    complaints: ['nyakfájás, ízületi blokk', 'karba sugárzó fájdalom, zsibbadás', 'helytelen testtartás, előreesett fejtartás'],
    therapies: ['gyogytorna', 'mulligan_terapia', 'fdm'],
  },
  vall: {
    complaints: ['vállfájdalom, beszűkült mozgástartomány', 'könyök- és csuklópanasz', 'izom túlfeszülés'],
    therapies: ['mulligan_terapia', 'fdm', 'kinezio_tape'],
  },
  derek: {
    complaints: ['derékfájás, hátfájás (porckorongsérv, becsípődés)', 'instabilitás, csigolyaelcsúszás', 'lábba sugárzó fájdalom, zsibbadás'],
    therapies: ['gyogytorna', 'fdm', 'dorn_terapia'],
  },
  has: {
    complaints: ['puffadás, székrekedés, IBS', 'fájdalmas menstruáció, ciszták', 'műtét utáni hegek, feszülő has'],
    therapies: ['visceralis_terapia', 'nyirok_kezeles', 'hegkezeles'],
  },
  csipo: {
    complaints: ['csípőfájdalom, beszűkült mozgás', 'aszimmetrikus terhelés, medenceferdeség', 'terhesség utáni panaszok'],
    therapies: ['dorn_terapia', 'gyogytorna', 'fdm'],
  },
  terd: {
    complaints: ['térdfájdalom lépcsőn, guggolásban', 'műtét utáni rehabilitáció', 'húzódások, sportsérülések'],
    therapies: ['mulligan_terapia', 'gyogytorna', 'kinezio_tape'],
  },
  boka: {
    complaints: ['bokaficam után maradt panasz', 'lábfájdalom, boka instabilitás', 'beszűkült boka mozgástartomány'],
    therapies: ['mulligan_terapia', 'fdm', 'kinezio_tape'],
  },
};

export const DEFAULT_REGION = 'derek';
