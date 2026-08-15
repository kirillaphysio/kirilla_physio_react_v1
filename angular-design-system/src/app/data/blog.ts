// Blog content: written posts and the patient-story archive.
//
// ⚠️ UNREVIEWED DRAFTS — the posts are realistic Hungarian drafts in Réka's voice
// (term → mechanism → "amikor ez neked segít"), written for the redesign. They need Réka's
// sign-off before they ship. The stories follow the same rule as the landing page's two: real
// cases, non-identifying, no promised outcome. Do NOT translate or reword the copy.
//
// Ported verbatim from the design project's ui_kits/website/blog-data.js. Body/text carry inline
// <strong> emphasis rendered downstream via [innerHTML] on `.kp-rich` (see styles.scss).
// Kept as data (never inlined in templates) so the drafts are easy to review and swap.

import { CaseStory } from './case';
import type { PlaylistKind } from '../ui/playlist-art/playlist-art-data';

/** A YouTube playlist tile on the blog: `list` is the playlist id, `art` the brand poster kind. */
export interface BlogPlaylist {
  list: string;
  art: PlaylistKind;
  title: string;
  description?: string;
}

export interface BlogPost {
  id: string;
  category: string;
  date: string;
  read: string;
  title: string;
  lead: string;
  /** HTML body (headings, paragraphs, lists, <strong>). Rendered via [innerHTML] on `.kp-rich`. */
  body: string;
}

