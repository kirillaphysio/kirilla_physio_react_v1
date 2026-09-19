// Minimalistic playlist illustrations in the brand-mark idiom: soft pastel anatomy with flowers
// and leaves. Pure geometry (rounded rects, circles, almond leaves) — no photographic thumbnails.
// Ported verbatim (same coordinates) from the design project's ui_kits/website/PlaylistArt.jsx.
// viewBox is 160×90 to match the 16:9 poster slot. These strings are static, author-controlled
// markup — the component injects them with bypassSecurityTrustHtml (no user input reaches here).

export type PlaylistKind =
  | 'spine'
  | 'neck'
  | 'hip'
  | 'knee'
  | 'foot'
  | 'hand'
  | 'stress'
  | 'vlog';

export const PLAYLIST_KINDS: readonly PlaylistKind[] = [
  'spine', 'neck', 'hip', 'knee', 'foot', 'hand', 'stress', 'vlog',
];

const A = {
  bone: '#D8BEC3', boneDeep: '#C3A0A7', boneSoft: '#EAD9DC',
  petal: '#DAA8C5', petalSoft: '#EBD4E2', petalDeep: '#CB7AA9', blush: '#E3A9A6',
  sage: '#A3B49B', sageSoft: '#C3D0BC', core: '#F5DEDC',
};

interface LeafOpts { r?: number; s?: number; fill?: string; o?: number; }
function leaf(x: number, y: number, { r = 0, s = 1, fill = A.sage, o = 1 }: LeafOpts = {}): string {
  return `<path d="M0 0C7 -8 18 -8 25 0C18 8 7 8 0 0Z" fill="${fill}" opacity="${o}" transform="translate(${x} ${y}) rotate(${r}) scale(${s})"/>`;
}

interface FlowerOpts { s?: number; petal?: string; core?: string; n?: number; }
function flower(x: number, y: number, { s = 1, petal = A.petal, core = A.core, n = 5 }: FlowerOpts = {}): string {
  const petals = Array.from({ length: n }, (_, i) => {
    const a = (360 / n) * i;
    return `<ellipse cx="0" cy="-6.4" rx="4" ry="6.4" fill="${petal}" opacity="0.92" transform="rotate(${a})"/>`;
  }).join('');
  return `<g transform="translate(${x} ${y}) scale(${s})">${petals}<circle r="2.8" fill="${core}"/></g>`;
}

function bud(x: number, y: number, { s = 1, fill = A.petalDeep }: { s?: number; fill?: string } = {}): string {
  return `<g transform="translate(${x} ${y}) scale(${s})"><ellipse rx="3" ry="4.2" fill="${fill}" opacity="0.9"/></g>`;
}

function stem(d: string): string {
  return `<path d="${d}" fill="none" stroke="${A.sage}" stroke-width="1.3" stroke-linecap="round" opacity="0.85"/>`;
}

