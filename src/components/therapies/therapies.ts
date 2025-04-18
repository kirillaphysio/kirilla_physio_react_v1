export type Therapy = {
  id: string;
  title: string;
  imageId: string;
  short: string
  long: string;
}

export const therapies: Therapy[] = [
  {
    id: "gyogytorna",
    title: "Gyógytorna",
    imageId: "Gyógytorna__zxtbrv",
    short: "Egyénre szabott, a fokozatosság elvére épülő mozgásprogram",
    long: "A mozgásszervi panaszoknál a terápiának nagyon fontos eleme a mozgás (gyógytorna), legyen szó mobilizáló, nyújtó, vagy erősítő gyakorlatokról. A gyakorlatokat mindig a jelenlegi állapotodra szabom, és progresszíven építjük fel - tehát ahogy gyógyulsz, a gyakorlatok intenzitása fokozódik, hogy a tested fokozatosan adaptálódjón. Ha helyes kivitelezéssel mennek a gyakorlatok, akkor otthonra, \"házi feladatként\" kapod meg őket (szükség esetén írásos/videós formában rögzítve). \n" +
      "A gyógytorna gyakorlatok összeállításához (az egyetemi képzésen tanultakon túl) alkalmazom a McKenzie módszert, mely a porckorongsérves panaszoknál kifejezetten hatékony. Továbbá a neurodinamikát, melynek segítségével az idegeket tudjuk mobilizálni. A szegmentális stabilizációs tréninggel pedig a gerincet stabilizáló izmokat tudjuk megerősíteni. ",
  },
  {
    id: "fdm",
    title: "FDM (Fascia Disztorziós Modell)",
    imageId: "FDM_yoyqch",
    short: "Fascia kezelés a gyors fájdalomcsillapításra",
    long: "Az FDM egy manuális (kézzel végzett) terápia, amely a fascia, azaz a kötőszöveti struktúrák problémáira összpontosít. A kezelést a páciens fájdalomképe, testbeszéde alapján végzem, és a célja a gyors és hatékony fájdalomcsillapítás.\n" +
      "Milyen panaszoknál használható?\n" +
      "- egy pontban szúró fájdalom (pl. könyök, térd, sarok)\n" +
      "- éles, vonal mentén húzó / égő fájdalom (pl. nyak, comb)\n" +
      "- mély, tompa fájdalom (pl. derék, csípő)\n" +
      "- nagyobb bőrfelületen jelentkező fájdalom / zsibbadás / érzéskiesés (pl. comb, kar)\n" +
      "- mélyen az izűletben mozgás közbe elakadás / fájdalom (pl. váll, csípő)\n" +
      "- beszűkült, kötött ízület (pl. váll, csípő)",
  },
  {
    id: "visceralis_terapia",
    title: "Visceralis terápia",
    imageId: "Visceral_key38l",
    short: "Belsőszervi eredetű panaszok manuális kezelése",
    long: "A viscerális (magyarul belsőszervi) manuálterápia lényege, hogy a nyirokkeringés serkentése, és a belső szervek körüli kötőszövetes összetapadások oldása által javítsam a szervek funkcióját. A hasat, és a talpi akupresszúrás pontokat is kezelem (csak manuálisan, tűt nem használok).\n" +
      "Ez a kezelés számos esetben segíthet:\n" +
      "– belgyógyászati kórképeknél (pl. reflux, IBS, folyadékkal telt ciszták, Crohn-betegség, endometriózis, hasi görcsök/puffadás, székrekedés)\n" +
      "– hasi műtétek és szülés után (ekkor mindig hegszövet és letapadások keletkeznek, amiket oldani lehet a kezeléssel)\n" +
      "– nagy betegségek után (ha sok gyógyszert fogyasztottunk ami terheli a májat és a vesét; vagy ha sokáig ágyban feküdtünk)\n" +
      "– mozgásszervi panaszoknál (gyakran belsőszervi probléma áll a háttérben, ezt egy állapotfelmérés alapján meg tudom állapítani)\n" +
      "– baba projekt előtt (a női szervek funkciójának a javításával növelni lehet a termékenységet)",
  },
  {
    id: "vagus_terapia",
    title: "Vagus terápia",
    imageId: "Vagus_dvqu1y",
    short: "Bolygóideg kezelés az idegrendszer harmonizálására",
    long: "A nervus vagus (magyarul a bolygóideg) a 10. agyidegünk, ami kilép a koponyánkból, és beidegzi a belső szerveink nagy részét.\n" +
      "A nervus vagus terápiával ennek az idegnek a kötőszövetes környezetét ingerlem kellemes manuális fogásokkal, ezáltal javítható az agy és a belső szervek közti „kommunikáció”, és aktiválódik a paraszimpatikus (nyugodt) idegrendszer.\n" +
      "Az alábbi esetekben sokat segíthet ez a kezelés: hosszabb ideig fennálló fokozott stressz, szorongás, alvászavarok, emésztési problémák, puffadás, régóta fennálló mozgásszervi fájdalmak, autoimmun betegségek, hormonális problémák.",
  },
  {
    id: "mulligan_terapia",
    title: "Mulligan manuálterápia",
    imageId: "Mulligan_o8mzoi",
    short: "A mozgás közben jelentkező fájdalmak manuálterápiás kezelése",
    long: "A Mulligan manuálterápia az ízületek mobilizálására fókuszáló kezelés, mely során hatást gyakorlok az érintett ízületre, miközben a páciens aktív mozgást végez. Célja, hogy a korábban fájdalmas ízületi mozgás a külső hatás következtében fájdalommentessé váljon már az első ismétlés alatt.\n" +
      "A kezelés a mozgásra fájó végtag ízületi (boka, térd, csípő, ujjak, csukló, könyök, váll), gerinc kisízületi (derék, hát, nyak), és állkapocs ízületi problémáknál is alkalmazható.",
  },
  {
    id: "dorn_terapia",
    title: "Dorn terápia",
    imageId: "Dorn_terápia__cekv1u",
    short: "Holisztikus szemléletű ízületi korrekciós technika",
    long: "A Dorn terápia egy manuálisan végzett ízületi korrekciós technika, melynek célja a fiziológiás helyzetek visszaállítása a végtag-, és gerincízületekben.\n" +
      "A Dorn módszer segíthet a statikailag nem kiegyensúlyozott mozgató szervrendszer és a vele szoros kapcsolatban álló idegrendszer működésének javítására. Ennek hatására javulnak a fizikai panaszok és a gerinc csigolyáival szoros kapcsolatban álló szervek működése is.\n" +
      "Az alábbi esetekben segíthet:\n" +
      "- hátfájás\n" +
      "- gerincferdülés (scoliosis)\n" +
      "- ízületi problémák\n" +
      "- egyéb, csontokkal kapcsolatos elváltozások vagy betegségek\n" +
      "- gerinchez közeli, izom eredetű fájdalmak\n" +
      "- fülcsengés (Tinnitus)\n" +
      "- szervi problémák (Diabetes, májproblémák, veseproblémák)",
  },
  {
    id: "nyirok_kezeles",
    title: "Nyirok kezelés",
    imageId: "Nyirok_kezelés__eogcem",
    short: "A nyirokkeringés támogatása komplex megközelítéssel",
    long: "A nyirokrendszer meghatározó szerepet tölt be az immunrendszer működésében. A nyirokfolyadék tápanyagokkal és oxigénnel látja el a sejteket és ha a keringésben zavar keletkezik, akkor a szervezetben felhalmozódnak a toxinok és más káros anyagok.\n" +
      "A nyirok kezelés során a teljes testet kezelem: a \"diaphragmák\" (= vízszintes kötőszöveti struktúrák) oldásával szabad utat biztosítok a nyirok áramlásának, majd megadott sorrendben a nyirokcsomókat stimulálom, ezzel aktiválva a nyirokrendszert. A hasi (viscerális) terápia elemeit is alkalmazom, hiszen akkor lesz rendbe a rendszer, ha a belső szervek körül is szabad az áramlás.\n" +
      "Milyen panaszoknál javasolt ez a kezelés?\n" +
      "- ödéma/vizesedés\n" +
      "- kézfejek, lábfejek duzzanata\n" +
      "- nyirokpangás a hason\n" +
      "- narancsbőr",
  },
  {
    id: "hegkezeles",
    title: "Hegkezelés",
    imageId: "Hegkezelés__wbj806",
    short: "A hegek mobilizálása/oldása manuális technikákkal és eszközökkel",
    long: "Sérülések és műtétek után létrejött hegek nem csak a bőrfelszínen húzódnak, hanem mélyen a szövetek közé is lenyúlhatnak. Műtéti metszés során több réteg kötőszövet és izomszövet kerülhet átvágásra, ami hegesedéssel gyógyul.\n" +
      "A heggyógyulás során termelődő kollagén olyan, mint a ragasztó, mindent „összetapaszt”.  Amennyiben nem mozgunk, nem mobilizáljuk minden irányba az adott területet, a hegszövet a körülötte lévő kötőszövettel összenövéseket hoz létre. Így megszűnik a különböző fascia/kötőszöveti rétegek közötti elcsúszás, ami mozgásszervi és belszervi problémákhoz - fájdalomhoz, mozgásbeszűküléshez, ödémához - vezethet.\n" +
      "A hegkezelést érdemes minél hamarabb elkezdeni, de soha nem késő, a régi hegek is képesek oldódni.\n" +
      "A hegkezelést manuális terápiával végzem, szükség esetén köpölyt és kinezio tapaszt is használok.\n" +
      "Mikor javasolt?\n" +
      "- sérülések, balesetek\n" +
      "- műtétek (belsőszervi, mozgásszervi)\n" +
      "- szülés, császármetszés",
  },
  {
    id: "kopoly",
    title: "Köpöly",
    imageId: "Köpöly_tnfza9",
    short: "Szövetlazítás és fájdalomcsillapítás vákuumos szívóhatás segítségével",
    long: "A köpöly terápia során vákuumot hozok létre a bőrön egy üveg- vagy szilikon köpöly segítségével, melynek vérkeringés fokozó és szövetlazító hatása van.\n" +
      "Végezhető olajjal, a köpölyt csúsztatgatva a bőrön - így nem hagy sötét foltokat, csak ha percekig egy ponton hagyjuk. Egy ponton hagyva a környező ízületek mozgatásával is fokozható a terápia hatékonysága.\n" +
      "Mikor ajánlott?\n" +
      "- mozgásszervi fájdalmak\n" +
      "- feszes, görcsös izomzat\n" +
      "- beszűkült ízület",
  },
  {
    id: "kinezio_tape",
    title: "Kinezio tape",
    imageId: "Kinezio_Tape_azwszz",
    short: "Színes tapaszok izomlazításra, ízület stabilizálásra, keringés serkentésére, és fájdalomcsillapításra",
    long: "A kineziológiai tapasz egy rugalmas pamutanyagból készült, gyógyszermentes, bőrre ragasztható szalag, amely segítségével a fájdalom és a mozgáskorlátozottság rövid időn belül csökkenthető.\n" +
      "A felhelyezett tapasz hatására a nyirokfolyadék áramlása intenzívebbé válik, javul a vérkeringés, és a fájdalom receptorokra nehezedő nyomás is csökken. Megfelelő felhelyezéssel az ízületek stabilizálásában is segít.\n" +
      "Használható ficamok, húzódások, sportsérülések, gerinc és végtagfájdalmak kezelésekor, valamint mozgásszervi műtétek utáni rehabilitációban is.",
  },
  {
    id: "alkapocs_izuleti",
    title: "Állkapocs-ízületi terápia",
    imageId: "Állkapocs-ízületi_terápia__qcwsbl",
    short: "A rágóízület és a környező izmok manuális kezelése",
    long: "Az állkapocs-ízületi terápia során az ízület körüli izmokat (pl. rágóizmot) lazító, és az ízületet mobilizáló manuális fogásokat alkalmazok. Bizonyos izmokat csak a szájnyíláson keresztül lehet elérni, így szükség esetén steril gumikesztyűt használva a szájon belüli izmokat is kezelem.\n" +
      "Mikor segíthet ez a kezelés?\n" +
      "-Fájdalom, kattogás, gyulladás, mozgástartomány beszűkülés az állkapocsízületben\n" +
      "-Fájdalom, blokk a felső nyaki szakaszban\n" +
      "-Fejfájás\n" +
      "-Fogcsikorgatás\n" +
      "-Fülzúgás\n" +
      "-Gerinc görbületeinek változásai (gerincferdülésnél is kiegészítő terápiás lehetőség)\n" +
      "-Szájzár, Száj nyitási zavarok\n" +
      "-Látászavarok\n" +
      "-Nyelési zavarok\n" +
      "-Arcfájdalmak\n" +
      "-Nem specifikus fogfájdalmak\n" +
      "-Hosszú ideig tartó fogászati, szájsebészeti beavatkozások\n" +
      "-Stressz",
  },
  {
    id: "cranio_terapia",
    title: "Cranio FDM (Fejfájás terápia)",
    imageId: "CranioFDM_v2d9nz",
    short: "Az izom/kötőszövet eredetű fejfájások terápiája",
    long: "Az FDM (Fascia Disztorziós Modell) elmélete azzal az alapfeltevéssel dolgozik, hogy a test különböző fájdalmait és funkcionális zavarait a fascia rendszeren belüli torzulások okozzák. A fascia a testünkben elhelyezkedő kötőszövetek hálózata, amely körülveszi az izmokat, ízületeket, idegeket és egyéb szöveteket, és részt vesz azok mozgásában és stabilizálásában.\n" +
      "A cranio FDM kezelés a Fascia Disztorziós Modell alkalmazásával a fej, a nyak és a koponya körüli fájdalom és funkcionális zavarok kezelésére irányul. A terápia célja, hogy speciális manuális technikákkal a fascia rendszeren belüli torzulásokat, disztoriókat oldja, és ezáltal csökkentse a fájdalmakat. \n" +
      "Ez a módszer különösen hasznos lehet ha:\n" +
      "- rendszeresen fáj a fejed\n" +
      "- szédüléssel, egyensúlyzavarral küzdesz\n" +
      "- állkapocs-ízületi és nyak környéki panaszaid vannak (feszesség, fájdalom)\n" +
      "- ütés érte a fejed, az arcod akár küzdősportban, akár egyéb balesetben",
  },
  {
    id: "neuro_mozgaskorrekcio",
    title: "Neuro-mozgáskorrekció",
    imageId: "Neuro-mozgáskorrekció__s2qhdv",
    short: "Az izomtónus tesztelése és helyreállítása az idegrendszeren keresztül",
    long: "A Neuro-mozgáskorrekció egy neurológiai alapú technika, amely segíti az emberi test működését, felismerve és korrigálva a receptor diszfunkciókat, amelyek fájdalmat vagy mozgáskorlátozást okozhatnak. A receptorok érzékelik a környezeti változásokat és információkat küldenek az agyba, amely döntéseket hoz az izmok mozgásának irányítására. Sérülések, műtétek vagy környezeti stressz hatására a receptorok működése megváltozhat, és kóros jelátvitelt okozhatnak, ami az izmok működésképtelenségét és fájdalmat eredményezhet. \n" +
      "A kezelés során különböző vizuális és manuális hatások (például simítás, fény, nyomás) segítségével tesztelem és kezelem azokat a receptor diszfunkciókat, amelyek fájdalmat vagy mozgáskorlátozást okozhatnak. A célom, hogy helyreállítsam az izmok optimális működését, mivel a mozgásszervi problémák sokszor az izomtónus-szabályozási problémákból erednek. Ezenkívül, ha szükséges, életmódbeli tanácsokkal segítek az izomfunkciók további javításában. \n" +
      "Mikor segíthet ez a technika?\n" +
      "-Hegek, tetoválások, piercingek után\n" +
      "-Olyan panaszoknál (krónikus fájdalom, mozgáskorlátozottság, izomfeszültség), amik nem strukturális/szöveti elváltozásból erednek",
  },
]