/** A patient story with the blog archive's extra id/label on top of the shared CaseStory shape. */
export interface BlogStory extends CaseStory {
  id: string;
  label: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'reggeli-derekfajas',
    category: 'Derék',
    date: '2026. augusztus 4.',
    read: '6 perc',
    title: 'Miért fáj a derekad reggel, és mitől enyhül napközben?',
    lead: 'Ha a legrosszabb pillanat a felkelés, majd fél óra mozgás után enyhül a fájdalom, annak jellemzően nem a matrac az egyetlen oka. Végigveszem, mit jelez ez a mintázat, és mit érdemes vele tenni.',
    body: `
<p>A reggeli derékfájás az egyik leggyakoribb panasz, amivel megkeresnek. A mintázat szinte mindig ugyanaz: a felkelés éles, az első lépések nehezek, aztán 20–40 perc mozgás után a fájdalom oldódik, és estére visszatér a hosszú ülés vagy állás után.</p>
<h2>Mi történik éjszaka?</h2>
<p>Alvás közben a <strong>porckorongok</strong> visszaszívják a folyadékot, ezért reggel a gerinc kicsit "magasabb" és feszesebb. Ezzel párhuzamosan a derék körüli <strong>fascia</strong> — a kötőszöveti burok, ami az izmokat és az ízületeket összekapcsolja — mozgás nélkül veszít a csúszóképességéből. A kettő együtt adja azt a rideg, beállt érzést, ami a felkelést a nap legrosszabb pillanatává teszi.</p>
<h2>Miért enyhül aztán?</h2>
<p>A mozgás beindítja a szövetek anyagcseréjét, és aktiválja a <strong>mély stabilizátorokat</strong> (harántirányú hasfal, rekeszizom, medencefenék, a gerincet szegmentálisan tartó apró izmok). Amikor ezek időben bekapcsolnak, a gerinc terhelése egyenletesen oszlik el. Ha késnek, a nagy, felszínes izmok veszik át a munkát — ezért érzed, hogy napközben "beizzik" a derekad, aztán estére elfárad.</p>
<h2>Amikor ez neked segít</h2>
<p>Érdemes állapotfelmérésre gondolnod, ha a fentiek mellett ezek közül bármelyiket ismerősnek találod:</p>
<ul>
<li>a fájdalom reggel a legerősebb, és mozgásra enyhül</li>
<li>hosszú ülés után nehezen egyenesedsz ki</li>
<li>a fájdalom a fenékbe vagy a lábba sugárzik</li>
<li>évente többször "bemegy" a derekad, látszólag ok nélkül</li>
</ul>
<h2>Amit a kezelésben teszünk</h2>
<p>Az állapotfelmérés után jellemzően <strong>FDM</strong>-mel oldom a kötőszöveti feszülést, ha a tapintás és a mozgásvizsgálat erre utal. Ezután <strong>szegmentális stabilizációs tréning</strong> következik: nem hasprés és nem gerincerősítés, hanem az időzítés újratanítása, kis terhelésen, pontos technikával. A harmadik elem a napi rutin — 6–8 perc otthoni gyakorlat, amit reggel felkelés előtt, még az ágyban el tudsz kezdeni.</p>
<p>A kompetenciahatáraimat betartva: ha a vizsgálat során ideggyógyászati jelet, kisugárzó gyengeséget vagy éjszakai, mozgástól független fájdalmat találok, orvosi kivizsgálást javaslok, és a kezelést ahhoz igazítom.</p>`,
  },
  {
    id: 'mi-az-a-fascia',
    category: 'Fascia',
    date: '2026. július 21.',
    read: '5 perc',
    title: 'Mi az a fascia, és miért ott fáj, ahol nem is sérültél?',
    lead: 'A fascia a test összefüggő kötőszöveti hálója. Ha egy ponton elveszíti a csúszóképességét, a panasz gyakran attól a helytől távolabb jelentkezik. Erről szól az FDM.',
    body: `
<p>A <strong>fascia</strong> az a kötőszöveti háló, ami minden izmot, ízületet, eret és belső szervet beburkol, és egyetlen összefüggő rendszerré kapcsol össze. Nem passzív csomagolóanyag: erősen beidegzett, érzékeny szövet, ami reagál a terhelésre, a sérülésre és a tartós mozgáshiányra is.</p>
<h2>Miért nem ott fáj, ahol a probléma van?</h2>
<p>Mivel a háló összefüggő, egy feszes, összecsúszott terület máshol változtatja meg a húzási irányokat. Ezért fordul elő, hogy egy régi bokasérülés után évekkel a csípő vagy a derék kezd fájni, vagy hogy egy hasi műtét hege a hátban okoz feszülést.</p>
<h2>Mit jelent az FDM?</h2>
<p>A <strong>Fascia Distorsion Modell</strong> egy diagnosztikai és kezelési szemlélet: a páciens saját szavai, a fájdalom megmutatásának módja és a mozgásvizsgálat együtt mondja meg, milyen típusú kötőszöveti torzió áll a panasz mögött. Ez azért fontos, mert a különböző típusok különböző technikát igényelnek — nem ugyanaz a fogás jó egy vonalszerűen mutatott és egy tenyérrel körbesimított fájdalomra.</p>
<h2>Amikor ez neked segít</h2>
<ul>
<li>a fájdalmat pontosan meg tudod mutatni egy vonal vagy egy pont mentén</li>
<li>a mozgás egy adott szakaszán "elakadás" van, nem egyenletes fájdalom</li>
<li>korábbi sérülés vagy műtét után maradt vissza feszülés</li>
<li>a képalkotó vizsgálat nem magyaráz meg mindent, amit érzel</li>
</ul>
<p>Az FDM-kezelés lehet határozott és rövid ideig érzékeny. Ezt előre elmondom, és mindig a te visszajelzésedhez igazítom az erőt — nem a "fájjon, hogy hasson" elv alapján dolgozom.</p>`,
  },
  {
    id: 'nyak-monitor-elott',
    category: 'Testtartás',
    date: '2026. július 7.',
    read: '4 perc',
    title: 'Nyakfájás a monitor előtt: mit tehetsz a munkanapon belül?',
    lead: 'Nem az a cél, hogy nyolc órán át tökéletesen üljél. Az a cél, hogy a nyakad ne ugyanabban a helyzetben töltse az egész napot.',
    body: `
<p>A leggyakoribb kép: <strong>előreesett fejtartás</strong>, felhúzott vállak, és a nap végén húzó fájdalom a tarkótól a lapockáig. Ilyenkor a fej súlya nem a csontos szerkezeten, hanem a nyak hátsó izmain ül, és ezek az izmok nem arra készültek, hogy órákig tartsák.</p>
<h2>Miért nem a "húzd ki magad" a megoldás?</h2>
<p>Mert a kihúzott, feszes tartás ugyanolyan statikus, mint a görbe — csak más izmok fáradnak el benne. A nyaknak <strong>mozgásváltozatosság</strong> kell, nem egy jobb pozíció, amiben mozdulatlanul kitart.</p>
<h2>Amit a munkanapba be tudsz építeni</h2>
<ul>
<li>óránként egy 30 másodperces mozgásszünet: lapockakörzés, nyakforgatás lassan, végig fájdalom nélkül</li>
<li>a monitor felső széle szemmagasságban — a laptop önmagában szinte mindig túl alacsony</li>
<li>telefonos beszélgetés alatt állj fel és járkálj</li>
<li>este 3–4 perc légzésgyakorlat: a felső bordakosár helyett a rekeszizommal</li>
</ul>
<h2>Amikor érdemes kezelésre jönnöd</h2>
<p>Ha a fájdalom a karba sugárzik, zsibbadás vagy erőtlenség társul hozzá, vagy ha a nyakad reggelre már fájdalommal indul, akkor a napi rutin önmagában nem lesz elég. A kezelésben ilyenkor <strong>Mulligan terápia</strong> vagy <strong>FDM</strong> oldja az ízületi és kötőszöveti korlátot, és <strong>gyógytorna</strong> építi újra a lapockatájék tartását — mert oldani érdemes, de utána tartani is kell tudni.</p>`,
  },
  {
    id: 'legzes-es-stressz',
    category: 'Stressz',
    date: '2026. június 23.',
    read: '5 perc',
    title: 'Légzés és stressz: mit jelent a vagus terápia?',
    lead: 'A tartós stressz nem csak fejben van jelen. A nervus vagus állapota a légzésen, a szívritmuson és az emésztésen keresztül is látszik — és befolyásolható.',
    body: `
<p>A <strong>nervus vagus</strong> a leghosszabb agyidegünk: a nyaktól a mellkason át a hasi szervekig fut, és a <strong>paraszimpatikus idegrendszer</strong> fő szereplője. Ez az a rendszer, ami nyugalmi állapotban dolgozik — emészt, regenerál, lassít.</p>
<h2>Mit érzel, ha ez a rendszer alulműködik?</h2>
<ul>
<li>felületes, felső mellkasi légzés, sóhajtozás</li>
<li>tartósan emelkedett izomtónus, főleg a tarkón és a rágóizmokon</li>
<li>emésztési panaszok, puffadás stresszes időszakban</li>
<li>alvás, ami nem hoz kipihentséget</li>
</ul>
<h2>Mit teszünk a kezelésben?</h2>
<p>A <strong>vagus terápia</strong> finom, manuális munka a nyak, a rekeszizom és a hasi terület mentén, kiegészítve <strong>légzésgyakorlatokkal</strong>, amik a kilégzést hosszabbítják meg. Ez nem relaxációs óra: a cél az, hogy az idegrendszered újra tudjon váltani a "készenlét" és a "regeneráció" között — mert a fájdalomcsillapítás is ebben az állapotban működik jobban.</p>
<p>Ez a terápia nem helyettesíti a mentálhigiénés vagy orvosi ellátást. Ha a panaszaid hátterében elsősorban lelki nehézség áll, azt kimondom, és javaslom, hogy szakemberhez fordulj — a testi munka mellett, nem helyette.</p>`,
  },
  {
    id: 'hegkezeles',
    category: 'Hegkezelés',
    date: '2026. június 9.',
    read: '4 perc',
    title: 'Hegkezelés: mikor érdemes elkezdeni, és miért nem késő évek után sem?',
    lead: 'Egy heg nem csak a felszínen van. A műtét vagy sérülés utáni kötőszöveti összenövés a mozgást és a keringést is befolyásolja — és jól reagál a kezelésre.',
    body: `
<p>Egy <strong>heg</strong> a bőr felszínén látszik, de a szövetek több rétegében képződik: bőr, bőralatti kötőszövet, <strong>fascia</strong>, néha egészen a hasfalig vagy a hasüregi szervekig. Ahol a rétegek összetapadnak, ott a mozgás sem tud egymáson elcsúszni.</p>
<h2>Mit okozhat egy régi heg?</h2>
<ul>
<li>feszülő has, derékfájás császármetszés vagy hasi műtét után</li>
<li>a heg körüli terület érzékenysége vagy érzéketlensége</li>
<li>beszűkült mozgás egy ízület közelében</li>
<li>nyirokkeringési torlódás a heg mögötti területen</li>
</ul>
<h2>Időzítés</h2>
<p>A friss heg akkor kezelhető, amikor a seb <strong>teljesen zárt és gyógyult</strong> — ezt az operáló orvos engedélyéhez igazítom. Innentől a korai, finom munka sokat segít abban, hogy a rétegek ne tapadjanak össze. De a régi hegek is jól reagálnak: évekkel későbbi kezelésnél is helyreállítható a szövetek csúszóképessége, csak több időt kér.</p>
<p>A munka manuális: a heg és a körülötte lévő szövetek mobilizálása, szükség szerint <strong>cranio FDM</strong> vagy <strong>nyirokkezelés</strong> mellé építve, és otthon végezhető, napi néhány perces hegmasszázzsal folytatva.</p>`,
  },
  {
    id: 'terdfajdalom-lepcson',
    category: 'Térd',
    date: '2026. május 26.',
    read: '5 perc',
    title: 'Térdfájdalom lépcsőn: nem mindig a térd a hibás',
    lead: 'A térd a csípő és a lábfej között dolgozik. Ha bármelyik szomszédja nem végzi a munkáját, a terhelés a térdben landol.',
    body: `
<p>A lépcsőn lefelé menet, guggolásnál vagy hosszú séta után jelentkező térdfájdalom leggyakrabban <strong>terhelési</strong>, nem szerkezeti eredetű. Ez jó hír, mert a terhelés elosztása változtatható.</p>
<h2>Mit vizsgálok meg a térd helyett is?</h2>
<ul>
<li>a <strong>csípő</strong> stabilitása és a farizom munkája egy lábon állásban</li>
<li>a boka mozgástartománya — beszűkült bokánál a térd veszi át a mozgást</li>
<li>a lábfej terhelési mintája, boltozat, lábujjak</li>
<li>a lépcsőzés, guggolás, leguggolás–felállás valódi kivitelezése</li>
</ul>
<h2>Amit ilyenkor teszünk</h2>
<p>Ha a mozgásvizsgálat ízületi korlátot talál, <strong>Mulligan terápia</strong> segít visszaadni a térd vagy a boka szabad mozgását — jellemzően azonnal érzékelhető változással. Ezután <strong>gyógytorna</strong> következik: farizom- és csípőstabilitás, a lépcsőzés újratanítása lassú, kontrollált ismétlésekkel. Ha a terület akut és érzékeny, <strong>kinezio tape</strong> tud átmeneti támogatást adni a tanulási szakaszban.</p>
<h2>Amikor orvoshoz irányítalak</h2>
<p>Ha a térd bemelegszik, bedagad, blokkolódik, vagy trauma után instabil, akkor képalkotó vizsgálat kell először. Ezt megmondom, és a kezelést a diagnózishoz igazítom.</p>`,
  },
];

