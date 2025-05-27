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
    long: "A mozgásszervi panaszoknál a terápiának nagyon fontos eleme a <strong>mozgás (gyógytorna)</strong>, legyen szó <strong>mobilizáló, nyújtó</strong>, vagy <strong>erősítő</strong> gyakorlatokról. A gyakorlatokat mindig a jelenlegi állapotodra szabom, és <strong>progresszíven</strong> építjük fel - tehát ahogy gyógyulsz, a gyakorlatok intenzitása fokozódik, hogy a tested fokozatosan adaptálódjón. Ha <strong>helyes kivitelezéssel</strong> mennek a gyakorlatok, akkor otthonra, \"házi feladatként\" kapod meg őket (szükség esetén írásos/videós formában rögzítve). \n" +
      "A gyógytorna gyakorlatok összeállításához (az egyetemi képzésen tanultakon túl) alkalmazom a <strong>McKenzie módszert</strong>, mely a porckorongsérves panaszoknál kifejezetten hatékony. Továbbá a <strong>neurodinamikát</strong>, melynek segítségével az idegeket tudjuk mobilizálni. A <strong>szegmentális stabilizációs tréninggel</strong> pedig a gerincet stabilizáló izmokat tudjuk megerősíteni. ",
  },
  {
    id: "fdm",
    title: "FDM (Fascia Disztorziós Modell)",
    imageId: "FDM_yoyqch",
    short: "Fascia kezelés a gyors fájdalomcsillapításra",
    long: "Az <strong>FDM</strong> egy <strong>manuális</strong> (kézzel végzett) terápia, amely a <strong>fascia</strong>, azaz a kötőszöveti struktúrák problémáira összpontosít. A kezelést a páciens fájdalomképe, testbeszéde alapján végzem, és a célja a <strong>gyors és hatékony fájdalomcsillapítás.</strong>\n" +
      "Milyen panaszoknál használható?\n" +
      "- egy pontban <strong>szúró</strong> fájdalom (pl. könyök, térd, sarok)\n" +
      "- éles, vonal mentén <strong>húzó</strong> / égő fájdalom (pl. nyak, comb)\n" +
      "- <strong>mély, tompa</strong> fájdalom (pl. derék, csípő)\n" +
      "- nagyobb bőrfelületen jelentkező fájdalom / <strong>zsibbadás</strong> / érzéskiesés (pl. comb, kar)\n" +
      "- mélyen az izűletben mozgás közbe <strong>elakadás</strong> / fájdalom (pl. váll, csípő)\n" +
      "- <strong>beszűkült, kötött</strong> ízület (pl. váll, csípő)",
  },
  {
    id: "visceralis_terapia",
    title: "Visceralis terápia",
    imageId: "Visceral_key38l",
    short: "Belsőszervi eredetű panaszok manuális kezelése",
    long: "A <strong>viscerális</strong> (magyarul <strong>belsőszervi</strong>) manuálterápia lényege, hogy a <strong>nyirokkeringés</strong> serkentése, és a belső szervek körüli <strong>kötőszövetes összetapadások oldása</strong> által javítsam a szervek funkcióját. A hasat, és a talpi akupresszúrás pontokat is kezelem (csak manuálisan, tűt nem használok).\n" +
      "Ez a kezelés számos esetben segíthet:\n" +
      "– <strong>belgyógyászati kórképeknél</strong> (pl. reflux, IBS, folyadékkal telt ciszták, Crohn-betegség, endometriózis, hasi görcsök/puffadás, székrekedés)\n" +
      "– <strong>hasi műtétek</strong> és <strong>szülés</strong> után (ekkor mindig hegszövet és letapadások keletkeznek, amiket oldani lehet a kezeléssel)\n" +
      "– nagy <strong>betegségek után</strong> (ha sok gyógyszert fogyasztottunk ami terheli a májat és a vesét; vagy ha sokáig ágyban feküdtünk)\n" +
      "– <strong>mozgásszervi panaszoknál</strong> (gyakran belsőszervi probléma áll a háttérben, ezt egy állapotfelmérés alapján meg tudom állapítani)\n" +
      "– <strong>baba projekt</strong> előtt (a női szervek funkciójának a javításával növelni lehet a termékenységet)",
  },
  {
    id: "vagus_terapia",
    title: "Vagus terápia",
    imageId: "Vagus_dvqu1y",
    short: "Bolygóideg kezelés az idegrendszer harmonizálására",
    long: "A <strong>nervus vagus</strong> (magyarul a <strong>bolygóideg</strong>) a 10. agyidegünk, ami kilép a koponyánkból, és beidegzi a belső szerveink nagy részét.\n" +
      "A nervus vagus terápiával ennek az idegnek a <strong>kötőszövetes</strong> környezetét ingerlem kellemes manuális fogásokkal, ezáltal javítható az <strong>agy és a belső szervek közti „kommunikáció”</strong>, és aktiválódik a paraszimpatikus (<strong>nyugodt</strong>) idegrendszer.\n" +
      "Az alábbi esetekben sokat segíthet ez a kezelés: hosszabb ideig fennálló fokozott <strong>stressz, szorongás, alvászavarok, emésztési</strong> problémák, <strong>puffadás</strong>, régóta fennálló <strong>mozgásszervi fájdalmak, autoimmun</strong> betegségek, <strong>hormonális</strong> problémák.",
  },
  {
    id: "mulligan_terapia",
    title: "Mulligan manuálterápia",
    imageId: "Mulligan_o8mzoi",
    short: "A mozgás közben jelentkező fájdalmak manuálterápiás kezelése",
    long: "A <strong>Mulligan manuálterápia</strong> az ízületek mobilizálására fókuszáló kezelés, mely során hatást gyakorlok az érintett ízületre, miközben a páciens aktív mozgást végez. Célja, hogy a korábban <strong>fájdalmas ízületi mozgás</strong> a külső hatás következtében <strong>fájdalommentessé váljon</strong> már az <strong>első ismétlés alatt</strong>.\n" +
      "A kezelés a mozgásra fájó <strong>végtag ízületi</strong> (boka, térd, csípő, ujjak, csukló, könyök, váll), <strong>gerinc kisízületi</strong> (derék, hát, nyak), és <strong>állkapocs</strong> ízületi problémáknál is alkalmazható.",
  },
  {
    id: "dorn_terapia",
    title: "Dorn terápia",
    imageId: "Dorn_terápia__cekv1u",
    short: "Holisztikus szemléletű ízületi korrekciós technika",
    long: "A <strong>Dorn terápia</strong> egy manuálisan végzett <strong>ízületi korrekciós</strong> technika, melynek célja a fiziológiás helyzetek visszaállítása a <strong>végtag-</strong>, és <strong>gerincízületekben</strong>.\n" +
      "A Dorn módszer segíthet a statikailag nem kiegyensúlyozott <strong>mozgató szervrendszer</strong> és a vele szoros kapcsolatban álló <strong>idegrendszer</strong> működésének javítására. Ennek hatására javulnak a fizikai panaszok és a gerinc csigolyáival szoros kapcsolatban álló <strong>szervek</strong> működése is.\n" +
      "Az alábbi esetekben segíthet:\n" +
      "- <strong>hátfájás</strong>\n" +
      "- <strong>gerincferdülés</strong> (scoliosis)\n" +
      "- <strong>ízületi</strong> problémák\n" +
      "- egyéb, <strong>csontokkal</strong> kapcsolatos elváltozások vagy betegségek\n" +
      "- gerinchez közeli, <strong>izom</strong> eredetű fájdalmak\n" +
      "- <strong>fülcsengés</strong> (Tinnitus)\n" +
      "- <strong>szervi</strong> problémák (Diabetes, májproblémák, veseproblémák)",
  },
  {
    id: "nyirok_kezeles",
    title: "Nyirok kezelés",
    imageId: "Nyirok_kezelés__eogcem",
    short: "A nyirokkeringés támogatása komplex megközelítéssel",
    long: "A <strong>nyirokrendszer</strong> meghatározó szerepet tölt be az <strong>immunrendszer</strong> működésében. A nyirokfolyadék tápanyagokkal és oxigénnel látja el a sejteket és ha a keringésben zavar keletkezik, akkor a szervezetben felhalmozódnak a toxinok és más káros anyagok.\n" +
      "A nyirok kezelés során a teljes testet kezelem: a <strong>\"diaphragmák\"</strong> (= vízszintes kötőszöveti struktúrák) oldásával szabad utat biztosítok a nyirok áramlásának, majd megadott sorrendben a <strong>nyirokcsomókat</strong> stimulálom, ezzel aktiválva a nyirokrendszert. A hasi (<strong>viscerális</strong>) terápia elemeit is alkalmazom, hiszen akkor lesz rendbe a rendszer, ha a belső szervek körül is szabad az áramlás.\n" +
      "Milyen panaszoknál javasolt ez a kezelés?\n" +
      "- <strong>ödéma</strong>/vizesedés\n" +
      "- kézfejek, lábfejek <strong>duzzanata</strong>\n" +
      "- <strong>nyirokpangás</strong> a hason\n" +
      "- <strong>narancsbőr</strong>",
  },
  {
    id: "hegkezeles",
    title: "Hegkezelés",
    imageId: "Hegkezelés__wbj806",
    short: "A hegek mobilizálása/oldása manuális technikákkal és eszközökkel",
    long: "<strong>Sérülések</strong> és <strong>műtétek</strong> után létrejött <strong>hegek</strong> nem csak a bőrfelszínen húzódnak, hanem <strong>mélyen</strong> a szövetek közé is lenyúlhatnak. Műtéti metszés során <strong>több réteg kötőszövet és izomszövet</strong> kerülhet átvágásra, ami hegesedéssel gyógyul.\n" +
      "A heggyógyulás során termelődő kollagén olyan, mint a ragasztó, mindent „összetapaszt”. Amennyiben nem mozgunk, nem mobilizáljuk <strong>minden irányba</strong> az adott területet, a <strong>hegszövet</strong> a körülötte lévő kötőszövettel <strong>összenövéseket</strong> hoz létre. Így megszűnik a különböző fascia/kötőszöveti rétegek közötti elcsúszás, ami <strong>mozgásszervi</strong> és <strong>belszervi</strong> problémákhoz - <strong>fájdalomhoz, mozgásbeszűküléshez, ödémához</strong> - vezethet.\n" +
      "A hegkezelést érdemes <strong>minél hamarabb</strong> elkezdeni, de soha nem késő, a régi hegek is képesek oldódni.\n" +
      "A hegkezelést manuális terápiával végzem, szükség esetén köpölyt és kinezio tapaszt is használok.\n" +
      "Mikor javasolt?\n" +
      "- <strong>sérülések, balesetek</strong>\n" +
      "- <strong>műtétek</strong> (belsőszervi, mozgásszervi)\n" +
      "- <strong>szülés, császármetszés</strong>",
  },
  {
    id: "kopoly",
    title: "Köpöly",
    imageId: "Köpöly_tnfza9",
    short: "Szövetlazítás és fájdalomcsillapítás vákuumos szívóhatás segítségével",
    long: "A <strong>köpöly</strong> terápia során <strong>vákuumot</strong> hozok létre a bőrön egy üveg- vagy szilikon köpöly segítségével, melynek <strong>vérkeringés fokozó</strong> és <strong>szövetlazító</strong> hatása van.\n" +
      "Végezhető olajjal, a köpölyt csúsztatgatva a bőrön - így nem hagy sötét foltokat, csak ha percekig egy ponton hagyjuk. Egy ponton hagyva a környező ízületek mozgatásával is fokozható a terápia hatékonysága.\n" +
      "Mikor ajánlott?\n" +
      "- mozgásszervi <strong>fájdalmak</strong>\n" +
      "- <strong>feszes, görcsös</strong> izomzat\n" +
      "- <strong>beszűkült</strong> ízület",
  },
  {
    id: "kinezio_tape",
    title: "Kinezio tape",
    imageId: "Kinezio_Tape_azwszz",
    short: "Színes tapaszok izomlazításra, ízület stabilizálásra, keringés serkentésére, és fájdalomcsillapításra",
    long: "A <strong>kineziológiai tapasz</strong> egy rugalmas pamutanyagból készült, <strong>gyógyszermentes</strong>, bőrre ragasztható szalag, amely segítségével a <strong>fájdalom</strong> és a <strong>mozgáskorlátozottság</strong> rövid időn belül csökkenthető.\n" +
      "A felhelyezett tapasz hatására a <strong>nyirokfolyadék</strong> áramlása intenzívebbé válik, javul a <strong>vérkeringés</strong>, és a fájdalom receptorokra nehezedő <strong>nyomás</strong> is csökken. Megfelelő felhelyezéssel az <strong>ízületek stabilizálásában</strong> is segít.\n" +
      "Használható <strong>ficamok, húzódások, sportsérülések, gerinc és végtagfájdalmak kezelésekor</strong>, valamint mozgásszervi <strong>műtétek</strong> utáni rehabilitációban is.",
  },
  {
    id: "alkapocs_izuleti",
    title: "Állkapocs-ízületi terápia",
    imageId: "Állkapocs-ízületi_terápia__qcwsbl",
    short: "A rágóízület és a környező izmok manuális kezelése",
    long: "Az <strong>állkapocs-ízületi terápia</strong> során az ízület körüli izmokat (pl. rágóizmot) <strong>lazító</strong>, és az ízületet <strong>mobilizáló</strong> manuális fogásokat alkalmazok. Bizonyos izmokat csak a szájnyíláson keresztül lehet elérni, így szükség esetén steril gumikesztyűt használva a szájon belüli izmokat is kezelem.\n" +
      "Mikor segíthet ez a kezelés?\n" +
      "- <strong>Fájdalom, kattogás, gyulladás, mozgástartomány beszűkülés</strong> az állkapocsízületben\n" +
      "- Fájdalom, blokk a <strong>felső nyaki szakaszban</strong>\n" +
      "- <strong>Fejfájás</strong>\n" +
      "- <strong>Fogcsikorgatás</strong>\n" +
      "- <strong>Fülzúgás</strong>\n" +
      "- <strong>Gerinc</strong> görbületeinek változásai (gerincferdülésnél is kiegészítő terápiás lehetőség)\n" +
      "- <strong>Szájzár</strong>, Száj nyitási zavarok\n" +
      "- <strong>Látászavarok</strong>\n" +
      "- <strong>Nyelési zavarok</strong>\n" +
      "- <strong>Arcfájdalmak</strong>\n" +
      "- Nem specifikus <strong>fogfájdalmak</strong>\n" +
      "- Hosszú ideig tartó <strong>fogászati, szájsebészeti beavatkozások</strong>\n" +
      "- <strong>Stressz</strong>",
  },
  {
    id: "cranio_terapia",
    title: "Cranio FDM (Fejfájás terápia)",
    imageId: "CranioFDM_v2d9nz",
    short: "Az izom/kötőszövet eredetű fejfájások terápiája",
    long: "Az <strong>FDM</strong> (Fascia Disztorziós Modell) elmélete azzal az alapfeltevéssel dolgozik, hogy a test különböző fájdalmait és funkcionális zavarait a <strong>fascia</strong> rendszeren belüli torzulások okozzák. A fascia a testünkben elhelyezkedő <strong>kötőszövetek hálózata</strong>, amely körülveszi az <strong>izmokat, ízületeket, idegeket</strong> és egyéb szöveteket, és részt vesz azok mozgásában és stabilizálásában.\n" +
      "A cranio FDM kezelés a Fascia Disztorziós Modell alkalmazásával a <strong>fej</strong>, a <strong>nyak</strong> és a <strong>koponya</strong> körüli fájdalom és funkcionális zavarok kezelésére irányul. A terápia célja, hogy speciális manuális technikákkal a fascia rendszeren belüli torzulásokat, <strong>disztoriókat</strong> oldja, és ezáltal csökkentse a fájdalmakat. \n" +
      "Ez a módszer különösen hasznos lehet ha:\n" +
      "- <strong>rendszeresen fáj a fejed</strong>\n" +
      "- <strong>szédüléssel, egyensúlyzavarral</strong> küzdesz\n" +
      "- <strong>állkapocs-ízületi és nyak környéki</strong> panaszaid vannak (feszesség, fájdalom)\n" +
      "- <strong>ütés</strong> érte a fejed, az arcod akár küzdősportban, akár egyéb balesetben",
  },
  {
    id: "neuro_mozgaskorrekcio",
    title: "Neuro-mozgáskorrekció",
    imageId: "Neuro-mozgáskorrekció__s2qhdv",
    short: "Az izomtónus tesztelése és helyreállítása az idegrendszeren keresztül",
    long: "A <strong>Neuro-mozgáskorrekció</strong> egy neurológiai alapú technika, amely segíti az emberi test működését, felismerve és korrigálva a <strong>receptor diszfunkciókat</strong>, amelyek fájdalmat vagy mozgáskorlátozást okozhatnak. A receptorok érzékelik a környezeti változásokat és információkat küldenek az agyba, amely döntéseket hoz az izmok mozgásának irányítására. <strong>Sérülések, műtétek</strong> vagy <strong>környezeti stressz</strong> hatására a receptorok működése megváltozhat, és <strong>kóros jelátvitelt</strong> okozhatnak, ami az izmok működésképtelenségét és fájdalmat eredményezhet. \n" +
      "A kezelés során különböző <strong>vizuális</strong> és <strong>manuális</strong> hatások (például simítás, fény, nyomás) segítségével tesztelem és kezelem azokat a receptor diszfunkciókat, amelyek fájdalmat vagy mozgáskorlátozást okozhatnak. A célom, hogy helyreállítsam az <strong>izmok optimális működését</strong>, mivel a mozgásszervi problémák sokszor az <strong>izomtónus-szabályozási</strong> problémákból erednek. Ezenkívül, ha szükséges, életmódbeli tanácsokkal segítek az izomfunkciók további javításában. \n" +
      "Mikor segíthet ez a technika?\n" +
      "-<strong>Hegek, tetoválások, piercingek</strong> után\n" +
      "-Olyan panaszoknál (krónikus fájdalom, mozgáskorlátozottság, izomfeszültség), amik <strong>nem strukturális/szöveti</strong> elváltozásból erednek",
  },
]