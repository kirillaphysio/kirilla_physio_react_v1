// Blog content: written posts and the patient-story archive.
//
// BLOG_POSTS are Réka's own revised articles (source: data/blog_revised/blog-1..4, raw text
// reformatted into HTML — content/wording untouched). Body/text carry inline <strong> emphasis
// rendered downstream via [innerHTML] on `.kp-rich` (see styles.scss). A post with a `videoId`
// renders a consent-gated YouTube embed on its page (see blog-post-page.html).
//
// ⚠️ UNREVIEWED DRAFTS — the patient stories below are realistic Hungarian drafts in Réka's voice,
// written for the redesign. They need Réka's sign-off before they ship. They follow the same rule
// as the landing page's two: real cases, non-identifying, no promised outcome. Do NOT translate or
// reword the copy. Ported verbatim from the design project's ui_kits/website/blog-data.js.

import { CaseStory } from './case';
import type { PlaylistKind } from '../ui/playlist-art/playlist-art-data';

/**
 * A YouTube playlist tile on the blog: `list` is the playlist id, `image` the real thumbnail
 * (served from `public/assets/images/`), `art` the brand SVG poster kept as a fallback.
 */
export interface BlogPlaylist {
  list: string;
  art: PlaylistKind;
  image: string;
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
  /** YouTube video id embedded on the post page (consent-gated `kp-video-embed`). Optional. */
  videoId?: string;
  /** Accessible title for the embed, taken from the post's own "Nézd meg a videót" line. */
  videoTitle?: string;
}

