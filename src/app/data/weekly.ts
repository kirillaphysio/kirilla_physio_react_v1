// Weekly footer message. The ISO week number indexes a 52-entry list, so it advances on its
// own and loops each year — nothing schedules it. Ported verbatim from WeeklyMessage.jsx.

export interface WeeklyTopic {
  label: string;
  icon: string;
}

export interface WeeklyEntry {
  week: number;
  topic: string;
  text: string;
}

/** The eight topics, each with its glyph name. Topic labels are never rendered. */
export const WEEKLY_TOPICS: Record<string, WeeklyTopic> = {
  motivacio: { label: 'Motiváció', icon: 'bolt' },
  onszeretet: { label: 'Önszeretet', icon: 'heart' },
  mentalis: { label: 'Mentális egészség', icon: 'brain' },
  testpozitivitas: { label: 'Testpozitivitás', icon: 'person-rays' },
  mozgas: { label: 'Mozgás öröme', icon: 'person-running' },
  pihenes: { label: 'Pihenés és regeneráció', icon: 'moon' },
  turelem: { label: 'Türelem a gyógyulásban', icon: 'hourglass-half' },
  testtudatossag: { label: 'Testtudatosság', icon: 'spa' },
};

export const WEEKLY_MESSAGES: WeeklyEntry[] = [
  { week: 1, topic: 'motivacio', text: 'A haladás nem mindig látványos. Néha az a győzelem, hogy ma is elvégezted a gyakorlataidat.' },
  { week: 2, topic: 'onszeretet', text: 'Ma is megérdemelsz tíz percet magadra. Ez nem jutalom, hanem szükséglet.' },
  { week: 3, topic: 'mentalis', text: 'A feszes váll gyakran a fejben kezdődik. Ha megállsz és lassan kifújod a levegőt, a tested is követi.' },
  { week: 4, topic: 'testpozitivitas', text: 'A tested nem projekt, amit be kell fejezni. Veled van minden nap, és mindent megtesz érted.' },
  { week: 5, topic: 'mozgas', text: 'A mozgásnak nem kell tökéletesnek lennie ahhoz, hogy jót tegyen. Elég, ha jólesik.' },
  { week: 6, topic: 'pihenes', text: 'A pihenés is a gyógyulás része. A tested akkor épül, amikor megengeded neki.' },
  { week: 7, topic: 'turelem', text: 'A gyógyulás ritkán egyenes út. Egy rosszabb nap nem törli el azt, amit eddig felépítettél.' },
  { week: 8, topic: 'testtudatossag', text: 'Figyeld meg ma egyszer, hogyan ülsz. A tested apró jelekkel szól, jóval a fájdalom előtt.' },
  { week: 9, topic: 'motivacio', text: 'Nem kell nagy lépés. Egy tízperces séta ma többet ér, mint egy tökéletes terv holnapra.' },
  { week: 10, topic: 'onszeretet', text: 'Beszélj magaddal úgy, ahogy a barátodhoz szólnál egy nehéz nap után.' },
  { week: 11, topic: 'mentalis', text: 'A stressz a testben is lakik. Ha a válladat leengeded, a fejed is könnyebb lesz.' },
  { week: 12, topic: 'testpozitivitas', text: 'A tested minden nap dolgozik érted, akkor is, amikor nem vagy elégedett vele.' },
  { week: 13, topic: 'mozgas', text: 'Keresd meg azt a mozgásformát, amit szívesen csinálsz. Az fog megmaradni.' },
  { week: 14, topic: 'pihenes', text: 'Az izom nem az edzés alatt erősödik, hanem utána, amikor pihen.' },
  { week: 15, topic: 'turelem', text: 'A szövetek a saját tempójukban gyógyulnak, nem a naptár szerint.' },
  { week: 16, topic: 'testtudatossag', text: 'Vedd észre, hogyan tartod a válladat, amikor a telefonodat nézed.' },
  { week: 17, topic: 'motivacio', text: 'A rendszeresség erősebb, mint a lelkesedés. A rossz napokon is működik.' },
  { week: 18, topic: 'onszeretet', text: 'A tested nem hibázott, amikor megfájdult. Jelzett.' },
  { week: 19, topic: 'mentalis', text: 'Három lassú kilégzés. Ennyi kell ahhoz, hogy az idegrendszered váltson.' },
  { week: 20, topic: 'testpozitivitas', text: 'Nem az a kérdés, hogyan néz ki. Az, hogy hogyan érzed magad benne.' },
  { week: 21, topic: 'mozgas', text: 'A mozgás nem büntetés. Ajándék a testednek.' },
  { week: 22, topic: 'pihenes', text: 'Az alvás a legolcsóbb regeneráció, ami létezik.' },
  { week: 23, topic: 'turelem', text: 'Ami évek alatt alakult ki, az nem egy kezelés alatt oldódik.' },
  { week: 24, topic: 'testtudatossag', text: 'A test előbb suttog, mint kiabál. Érdemes a suttogásra figyelni.' },
  { week: 25, topic: 'motivacio', text: 'Amit ma megmozgatsz, azt a tested holnap megköszöni.' },
  { week: 26, topic: 'onszeretet', text: 'Nem kell kiérdemelned a pihenést.' },
  { week: 27, topic: 'mentalis', text: 'Nem kell mindent egyszerre megoldanod. Csak a következő lépést.' },
  { week: 28, topic: 'testpozitivitas', text: 'Hasonlítsd magad a tegnapi önmagadhoz, ne máshoz.' },
  { week: 29, topic: 'mozgas', text: 'Nem kell edzésnek hívni. A tánc a konyhában is számít.' },
  { week: 30, topic: 'pihenes', text: 'A szünet nem kiesés a folyamatból. Része a folyamatnak.' },
  { week: 31, topic: 'turelem', text: 'A javulás gyakran csendes: kevesebb fájdalom, jobb alvás, könnyebb mozdulat.' },
  { week: 32, topic: 'testtudatossag', text: 'Állj fel óránként egyszer. A legjobb testtartás a következő.' },
  { week: 33, topic: 'motivacio', text: 'Ha kimaradt egy hét, nem kezdted elölről. Csak folytatod ott, ahol abbahagytad.' },
  { week: 34, topic: 'onszeretet', text: 'Ma engedd el egy elvárásodat magaddal szemben. Csak egyet.' },
  { week: 35, topic: 'mentalis', text: 'A rossz alvás a legjobb terápiát is visszafogja. Kezdd ott.' },
  { week: 36, topic: 'testpozitivitas', text: 'A hegek, a változások, az évek mind arról szólnak, hogy éltél.' },
  { week: 37, topic: 'mozgas', text: 'A legjobb gyakorlat az, amit tényleg elvégzel.' },
  { week: 38, topic: 'pihenes', text: 'Ha fáradtan feszítesz tovább, a tested nem fejlődik, csak kopik.' },
  { week: 39, topic: 'turelem', text: 'Ha ma nem érzed a változást, attól még történik.' },
  { week: 40, topic: 'testtudatossag', text: 'Figyeld a légzésedet egy percig. Hasból vagy mellkasból veszed a levegőt?' },
  { week: 41, topic: 'motivacio', text: 'A cél nem az, hogy kibírd. Az, hogy jól legyél közben.' },
  { week: 42, topic: 'onszeretet', text: 'Az önmagadra fordított idő nem önzés, hanem karbantartás.' },
  { week: 43, topic: 'mentalis', text: 'Ha kimondod, mi nyomaszt, a tested is könnyebben enged.' },
  { week: 44, topic: 'testpozitivitas', text: 'A tested nem ellenfél, akit le kell győzni. Partner, akivel együtt dolgozol.' },
  { week: 45, topic: 'mozgas', text: 'Ha ma nincs erőd az egészhez, csinálj belőle ötöt. Az is mozgás.' },
  { week: 46, topic: 'pihenes', text: 'Egy nyugodt este többet segít a hátadon, mint egy újabb gyakorlat.' },
  { week: 47, topic: 'turelem', text: 'Ne csak a fájdalom eltűnését várd. Figyeld azt is, mennyit bírsz már.' },
  { week: 48, topic: 'testtudatossag', text: 'Amikor emelsz, előbb a lábad dolgozzon, csak utána a hátad.' },
  { week: 49, topic: 'motivacio', text: 'Kezdd a legkisebb gyakorlattal, amit biztosan meg tudsz csinálni. A többi jön magától.' },
  { week: 50, topic: 'onszeretet', text: 'Elég vagy úgy, ahogy most vagy — a gyógyulás közepén is.' },
  { week: 51, topic: 'mentalis', text: 'A pihent fej könnyebben viseli a fájdalmat is. Ez nem gyengeség, hanem élettan.' },
  { week: 52, topic: 'testpozitivitas', text: 'Köszönj meg ma a testednek egy dolgot, amit magától tud.' },
];

/** ISO-8601 week number for a date (defaults to today). */
export function isoWeek(date = new Date()): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const jan1 = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - jan1.getTime()) / 86400000 + 1) / 7);
}
