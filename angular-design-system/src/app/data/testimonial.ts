// Two independent testimonial datasets, ported verbatim from the React app's data.js.
// Quotes are the product — emoji and line breaks preserved exactly. landingOpinions
// (aboutMeOpinions) feeds the landing "Rólam mondták" carousel.

export interface Testimonial {
  author: string;
  description: string;
}

/** aboutMeOpinions — landing page "Rólam mondták". */
export const LANDING_OPINIONS: Testimonial[] = [
  {
    author: 'B. Katalin',
    description:
      '"Rékát csak ajánlani tudom, nekem sokféle gerinc és mozgásszervi problémám van, amiken a kezelései sokat segítenek, nagyon profi szakember. A legszimpatikusabb benne, hogy a mai fiatalokhoz képest nagyon céltudatos, folyamatosan képezi magát. 🥰 Mindig kedves és nyugodtság árad belőle, ami a fizikai gyógyulás mellett nagyon pozitív plusz dolog nekem 🥰"\n',
  },
  {
    author: 'T. Fanni',
    description:
      'Rékát mindenkinek csak ajánlani tudom, nagyon profi, komolyan veszi a problémákat és mindent belead abba, hogy az összes hozzá forduló páciensének a lehető leghatásosabb, személyre szabottabb kezelést biztosítsa. Folyamatosan fejleszti magát különböző képzéseken, hogy minél szélesebb körben tudja a páciensek igényeihez igazítani a tudását. Nála garantáltan a páciensek élveznek prioritást! Nagyon kedves és türelmes, emellett mind szakmailag, mind emberileg motiváló is, aki teheti őt válassza, mert a legjobb!🙏🏻🤍',
  },
  {
    author: 'K. Júlia',
    description:
      'Rékának egész életemben hálás leszek!🙏🙏❤️❤️ Neki köszönhető, hogy elkerültem 2 műtétet. Szerintem nagyobb tudással rendelkezik, mint némelyik orvos, profin és szakszerűen látja el a hozzá forduló pácienseket. Mindenkinek bátran merem ajánlani!😊😊',
  },
  {
    author: 'G. Zsuzsanna',
    description:
      'Réka nagyon kedves és profi, munkája során mindig a maximumot adja. Nagyon odafigyel minden apró panaszra, sokat segített nekem is. Bármilyen problémával nyugodtan lehet hozzá fordulni, nagyon jó szívvel ajánlom😊!',
  },
  {
    author: 'H. Anna',
    description:
      'Réka nagyon kompetensen, odafigyelően végzi a munkáját és odafigyel arra is, hogy folyamatosan képezze magát. Csak ajánlani tudom!',
  },
  {
    author: 'P. Martin',
    description:
      'Réka igazán jó szakember, felkészült, figyelmes és segítőkész. Sokféle mozgásszervi és egyéb problémán is tud segíteni, még a stresszkezelésben is. Nekem helyretette a hónapok óta nem múló csuklófájdalmam. 😇',
  },
];

/** opinions — treatments page dataset (kept for the second testimonial slot). */
export const TREATMENTS_OPINIONS: Testimonial[] = [
  {
    author: 'M. Marina',
    description:
      'Réka megmentett a műtéttől! Már majdnem bejelentkeztem műtétre a kéztő alagút szindrómámmal, de szerencsére még pont időben Réka kezei közé kerültem, és már nincs szükségem a műtétre. Már az első kezelés után sokkal jobb lett, és 1 hónap múlva mondhatni teljesen elmúlt a fájdalom és a zsibbadás az ujjaimban. Újra tudom használni a kezemet!🙏',
  },
  {
    author: 'M. Ágnes',
    description:
      'Réka alapos állapotfelmérést követően alakítja ki alkalmazandó terápiáját. Már az első kezelését követően érezhető javulást tapasztaltam állapotomban. Kedves, odafigyelő természete, széleskörű tudása és ennek gyakorlati felhasználása figyelemre méltó.',
  },
  {
    author: 'B. Ivett',
    description:
      'Szia Réka 🤗 képzeld mára már teljesen elmúlt a nyak fájdalmam és minden irányba tudom már mozgatni. ❤️ Nagyon szépen köszönök! 🤗',
  },
  {
    author: 'M. Veronika',
    description:
      'Szia Réka!\n' +
      'Ne haragudj a zavarásért de szerettem volna elmesélni, hogy pénteken jött meg a kezelés óta ugye először és szerintem életem legjobb menstruációja volt!!! Nagyon sokat segített szerintem a kezelés! Teljesen más érzés volt így menstruálni! Nem fájt annyira, ha picit fájt is teljesen elviselhető volt és nem volt egyáltalán hányingerem!!🥺🥰 \n' +
      'Nagyon köszönöm!!\n' +
      'Várom, hogy menjek február végén!:)',
  },
  {
    author: 'M. Nóra',
    description:
      'Jaj Réka! Konkrétan délben vettem be utoljára gyógyszert (fél adagot), mostanra rég kiment. Megettem egy fél pizzát és még most sincs fájdalmam. Semmi. Én olyan hálás vagyok. Köszönöm🩵\n' +
      'Este még bevettem egy fájdalomcsillapítót, biztos ami biztos, de ma egyet sem és konkrétan nem fájt a 2. nap! És nincs tünetem. Sírok a boldogságtól🥰',
  },
  {
    author: 'L. Viktória',
    description:
      'Kedves Réka, kedd óta szeretném neked leírni! Szóval kedd reggel amikor felkeltem az ágyból ég és föld volt a különbség a lábfejemben! Könnyebb volt, nem fájt vagy feszült. A bal lábfejem jobbhoz ehhez képest “nyomi” volt. Jót tett, hogy a talpamat is kezelted! Köszönöm! Azóta is jó a helyzet! 🙏',
  },
  {
    author: 'Sz. Kornél',
    description:
      'Szia! ☺️\n' +
      'A mai kezelés igen hatékony volt még egyszer köszönöm javult végre a vállam eddig ez csak neked sikerült ☺️',
  },
  {
    author: 'M. Péter',
    description:
      'Csak ajánlani tudom, Réka egy igazi angyal. 😇 Már néhány kezelés után érezhetően javult a testtartásom és este sem sajog a hátam.',
  },
];