/** A patient story with the blog archive's extra id/label on top of the shared CaseStory shape. */
export interface BlogStory extends CaseStory {
  id: string;
  label: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'banyapup',
    category: 'Testtartás',
    date: '2026. szeptember 15.',
    read: '4 perc',
    title: 'Banyapúp – mi okozza, és mit tehetsz ellene?',
    lead: 'A nyak és hát találkozásánál kialakuló domborulat gyakran nem egyetlen okra vezethető vissza. Végigveszem, mi állhat mögötte, és mit lehet ellene tenni.',
    videoId: 'jrYJ84CvHnk',
    videoTitle: 'Banyapúp – mit tehetsz ellene?',
    body: `
<p>A „banyapúp” egy hétköznapi elnevezés arra a nyak és hát találkozásánál látható domborulatra, amely sokaknál főként esztétikai problémát jelent, előrehaladottabb esetben azonban mozgásszervi panaszokkal és fájdalommal is társulhat.</p>
<p>Fontos tudni, hogy a banyapúp nem egy pontos orvosi diagnózis, és többféle jelenséget is takarhat. A nyak alsó részén, a <strong>C7-es csigolya</strong> környékén egészséges esetben is lehet egy kisebb dudor (a C7-es csigolya hátsó tővisnyúlványa), de a látványosabb „púp” hátterében állhat a felső háti szakasz fokozott görbülete (<strong>kyphosis</strong>), illetve zsírszövet-felszaporodás is. Utóbbi hivatalos megnevezése <strong>dorsocervicalis zsírszövet-felszaporodás</strong> (dorsocervical fat pad).</p>
<h2>Mi okozhatja a banyapúpot?</h2>
<p>A kialakulásában több tényező is szerepet játszhat. A tartós előrebiccentett fejtartás és előreeső vállak, például sok ülőmunka vagy telefonhasználat mellett, fokozott terhelést jelenthet a nyak alsó és a hát felső szakaszának.</p>
<p>Ha a fej és a vállak hosszú időn keresztül előreeső helyzetben vannak, megváltozhat az izmok működése is. A mellizmok feszesebbé válhatnak, miközben a lapockák körüli és egyes hátizmok gyengébbé válhatnak. Ez hozzájárulhat a testtartás megváltozásához.</p>
<p>A nyak hátsó részén megjelenő zsírfelhalmozódásnak ugyanakkor más okai is lehetnek. Bizonyos hormonális eltérések, például a <strong>Cushing-szindróma</strong>, szintén okozhatnak dorsocervicalis zsírszövet-felszaporodást.</p>
<h2>Lehet-e tenni a banyapúp ellen?</h2>
<p>Igen, de az eredmény nagyban függ attól, mi áll a háttérben.</p>
<p>Ha elsősorban mozgásszervi és tartási tényezők játszanak szerepet, a megfelelően megválasztott <strong>gyógytorna</strong> segíthet a gerinc és a vállöv mozgásának javításában, az elgyengült izmok erősítésében és a feszesebb ízületek mobilizálásában.</p>
<p>Nincs azonban egyetlen tökéletes gyakorlat a banyapúpra. Sok hasznos gyakorlat létezik, és hogy ezek mennyit segítenek a banyapúp enyhítésében vagy akár eltüntetésében, az az adott személy állapotától és a probléma súlyosságától függ.</p>
<p>Az is sokat számíthat, hogy a mindennapokban mennyi időt töltünk egy adott testhelyzetben. Ülőmunka esetén például érdemes a monitort megfelelő magasságba állítani, és a telefon használatakor is kerülni a hosszú ideig fennálló, erősen előrebillentett fejtartást.</p>
<p>Ha a banyapúp mellett fájdalom, zsibbadás vagy más tartós panasz is jelentkezik, érdemes személyesen konzultálni orvossal/gyógytornásszal.</p>`,
  },
  {
    id: 'piriformis-szindroma',
    category: 'Csípő',
    date: '2026. szeptember 8.',
    read: '4 perc',
    title: 'Piriformis szindróma – csípő és ülőideg fájdalom',
    lead: 'A farpofában és a comb hátsó részén jelentkező, üléstől erősödő fájdalom hátterében gyakran a piriformis izom és az ülőideg kapcsolata áll. Megnézzük, mit jelent ez, és mit lehet vele kezdeni.',
    videoId: 'S3Zd1YdsED4',
    videoTitle: 'Piriformis szindróma, csípő és ülőideg fájdalom – mit csinálj?',
    body: `
<p>A piriformis szindróma egy olyan mozgásszervi probléma, amelynél a farpofa területén jelentkező fájdalomhoz akár az <strong>ülőideg</strong> irritációja is társulhat. A fájdalom emiatt nemcsak a farpofában, hanem a comb hátsó részén is érezhető lehet, és sokaknál az ülés fokozza a panaszokat.</p>
<p>A piriformis szindrómát gyakran az úgynevezett <strong>mély farizom szindróma</strong> (deep gluteal syndrome) részeként említik. Ez egy tágabb fogalom, amely több olyan állapotot is magában foglal, amikor a farpofa mélyén az ülőideg érintetté válik.</p>
<h2>Mi az a piriformis izom?</h2>
<p>A <strong>piriformis</strong> egy mélyen elhelyezkedő farizom, amely a keresztcsonttól a combcsont felső részéhez fut. Anatómiai elhelyezkedése miatt közel van az ülőideghez, ezért bizonyos esetekben szerepet játszhat az ideg irritációjában vagy kompressziójában.</p>
<p>Fontos azonban, hogy nem minden farpofába vagy lábba sugárzó fájdalom piriformis szindróma. Hasonló panaszokat okozhat például a gerincből kiinduló idegi érintettség vagy a mély farizom területének más problémája is.</p>
<h2>Milyen tünetei lehetnek?</h2>
<p>A leggyakoribb panasz a farpofában jelentkező fájdalom vagy érzékenység, amely esetenként a comb hátsó részébe is kisugározhat. Jellemző lehet, hogy a tünetek:</p>
<ul>
<li>hosszabb ülés után erősödnek</li>
<li>bizonyos csípőmozgásoknál fokozódnak</li>
<li>a farpofa mélyén jelentkeznek</li>
<li>esetenként zsibbadó, bizsergő vagy idegi jellegű érzéssel is társulnak</li>
</ul>
<h2>Hogyan lehet kezelni?</h2>
<p>A kezelés mindig attól függ, hogy mi okozza az adott panaszokat. Ha a tünetek hátterében a mély farizom területének problémája és az ülőideg érintettsége áll, a konzervatív kezelés része lehet az érintett izmok és idegek megfelelő mozgatása, valamint a provokáló tevékenységek módosítása.</p>
<p>Ha a fájdalom tartósan fennáll, erősödik, zsibbadással vagy más idegi tünetekkel jár, érdemes személyesen orvossal vagy gyógytornásszal konzultálni.</p>`,
  },
  {
    id: 'uloideg-fajdalom-isiasz',
    category: 'Ülőideg',
    date: '2026. szeptember 1.',
    read: '4 perc',
    title: 'Ülőideg fájdalom, isiász – a nyújtás nem mindig jó megoldás',
    lead: 'Isiász esetén ösztönösen nyújtanánk a feszülő combhátsót, de idegérintettség esetén ez sokszor inkább árt, mint használ. Megnézzük, miért, és mi segíthet helyette.',
    videoId: 'NBh60da2ZTY',
    videoTitle: 'Idegmobilizáló gyakorlatok ülőideg fájdalom ellen | Ezért ne nyújtsd!',
    body: `
<p>Az ülőideg fájdalom, más néven <strong>isiász</strong> vagy ülőidegzsába, sok ember életét megkeserítheti. Tipikus tünet, amikor a derékból a csípőn és a comb hátsó részén keresztül akár a lábszárig sugárzó, éles vagy égő fájdalom jelentkezik, amelyhez zsibbadás vagy bizsergés is társulhat.</p>
<h2>Mi okozhatja az ülőideg fájdalmat?</h2>
<p>Az ülőideg fájdalmának többféle oka lehet. A panasz hátterében állhat például <strong>porckorongsérv</strong>, amely irritálhatja az ideggyököt, a gerinc degeneratív elváltozása miatt kialakuló szűkület, vagy a farizmok területén (például a <strong>piriformis izom</strong> környékén) jelentkező idegirritáció.</p>
<p>A fájdalom helye nem feltétlenül mutatja meg azt, hogy pontosan hol van a probléma. Bár az irritáció gyakran a derék vagy a farpofa területén alakul ki, a fájdalom az ülőideg lefutása mentén egészen a lábszárig is sugározhat.</p>
<h2>Miért nem mindig jó ötlet nyújtani az ülőideg fájdalmat?</h2>
<p>Ha a comb hátsó részén vagy a farpofában feszülést érzünk, könnyű arra gondolni, hogy egyszerűen meg kell nyújtani az izmokat. Idegérintettség esetén azonban a hosszan tartó, intenzív nyújtás akár fokozhatja is a panaszokat.</p>
<p>Az idegrendszer egy összefüggő rendszert alkot, ezért az ideg egyik szakaszának mozgatása a tőle távolabb eső részekre is hatással lehet.</p>
<p>Ilyenkor bizonyos esetekben a nyújtás helyett az <strong>ideg mobilizálása</strong>, vagyis az ideg kíméletes mozgatása lehet megfelelőbb megközelítés.</p>
<h2>Mit lehet tenni ülőideg fájdalom esetén?</h2>
<p>A megfelelő kezelés mindig attól függ, mi okozza az idegirritációt. Ennek része lehet az <strong>idegmobilizáció</strong> is, amely bizonyos esetekben segíthet a tünetek enyhítésében.</p>
<p>A gyakorlatok végzése során fontos figyelni a tünetekre: ha egy mozdulat fokozza a fájdalmat vagy a zsibbadást, nem érdemes erőltetni.</p>
<p>Ha az ülőideg fájdalma nem javul, vagy a tünetek erősödnek, érdemes személyesen konzultálni gyógytornásszal vagy orvossal.</p>`,
  },
  {
    id: 'emesztest-segito-gyakorlatok',
    category: 'Emésztés',
    date: '2026. augusztus 25.',
    read: '4 perc',
    title: 'Emésztést segítő gyakorlatok – puffadás, hasfájás és székrekedés enyhítése',
    lead: 'A puffadás, hasfájás és székrekedés nemcsak étrendi kérdés: a törzs mozgása és a mély légzés is hatással van a hasi szervek működésére. Néhány egyszerű gyakorlattal ez otthon is támogatható.',
    videoId: 'sST1MrrEyw8',
    videoTitle: 'Emésztést segítő gyakorlatok – puffadás, hasfájás, székrekedés',
    body: `
<p>A puffadás, hasfájás és székrekedés gyakori emésztőrendszeri panaszok, amelyekre a mozgás is hatással lehet. A törzs mozgatása és a mély légzés ugyanis a hasi szervek mozgását is befolyásolhatja, és bizonyos gyakorlatok jótékonyan hathatnak az emésztésre.</p>
<h2>Hogyan segítheti a mozgás az emésztést?</h2>
<p>A hasüregben található szerveket kötőszövetes struktúrák veszik körül, és a test, különösen a törzs mozgása ezekre is hatással van.</p>
<p>A törzs mozgatása mellett a mély hasi légzés is segíthet a belső szervek mobilizálásában. Belégzéskor a <strong>rekeszizom</strong> lefelé mozdul, kilégzéskor pedig visszatér eredeti helyzetébe. Ez a mozgás a rekeszizom alatt elhelyezkedő hasi szervek helyzetére is hatással van.</p>
<h2>Milyen gyakorlatok segíthetnek puffadás és székrekedés esetén?</h2>
<p>Az emésztést segítő gyakorlatok között lehetnek olyanok, amelyek a has területének kíméletes önmasszázsával, mély légzéssel, törzsrotációval vagy a hasi terület enyhe kompressziójával támogathatják a beleket.</p>
<p>A has önmasszázsa például végezhető a vastagbél lefutását követve, míg bizonyos mozgásoknál a törzs helyzete és a mély légzés együttesen adhat ingert a hasi szerveknek.</p>
<h2>A stressz és az étkezés is szerepet játszhat</h2>
<p>A stressz is hatással lehet az emésztésre, ezért érdemes megfigyelni, hogy stresszes időszakokban rosszabbodnak-e az emésztési panaszaid. Ha azt tapasztalod, hogy a puffadás, hasfájás vagy egyéb emésztési panaszok ilyenkor erősebbek, érdemes a stressz kezelésével is foglalkozni.</p>
<p>Emellett az elfogyasztott ételek is okozhatnak panaszokat. Ha gyakran tapasztalsz puffadást, hasfájást vagy székrekedést, érdemes lehet megfigyelni, hogy milyen ételek után jelentkeznek a tünetek. Tartós vagy visszatérő panaszok esetén dietetikus segíthet a táplálkozás személyre szabásában.</p>
<p>Ha az emésztési panaszaid tartósan fennállnak, érdemes orvossal konzultálni, hogy kizárhatók legyenek az esetleges háttérben álló egészségügyi problémák.</p>`,
  },
];