const SCENES: Record<PlaylistKind, string> = {
  spine:
    stem('M52 74C44 58 46 40 56 26') +
    leaf(52, 62, { r: 196, s: 0.62, fill: A.sageSoft }) +
    leaf(47, 46, { r: 168, s: 0.7 }) +
    leaf(50, 31, { r: 200, s: 0.58, fill: A.sageSoft }) +
    stem('M110 76C118 58 114 40 104 27') +
    leaf(112, 64, { r: -20, s: 0.62 }) +
    leaf(114, 47, { r: -4, s: 0.7, fill: A.sageSoft }) +
    Array.from({ length: 7 }, (_, i) => {
      const w = 30 - i * 2.4, h = 7.4;
      return `<rect x="${80 - w / 2}" y="${11 + i * 10.2}" width="${w}" height="${h}" rx="${h / 2}" fill="${i % 2 ? A.bone : A.boneDeep}" opacity="${i % 2 ? 1 : 0.86}"/>`;
    }).join('') +
    flower(112, 30, { s: 1.05 }) +
    flower(49, 22, { s: 0.8, petal: A.petalSoft, core: A.blush }) +
    bud(122, 49, { s: 0.9 }),
  neck:
    `<path d="M100 40L126 46Q120 68 102 62Z" fill="${A.bone}" stroke="${A.bone}" stroke-width="6" stroke-linejoin="round" opacity="0.8" transform="rotate(8 112 52)"/>` +
    Array.from({ length: 6 }, (_, i) => {
      const cx = 78 + i * 1.6 - (i > 2 ? (i - 2) * 3 : 0), cy = 14 + i * 9.6, rot = -6 + i * 3;
      return `<rect x="${cx - 10}" y="${cy}" width="20" height="7" rx="3.5" fill="${i % 2 ? A.bone : A.boneDeep}" opacity="${i % 2 ? 1 : 0.88}" transform="rotate(${rot} ${cx} ${cy + 3.5})"/>`;
    }).join('') +
    stem('M40 74C34 58 38 42 50 32') +
    leaf(38, 62, { r: 200, s: 0.66 }) +
    leaf(40, 46, { r: 172, s: 0.58, fill: A.sageSoft }) +
    flower(42, 30, { s: 1 }) +
    flower(124, 72, { s: 0.82, petal: A.petalSoft, core: A.blush }) +
    leaf(106, 78, { r: -14, s: 0.6, fill: A.sageSoft }) +
    bud(62, 22, { s: 0.85 }),
  hip:
    `<path d="M72 32Q46 28 44 46Q44 60 58 62Q70 62 72 50Z" fill="${A.bone}"/>` +
    `<path d="M88 32Q114 28 116 46Q116 60 102 62Q90 62 88 50Z" fill="${A.bone}"/>` +
    `<rect x="73" y="32" width="14" height="28" rx="7" fill="${A.boneDeep}" opacity="0.9"/>` +
    `<circle cx="52" cy="68" r="8" fill="${A.boneDeep}" opacity="0.85"/>` +
    `<circle cx="108" cy="68" r="8" fill="${A.boneDeep}" opacity="0.85"/>` +
    `<rect x="70" y="60" width="20" height="8" rx="4" fill="${A.boneSoft}"/>` +
    stem('M30 78C26 62 32 46 44 38') +
    leaf(28, 66, { r: 198, s: 0.64 }) +
    leaf(31, 52, { r: 170, s: 0.56, fill: A.sageSoft }) +
    flower(34, 34, { s: 1 }) +
    stem('M130 78C134 62 128 46 116 38') +
    leaf(132, 64, { r: -22, s: 0.62, fill: A.sageSoft }) +
    flower(126, 34, { s: 0.84, petal: A.petalSoft, core: A.blush }) +
    bud(112, 20, { s: 0.9 }),
  knee:
    `<path d="M52 14L86 44" stroke="${A.boneDeep}" stroke-width="13" stroke-linecap="round" opacity="0.9"/>` +
    `<path d="M86 44L66 82" stroke="${A.bone}" stroke-width="13" stroke-linecap="round"/>` +
    `<circle cx="87" cy="45" r="11" fill="${A.boneSoft}"/>` +
    `<circle cx="101" cy="41" r="5.5" fill="${A.blush}" opacity="0.75"/>` +
    stem('M40 76C34 60 40 44 52 36') +
    leaf(38, 64, { r: 200, s: 0.64 }) +
    leaf(41, 50, { r: 172, s: 0.56, fill: A.sageSoft }) +
    flower(44, 30, { s: 1.02 }) +
    flower(116, 62, { s: 0.86, petal: A.petalSoft, core: A.blush }) +
    leaf(112, 40, { r: -30, s: 0.62, fill: A.sageSoft }) +
    bud(124, 34, { s: 0.9 }),
  foot:
    `<path d="M80 30Q60 32 58 48Q56 64 66 74Q76 82 88 74Q100 64 98 48Q96 32 80 30Z" fill="${A.bone}"/>` +
    `<ellipse cx="66" cy="22" rx="6.6" ry="7.4" fill="${A.boneDeep}" opacity="0.85"/>` +
    Array.from({ length: 4 }, (_, i) =>
      `<ellipse cx="${78 + i * 7}" cy="${19 + i * 2.4}" rx="${4.6 - i * 0.5}" ry="${5.4 - i * 0.5}" fill="${A.boneDeep}" opacity="0.85"/>`,
    ).join('') +
    `<circle cx="78" cy="68" r="8" fill="${A.boneSoft}" opacity="0.9"/>` +
    stem('M34 80C28 66 32 50 44 42') +
    leaf(30, 62, { r: 196, s: 0.6, fill: A.sageSoft }) +
    flower(36, 36, { s: 0.95 }) +
    stem('M132 78C136 62 130 48 120 42') +
    leaf(134, 66, { r: -22, s: 0.6 }) +
    flower(128, 26, { s: 0.86, petal: A.petalSoft, core: A.blush }) +
    bud(70, 72, { s: 0.9 }),
  hand:
    `<rect x="66" y="40" width="34" height="34" rx="12" fill="${A.bone}"/>` +
    Array.from({ length: 4 }, (_, i) =>
      `<rect x="${67 + i * 8.4}" y="${16 + Math.abs(i - 1.5) * 4}" width="6.6" height="${26 - Math.abs(i - 1.5) * 4}" rx="3.3" fill="${A.boneDeep}" opacity="0.9"/>`,
    ).join('') +
    `<rect x="98" y="50" width="18" height="6.6" rx="3.3" fill="${A.boneDeep}" opacity="0.9" transform="rotate(28 98 50)"/>` +
    `<path d="M60 76C52 70 48 62 50 54" fill="none" stroke="${A.boneSoft}" stroke-width="7" stroke-linecap="round"/>` +
    stem('M34 78C28 62 34 46 46 38') +
    leaf(31, 64, { r: 198, s: 0.62 }) +
    leaf(34, 50, { r: 170, s: 0.54, fill: A.sageSoft }) +
    flower(38, 30, { s: 1 }) +
    flower(122, 66, { s: 0.84, petal: A.petalSoft, core: A.blush }) +
    leaf(116, 30, { r: -26, s: 0.6, fill: A.sageSoft }) +
    bud(126, 38, { s: 0.88 }),
  stress:
    `<path d="M80 30C72 20 56 22 54 36C52 50 68 58 80 68C92 58 108 50 106 36C104 22 88 20 80 30Z" fill="${A.bone}" opacity="0.55"/>` +
    [22, 30, 38].map((r, i) =>
      `<circle cx="80" cy="46" r="${r}" fill="none" stroke="${A.petalSoft}" stroke-width="1.4" opacity="${0.75 - i * 0.18}"/>`,
    ).join('') +
    flower(80, 46, { s: 1.15, petal: A.petal, core: A.core, n: 6 }) +
    leaf(44, 70, { r: 196, s: 0.66 }) +
    leaf(118, 72, { r: -16, s: 0.66, fill: A.sageSoft }) +
    bud(36, 30, { s: 0.9 }) +
    bud(124, 26, { s: 0.9, fill: A.blush }),
  vlog:
    `<rect x="46" y="26" width="62" height="42" rx="12" fill="${A.bone}"/>` +
    `<path d="M112 38L128 30V64L112 56Z" fill="${A.boneDeep}" opacity="0.85"/>` +
    `<circle cx="77" cy="47" r="12" fill="${A.boneSoft}"/>` +
    `<circle cx="77" cy="47" r="5.5" fill="${A.petalSoft}"/>` +
    stem('M34 78C28 62 34 46 46 38') +
    leaf(31, 64, { r: 198, s: 0.62 }) +
    flower(36, 30, { s: 0.98 }) +
    flower(112, 76, { s: 0.8, petal: A.petalSoft, core: A.blush }) +
    leaf(94, 80, { r: -12, s: 0.6, fill: A.sageSoft }) +
    bud(128, 20, { s: 0.9 }),
};

export const PLAYLIST_GROUNDS: Record<PlaylistKind, string> = {
  spine: 'linear-gradient(150deg,#FBF2F1 0%,#F5DEDC 100%)',
  neck: 'linear-gradient(150deg,#FBF6F1 0%,#F0E9F2 100%)',
  hip: 'linear-gradient(150deg,#F9F4F7 0%,#F5DEDC 100%)',
  knee: 'linear-gradient(150deg,#FFEDE4 0%,#FBF2F1 100%)',
  foot: 'linear-gradient(150deg,#F6F1F7 0%,#FCE5EE 100%)',
  hand: 'linear-gradient(150deg,#FBF2F1 0%,#E9DFEC 100%)',
  stress: 'linear-gradient(150deg,#FCE5EE 0%,#FBF6F1 100%)',
  vlog: 'linear-gradient(150deg,#F0E9F2 0%,#F5DEDC 100%)',
};

/** Full `<svg>` poster markup for a kind (falls back to `spine`). */
export function playlistSvg(kind: PlaylistKind): string {
  const scene = SCENES[kind] ?? SCENES.spine;
  return `<svg viewBox="0 0 160 90" role="img" aria-hidden="true" preserveAspectRatio="xMidYMid meet">${scene}</svg>`;
}
