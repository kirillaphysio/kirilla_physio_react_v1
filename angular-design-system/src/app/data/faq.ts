// FAQ, ported verbatim from the React app's data.js. Answers use \n paragraph breaks.

export interface Faq {
  question: string;
  answer: string;
}

export const FAQS: Faq[] = [
  {
    question: 'Hol dolgozol helyileg?',
    answer: 'Budapest, XII. kerület, Nagyenyed utca 15/A',
  },
  {
    question: 'Visceralis / vagus / köpöly / bármelyik másik terápia előtt is kell állapotfelmérés?',
    answer: 'Igen, muszáj felmérnem az egészségi állapotodat mielőtt bármilyen kezelésbe belekezdünk, hogy rád adaptálva, a lehető leghatékonyabban tudjak segíteni a problémádon, és ne alkalmazzak olyan technikákat amikkel árthatnék neked. ',
  },
  {
    question: 'Honnan tudjam hogy nekem melyik kezelésre van szükségem?',
    answer: 'Nem kell előre tudnod, az állapotfelmérés során - miután beszámoltál a panaszaidról és megvizsgáltalak - megbeszéljük, hogy a te eseteben mit javaslok, mi a leghatékonyabb számodra. ',
  },
  {
    question: 'Hány alkalomra van szükség?/Milyen gyakran kell járni?',
    answer:
      'Nagyon változó, az első alkalomkor az állapotfelmérés után már fogok tudni mondani egy becslést. \n' +
      'Általánosságban a régóta fennálló panaszok gyógyításához több idő kell, míg egy frissen kialakultnál nagyobb eséllyel lesz elég egy pár kezelés.\n' +
      'A kezelések gyakoriságát is egyénileg alakítjuk ki, a gyógyulás előrehaladtával változhat (pl. kezdetben heti 1 alkalom, majd 2-3 hetente).\n',
  },
  {
    question: 'Muszáj előtte MR vizsgálatra mennem?',
    answer:
      'Nem muszáj, mivel egy alapos vizsgálat és speciális tesztek alapján építem fel a kezelésedet, és nem az MR képedet kezelem (sokszor nincs összefüggés a panasz és az MR által kimutatott eredmények között).\n' +
      'Ha már készült, akkor hozd magaddal, ha pedig úgy látom, hogy muszáj készíteni, akkor jelzem az állapotfelmérésen. \n' +
      'Friss hasi ultrahang vizsgálatot viszont szükséges lehet készíteni bizonyos esetekben viscerális terápia előtt (pl. ciszták, vesekő) - keress fel üzenetben az állaptfelmérés előtt, ha ebben nem vagy biztos.',
  },
  {
    question: 'Fájni fog a kezelés?',
    answer: 'Nem minden esetben fáj, sőt, sokan kellemesnek élik meg a kezeléseket. Vannak terápiás irányzatok (pl. az FDM), amiknél várható fájdalom, de mindig az a célom, hogy ez egy elviselhető fájdalom legyen számodra, és ne egy szenvedés. A kezelés közbe végig kommunikálunk, és nyugodtan jelezheted, ha már túl sok.',
  },
  {
    question: 'Mit hozzak magammal az állapotfelmérésre?',
    answer:
      'Olyan öltözetet, amiben kényelmesen tudsz mozogni, és meg tudom vizsgálni a panaszos testrészed (átöltözésre van lehetőség).\n' +
      'Ha vannak korábbi leleteid, vizsgálati eredményeid, akkor azok is legyenek nálad (az is jó, ha telefonról mutatod meg).',
  },
  {
    question: 'Van valami otthon végezhető gyakorlat, amit csinálhatok?',
    answer: 'Az esetek nagy részében már az első alkalom végén, az állapotfelmérés után javasolni fogok otthon végezhető gyakorlatokat, amiket szükség esetén írásban vagy videóban rögzítünk.',
  },
];

// FAQ for the online programs / courses page (/online-programok).
export const COURSE_FAQS: Faq[] = [
  {
    question: 'Hol fogom megkapni a megvásárolt programot/kurzust?',
    answer:
      'Vásárláskor az általad megadott email cím és jelszó alapján a rendszer automatikusan létrehoz neked egy hallgatói fiókot.\n' +
      'Ezekkel az adatokkal a weboldalamon (kirillareka.hu → Online programok / vagy: oktatas.kirillareka.hu) bármikor be tudsz jelentkezni, és bejelentkezés után meg fog jelenni a megvásárolt kurzus.\n' +
      '(A jelszavad érdemes valahova felírnod magadnak, de ha elfelejtenéd, be tudsz állítani újat.)',
  },
  {
    question: 'Meddig férhetek hozzá a megvásárolt tartalmakhoz?',
    answer:
      'Örökre. Egyszeri hozzáférést kapsz, így saját tempódban haladhatsz, és később is bármikor újrakezdheted.',
  },
  {
    question: 'Teljesen kezdőként is nekiállhatok?',
    answer:
      'Igen. A programok nem igényelnek semmilyen előképzettséget vagy tapasztalatot. A gyakorlatokat az alapoktól kezdjük, mindig megtanítom a helyes kivitelezést, és fokozatosan építjük fel a terhelést.',
  },
  {
    question: 'Mikor lehet csatlakozni?',
    answer:
      'Az online programok nagy előnye, hogy nem kell semennyit várnod, bármikor belekezdhetsz. A vásárlás után azonnal hozzáférhetsz a teljes oktatási anyaghoz.',
  },
  {
    question: 'Tudok segítséget kérni, ha valami nem világos a program elvégzése során?',
    answer:
      'Igen. Az oktatási felületre bejelentkezve van lehetőség kérdést feltenni (a szövegbuborék fülnél).',
  },
];