// The patient-story archive — Réka's revised cases. The first two are the ones the landing page
// shows (ContentService.cases() returns BLOG_STORIES.slice(0, 2)); the rest extend the set.
// Non-identifying, no promised outcome. Block text carries <strong> emphasis and, where a case led
// to a program, an <a> link — both rendered via [innerHTML] on `.kp-rich`.
export const BLOG_STORIES: BlogStory[] = [
  {
    id: 'konyok-visceralis',
    label: 'Könyök',
    meta: 'Tinédzser zongorista · kétoldali könyökfájás · több hónapos panasz',
    title: 'Könyökfájás, ami nem a könyökből eredt',
    blocks: [
      {
        label: 'Panasz',
        text: 'Egy fiatal zongorista fiú körülbelül fél éve küzdött kétoldali könyök/alkar fájdalommal és görcsökkel, amikor hozzám került állapotfelmérésre.',
      },
      {
        label: 'Mit találtam',
        text: 'A panaszai közvetlenül egy betegség után kezdődtek, amikor sok gyógyszert szedett. Se a pihentetés, se a hagyományos fizioterápiás kezelések (kitartó nyújtás, erősítés, masszázs, kinezio tape) nem segítettek. A kórtörténet és a viscerális terápián tanultak alapján a kétoldali, terápiarezisztens könyökfájás hátterében a <strong>máj körüli kötőszövetek "diszfunkciójára"</strong> kezdtem gyanakodni.',
      },
      {
        label: 'Mit tettünk',
        text: 'A májra fókuszált <strong>viscerális terápiával</strong> hétről hétre fokozatosan oldódott az alkar táji fájdalom és a görcs.',
      },
    ],
    outcome:
      'Az 5. kezelés végére teljesen elmúltak a panaszok, és a fiú végre újra tudott zongorázni.',
    therapies: ['Viscerális terápia'],
  },
  {
    id: 'fejfajas-stressz',
    label: 'Fejfájás',
    meta: '30 év körüli vállalkozó nő · rendszeres fejfájás · stresszes mindennapok',
    title: 'Fejfájás a folyamatos stressz mögött',
    blocks: [
      {
        label: 'Panasz',
        text: 'Rendszeres fejfájás miatt jelentkezett hozzám egy hölgy, akiről az állapotfelmérés során kiderült, hogy rendkívül stresszesek a mindennapjai.',
      },
      {
        label: 'Mit találtam',
        text: 'A nyak, állkapocs és halánték környékén kifejezetten feszesek, tónusosak voltak az izmai.',
      },
      {
        label: 'Mit tettünk',
        text: '<strong>Manuális technikákkal</strong> kezdtem lazítani a feszes izmokat. A stressz okozta szimpatikus tónus oldására <strong>vagus (bolygóideg) technikákkal</strong> egészítettem ki a kezelést. Heti 1 kezeléssel folytattuk 5 héten keresztül, mellette kapott pár perces, naponta végzendő házi feladatokat.',
      },
    ],
    outcome:
      'A fejfájások ritkultak, enyhültek, majd teljesen megszűntek — a mindennapokba beépített házi gyakorlatokkal hosszú távon is fenntartható lett ez az állapot.',
    therapies: ['Cranio FDM', 'Vagus terápia'],
  },
  {
    id: 'derekfajas-stabilizacio',
    label: 'Derékfájás',
    meta: 'Évek óta tartó derékfájás · a korábbi kezelések nem segítettek',
    title: 'Derékfájás, amin a nyújtás nem segített',
    blocks: [
      {
        label: 'Panasz',
        text: 'Évek óta tartó derékfájás miatt fordult hozzám egy páciensem, akinek a masszázs és a nyújtó gyakorlatok nem oldották meg a panaszait.',
      },
      {
        label: 'Mit találtam',
        text: 'A tesztek alapján a mozgástartományával nem volt probléma, a <strong>gerincstabilizáló izmai</strong> viszont gyengébbek voltak, ami miatt instabilabb lehetett az ágyéki gerince.',
      },
      {
        label: 'Mit tettünk',
        text: 'Az állapotának megfelelő, könnyebb <strong>gerincstabilizáló gyakorlatokkal</strong> kezdtünk, majd hétről hétre egyre nehezebb gyakorlatokat kapott. Az izomereje szépen fejlődött, és ezzel együtt a derékfájása is végre elmúlt.',
      },
    ],
    outcome: 'A derékfájás elmúlt, ahogy a gerincstabilizáló izmok fokozatosan megerősödtek.',
    course: {
      text: 'A pácienseimnél legjobban bevált gerincstabilizáló gyakorlatokat összegyűjtöttem, és rendszerbe szedve, fokozatosan felépítve egy videós online tananyagba csomagoltam. Így már azok is tornázhatnak velem, akik személyesen nem tudnak eljönni hozzám:',
      name: 'Stabil Gerinc Program',
      href: 'https://oktatas.kirillareka.hu/products/course/stabil-gerinc-program-12-het',
    },
    therapies: ['Gyógytorna', 'Gerincstabilizáció'],
  },
  {
    id: 'terdfajas-fascia',
    label: 'Térd',
    meta: 'Futó páciens · térdfájás · igazolt porckopás',
    title: 'Térdfájás porckopással, mégis fájdalommentes futás',
    blocks: [
      {
        label: 'Panasz',
        text: 'Egy futó páciensem térdfájás miatt keresett fel. Képalkotó vizsgálaton is volt, porckopást találtak a térdében.',
      },
      {
        label: 'Mit tettünk',
        text: 'A térde körül (vádli-, comb- és farizomnál) <strong>manuális fascia technikákat</strong> alkalmaztam. A fascia kezelés magát a porckopást nem fordítja vissza, a fájdalomérzetre és a funkcióra viszont hatással lehet. A hosszú távú siker érdekében megtanítottam neki az <strong>SMR henger</strong> és a <strong>trigger labda</strong> használatát is, így otthon is tud karbantartó fascia technikákat végezni a térd körüli izmain.',
      },
    ],
    outcome: 'Újra fájdalom nélkül tudott futni.',
    course: {
      text: 'Az SMR henger és trigger labda használatáról egy online videós kurzust is készítettem, amiben elsajátíthatod az otthoni eszközös fascia technikákat a teljes testen:',
      name: 'Hengerezz Okosan',
      href: 'https://oktatas.kirillareka.hu/products/course/hengerezz-okosan',
    },
    therapies: ['FDM', 'Fascia terápia', 'SMR henger'],
  },
];