// The patient-story archive. The first two are the same cases the landing page shows (see
// data/case.ts); the rest extend the set. All are non-identifying drafts pending Réka's sign-off.
export const BLOG_STORIES: BlogStory[] = [
  {
    id: 'derekfajas-reggel',
    label: 'Derékfájás',
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
    id: 'fejfajas',
    label: 'Fejfájás',
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
  {
    id: 'vall-beszukult',
    label: 'Váll',
    meta: '50-es évek · fizikai munka · 8 hónapos panasz',
    title: 'Váll, ami nem engedte a karját a feje fölé',
    blocks: [
      { label: 'Panasz', text: 'Fájdalom a váll külső oldalán, és egy pont, ahol a kar emelése egyszerűen elakadt. Éjszaka az érintett oldalra fekve felébredt.' },
      { label: 'Mit találtam', text: 'Az ízületi mozgásvizsgálat egy jól körülírt <strong>elakadást</strong> jelzett a mozgástartomány közepén, a lapocka pedig késve indult a kar mozgásával.' },
      { label: 'Mit tettünk', text: '<strong>Mulligan terápia</strong> a mozgásív felszabadítására, majd lapocka-vezérelt <strong>gyógytorna</strong>, és a munkahelyi emelési technika átbeszélése.' },
    ],
    outcome: 'A kar újra a feje fölé emelhető, az éjszakai fájdalom elmúlt.',
    therapies: ['Mulligan terápia', 'Gyógytorna', 'Kinezio tape'],
  },
  {
    id: 'hasi-panasz',
    label: 'Belsőszervi',
    meta: '30-as évek · hasi műtét után 3 év · visszatérő panasz',
    title: 'Puffadás és derékfeszülés egy régi heg mögött',
    blocks: [
      { label: 'Panasz', text: 'Rendszeres puffadás, teltségérzés, és egy húzó feszülés a derék alsó szakaszán, amire a gyógytorna korábban nem hatott.' },
      { label: 'Mit találtam', text: 'A hasi <strong>heg</strong> körüli szövetek összetapadtak, a rekeszizom mozgása beszűkült, a légzés a felső bordakosárba került.' },
      { label: 'Mit tettünk', text: '<strong>Hegkezelés</strong> és <strong>viscerális terápia</strong>, mellé rekeszizom-légzés és napi néhány perces otthoni hegmasszázs.' },
    ],
    outcome: 'A puffadás ritkult, a derékfeszülés a légzés rendezésével oldódott.',
    therapies: ['Hegkezelés', 'Viscerális terápia', 'Vagus terápia'],
  },
  {
    id: 'boka-instabil',
    label: 'Boka',
    meta: '20-as évek · amatőr futó · 1 éves panasz',
    title: 'Bokaficam után maradt bizonytalanság',
    blocks: [
      { label: 'Panasz', text: 'A ficam meggyógyult, de egyenetlen talajon a boka bizonytalan maradt, és futás után rendszeresen fájt.' },
      { label: 'Mit találtam', text: 'Beszűkült boka mozgástartomány hajlításban, gyenge egylábas egyensúly, és a <strong>fascia</strong> feszülése a lábszár külső vonalán.' },
      { label: 'Mit tettünk', text: '<strong>Mulligan terápia</strong> a mozgástartományra, <strong>FDM</strong> a lábszár vonalára, majd fokozatos egyensúly- és futóterhelés-építés.' },
    ],
    outcome: 'Egyenetlen talajon is biztos a boka, a futás fájdalom nélkül visszaépült.',
    therapies: ['Mulligan terápia', 'FDM', 'Gyógytorna'],
  },
  {
    id: 'terhesseg-utan',
    label: 'Szülés után',
    meta: '30-as évek · második szülés után 9 hónap',
    title: 'Medencetáji panasz a szülés utáni visszatérésnél',
    blocks: [
      { label: 'Panasz', text: 'Fájdalom a keresztcsont mellett járás és babahordozás közben, valamint nyomásérzés terhelésre.' },
      { label: 'Mit találtam', text: 'Aszimmetrikus medenceterhelés, a <strong>medencefenék</strong> és a harántirányú hasfal késő bekapcsolása, feszes csípőhajlítók.' },
      { label: 'Mit tettünk', text: '<strong>Dorn terápia</strong> a medence rendezésére, majd lépésenként felépített <strong>szegmentális stabilizációs tréning</strong> és a hordozási testhelyzetek átbeszélése.' },
    ],
    outcome: 'A járás és a hordozás fájdalom nélkül megy, a terhelés újra szimmetrikus.',
    therapies: ['Dorn terápia', 'Gyógytorna', 'Kinezio tape'],
  },
  {
    id: 'terd-lepcso',
    label: 'Térd',
    meta: '40-es évek · ülő munka · 6 hónapos panasz',
    title: 'Térdfájdalom lépcsőn lefelé',
    blocks: [
      { label: 'Panasz', text: 'Lépcsőn lefelé és guggolásnál jelentkező térdfájdalom, ami hosszú séta után is előjött.' },
      { label: 'Mit találtam', text: 'A térd szerkezetileg rendben volt: a <strong>csípő</strong> stabilitása és a farizom munkája hiányzott, a boka mozgástartománya beszűkült.' },
      { label: 'Mit tettünk', text: '<strong>Mulligan terápia</strong> a bokára és a térdre, utána farizom- és csípőstabilitás építése, a lépcsőzés újratanítása lassú ismétlésekkel.' },
    ],
    outcome: 'A lépcsőzés fájdalommentes, a hosszú séta már nem hozza vissza a panaszt.',
    therapies: ['Mulligan terápia', 'Gyógytorna'],
  },
];

// The real YouTube playlists on the channel. `art` names the brand poster (see PlaylistArt);
// order is editorial — body regions from the spine down, then stress, then the personal vlogs.
export const BLOG_PLAYLISTS: BlogPlaylist[] = [
  { list: 'PL88GCL4sFg6WSPVyvKiTFOjDdPxn_Hb3U', art: 'spine', title: 'Gerinc/derékfájás', description: 'Napi rutin gyakorlatok és magyarázatok a gerincről és a derékfájásról.' },
  { list: 'PL88GCL4sFg6VyDscEDRWCPRwJEV29IJP2', art: 'neck', title: 'Nyak-váll-lapocka' },
  { list: 'PL88GCL4sFg6XJnw_L2ztNxWoJQ2-e-Mnj', art: 'hip', title: 'Csípő' },
  { list: 'PL88GCL4sFg6XAyx9mSnMizhIJ5fAS0wKK', art: 'knee', title: 'Térd' },
  { list: 'PL88GCL4sFg6WULa6tOq5DBH5GA56RvxwV', art: 'foot', title: 'Lábfej-sarok-talp' },
  { list: 'PL88GCL4sFg6U-OPty2kAnHOptNyXGDryz', art: 'hand', title: 'Könyök-csukló-kéz' },
  { list: 'PLKr-ARwW4tO0', art: 'stress', title: 'Stressz', description: 'Feszültségoldás, légzés és paraszimpatikus hangolás — otthon is elvégezhető gyakorlatokkal.' },
  { list: 'PL88GCL4sFg6XKFGftYYODQBdMqTiq_ZXQ', art: 'vlog', title: 'Vlog/sztori' },
];

/** Lookup one post by id (used by /blog/:id and its prerender params). */
export function blogPostById(id: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.id === id);
}