// The real YouTube playlists on the channel. `art` names the brand poster (see PlaylistArt);
// order is editorial — body regions from the spine down, then stress, then the personal vlogs.
export const BLOG_PLAYLISTS: BlogPlaylist[] = [
  {
    list: 'PL88GCL4sFg6WSPVyvKiTFOjDdPxn_Hb3U',
    art: 'spine',
    image: 'assets/images/gerinc.JPG',
    title: 'Gerinc/derékfájás',
    description: 'Napi rutin gyakorlatok és magyarázatok a gerincről és a derékfájásról.',
  },
  {
    list: 'PL88GCL4sFg6VyDscEDRWCPRwJEV29IJP2',
    art: 'neck',
    image: 'assets/images/nyak-vall-lapocka.JPG',
    title: 'Nyak-váll-lapocka',
  },
  {
    list: 'PL88GCL4sFg6XJnw_L2ztNxWoJQ2-e-Mnj',
    art: 'hip',
    image: 'assets/images/csipo.JPG',
    title: 'Csípő',
  },
  {
    list: 'PL88GCL4sFg6XAyx9mSnMizhIJ5fAS0wKK',
    art: 'knee',
    image: 'assets/images/terd.JPG',
    title: 'Térd',
  },
  {
    list: 'PL88GCL4sFg6WULa6tOq5DBH5GA56RvxwV',
    art: 'foot',
    image: 'assets/images/labfej-sarok-talp.JPG',
    title: 'Lábfej-sarok-talp',
  },
  {
    list: 'PL88GCL4sFg6U-OPty2kAnHOptNyXGDryz',
    art: 'hand',
    image: 'assets/images/konyok-csuklo-kez.JPG',
    title: 'Könyök-csukló-kéz',
  },
  {
    list: 'PLKr-ARwW4tO0',
    art: 'stress',
    image: 'assets/images/stressz.JPG',
    title: 'Stressz',
    description:
      'Feszültségoldás, légzés és paraszimpatikus hangolás — otthon is elvégezhető gyakorlatokkal.',
  },
  {
    list: 'PL88GCL4sFg6XKFGftYYODQBdMqTiq_ZXQ',
    art: 'vlog',
    image: 'assets/images/vlog.JPG',
    title: 'Vlog/sztori',
  },
];

/** Lookup one post by id (used by /blog/:id and its prerender params). */
export function blogPostById(id: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.id === id);
}
