# Landing page — prototype source

The React source of the landing page as designed. This is the reference to recreate in Angular, not code to copy.

Load order in the prototype: `app.jsx` (shell, routing, `Section`) → `plan-b.jsx` (the Online fókusz pieces) → `LandingScreen.jsx` (the page) → `ProgramsScreen.jsx` (defines `KP_COURSES` / `COURSE_PLATFORM`, which the landing page reads) → `AboutScreen.jsx` (exports `AboutBlock` / `QualificationsBlock`) → `data.js` (content).

---

## app.jsx

```jsx
const { Header, Footer, BackToTop } = window.KirillaPhysioDesignSystem_b46dcf;

const NAV = [
  { label: "Kezdőlap", href: "#/" },
  { label: "Online programok", href: "#/online-programs" },
  { label: "Egyéni kezelések", href: "#/individual-treatments" },
  { label: "Blog", href: "#/blog" },
  { label: "Kapcsolat", href: "#/contacts" },
];

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "focus": "Jelenlegi",
  "darkMode": false,
  "blockAnim": true,
  "blockAnimDir": "Felfelé",
  "weeklyMessage": true,
  "weekPreview": 0
}/*EDITMODE-END*/;

const DIRS = { "Felfelé": () => "up", "Oldalról": (i) => (i % 2 ? "right" : "left") };
const AnimCtx = React.createContext("Felfelé");
const FocusCtx = React.createContext("Jelenlegi");
let sectionSeq = 0;
const pending = new Set();

function revealAll() {
  pending.forEach((el) => el.classList.add("is-in"));
  pending.clear();
}

function sweepReveal() {
  if (document.visibilityState !== "visible") return revealAll();
  const limit = window.innerHeight * 0.94;
  pending.forEach((el) => {
    if (el.getBoundingClientRect().top < limit) { el.classList.add("is-in"); pending.delete(el); }
  });
}

function useReveal(dirMode) {
  const ref = React.useRef(null);
  const idx = React.useRef(null);
  if (idx.current === null) idx.current = sectionSeq++;
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.dataset.reveal = (DIRS[dirMode] || DIRS["Felfelé"])(idx.current);
    el.classList.remove("is-in");
    pending.add(el);
    const raf = requestAnimationFrame(sweepReveal);
    const safety = setTimeout(revealAll, 900);
    return () => { cancelAnimationFrame(raf); clearTimeout(safety); pending.delete(el); };
  }, [dirMode]);
  return ref;
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [route, setRoute] = React.useState("#/");
  const [scrolled, setScrolled] = React.useState(false);
  const scroller = React.useRef(null);

  const go = React.useCallback((href, anchorId) => {
    setRoute(href);
    if (scroller.current) scroller.current.scrollTop = 0;
    if (anchorId) requestAnimationFrame(() => requestAnimationFrame(() => {
      const el = document.getElementById(anchorId);
      if (el && scroller.current) scroller.current.scrollTo({ top: el.offsetTop - 90 });
    }));
  }, []);

  React.useEffect(() => {
    document.documentElement.dataset.theme = t.darkMode ? "dark" : "light";
  }, [t.darkMode]);

  React.useEffect(() => {
    document.documentElement.dataset.anim = t.blockAnim ? "on" : "off";
    document.documentElement.dataset.animdir = t.blockAnimDir;
  }, [t.blockAnim, t.blockAnimDir]);

  const jump = React.useCallback((id) => {
    const el = document.getElementById(id);
    if (el && scroller.current) scroller.current.scrollTo({ top: el.offsetTop - 90, behavior: "smooth" });
  }, []);

  React.useEffect(() => { window.KP_JUMP = jump; }, [jump]);

  let screen = null;
  const online = (t.focus || "Jelenlegi") === "Online fókusz";
  const nav = online ? [NAV[0], NAV[1], NAV[2], { label: "Rólam", href: "#/about" }, NAV[3], NAV[4]] : NAV;
  if (route === "#/") screen = <LandingScreen go={go} />;
  else if (route === "#/individual-treatments") screen = <TreatmentsScreen go={go} jump={jump} />;
  else if (route === "#/contacts") screen = <ContactsScreen />;
  else if (route === "#/online-programs") screen = <ProgramsScreen go={go} />;
  else if (route === "#/blog") screen = <BlogScreen go={go} />;
  else if (route.startsWith("#/blog/")) {
    /* One segment after #/blog: a post id opens the article, a section id opens that tab. */
    const seg = route.slice("#/blog/".length);
    const isPost = (window.KP_BLOG.posts || []).some((p) => p.id === seg);
    screen = isPost ? <BlogPostScreen id={seg} go={go} /> : <BlogScreen go={go} tab={seg} />;
  }
  else if (route === "#/about") screen = <AboutScreen />;
  else if (route.startsWith("#/therapy/")) screen = <TherapyScreen id={route.slice("#/therapy/".length)} go={go} />;
  else screen = <NotInKit route={route} go={go} />;

  const intercept = (e) => {
    const a = e.target.closest && e.target.closest('a[href^="#/"]');
    if (!a) return;
    e.preventDefault();
    go(a.getAttribute("href"));
  };

  return (
    <div
      ref={scroller}
      onClickCapture={intercept}
      onScroll={(e) => { setScrolled(e.currentTarget.scrollTop > 260); sweepReveal(); }}
      style={{ height: "100%", overflowY: "auto", overflowX: "hidden", background: "var(--mesh-page)", position: "relative" }}
    >
      <Header items={nav} activeHref={route} onNavigate={go} assetBase="../../assets/" />
      <main><AnimCtx.Provider value={t.blockAnimDir}><FocusCtx.Provider value={t.focus || "Jelenlegi"}>{screen}</FocusCtx.Provider></AnimCtx.Provider></main>
      <Footer assetBase="../../assets/" weekly={t.weeklyMessage !== false} weeklyProps={t.weekPreview ? { week: t.weekPreview } : undefined} />
      <BackToTop visible={scrolled} onClick={() => scroller.current && scroller.current.scrollTo({ top: 0, behavior: "smooth" })} />
      <TweaksPanel>
        <TweakSection label="Irányvonal" />
        <TweakRadio label="Fókusz" value={t.focus || "Jelenlegi"} options={["Jelenlegi", "Online fókusz"]} onChange={(v) => setTweak("focus", v)} />
        <TweakSection label="Megjelenés" />
        <TweakToggle label="Dark mode" value={t.darkMode} onChange={(v) => setTweak("darkMode", v)} />
        <TweakSection label="Blokk animációk" />
        <TweakToggle label="Beúszó blokkok" value={t.blockAnim} onChange={(v) => setTweak("blockAnim", v)} />
        <TweakRadio label="Irány" value={t.blockAnimDir} options={["Felfelé", "Oldalról"]} onChange={(v) => setTweak("blockAnimDir", v)} />
        <TweakSection label="A hét üzenete" />
        <TweakToggle label="Láthatóság a footerben" value={t.weeklyMessage} onChange={(v) => setTweak("weeklyMessage", v)} />
        <TweakSlider label="Hét előnézete (0 = aktuális)" value={t.weekPreview} min={0} max={52} step={1} onChange={(v) => setTweak("weekPreview", v)} />
      </TweaksPanel>
    </div>
  );
}

function Section({ id, children, tight = false, className, style }) {
  const ref = useReveal(React.useContext(AnimCtx));
  return (
    <section ref={ref} id={id} className={className} style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: (tight ? "var(--section-y-tight)" : "var(--section-y)") + " var(--container-pad)", ...style }}>
      {children}
    </section>
  );
}

Object.assign(window, { App, Section, NAV, NotInKit, AnimCtx, FocusCtx, useReveal, sweepReveal });

function NotInKit({ route, go }) {
  const { Card, Button, SectionHeading } = window.KirillaPhysioDesignSystem_b46dcf;
  return (
    <Section>
      <Card surface="tintCream" padding="lg" radius="xl" style={{ display: "flex", flexDirection: "column", gap: "var(--gap-stack)", alignItems: "flex-start" }}>
        <SectionHeading
          eyebrow="Nincs a kitben"
          title="Ez az oldal nincs újratervezve"
          level={4}
          lead={"A " + route + " útvonal a forrásoldalon csak hosszú, formázatlan szöveg (ászf, adatkezelés, cookie), ezért ehhez nem készült képernyő."}
        />
        <Button variant="secondary" size="sm" icon="fa-solid fa-arrow-left" onClick={() => go("#/")}>Vissza a kezdőlapra</Button>
      </Card>
    </Section>
  );
}
```

---

## LandingScreen.jsx

```jsx
const { SectionHeading, Button, Card, Chip, Eyebrow, GradientText, BenefitList, LinkTile, TestimonialCarousel, TextField, BodyMap, CaseStory } = window.KirillaPhysioDesignSystem_b46dcf;

const REGIONS = [
  { id: "fej", label: "Fej, fejfájás", x: "50%", y: "6%", side: "right" },
  { id: "nyak", label: "Nyak", x: "50%", y: "15%" },
  { id: "vall", label: "Váll, kar", x: "78%", y: "23%", side: "right" },
  { id: "derek", label: "Derék, hát", x: "40%", y: "34%" },
  { id: "has", label: "Belsőszervi panasz", x: "58%", y: "42%", side: "right" },
  { id: "csipo", label: "Csípő", x: "42%", y: "53%" },
  { id: "terd", label: "Térd", x: "60%", y: "68%", side: "right" },
  { id: "boka", label: "Boka, láb", x: "40%", y: "93%" },
];

const REGION_DETAIL = {
  fej: {
    complaints: ["izom- és kötőszövet eredetű fejfájás", "stresszhez kötődő, visszatérő fejfájás", "állkapocs-ízületi panasz, fogcsikorgatás"],
    therapies: ["cranio_terapia", "alkapocs_izuleti", "vagus_terapia"],
  },
  nyak: {
    complaints: ["nyakfájás, ízületi blokk", "karba sugárzó fájdalom, zsibbadás", "helytelen testtartás, előreesett fejtartás"],
    therapies: ["gyogytorna", "mulligan_terapia", "fdm"],
  },
  vall: {
    complaints: ["vállfájdalom, beszűkült mozgástartomány", "könyök- és csuklópanasz", "izom túlfeszülés"],
    therapies: ["mulligan_terapia", "fdm", "kinezio_tape"],
  },
  derek: {
    complaints: ["derékfájás, hátfájás (porckorongsérv, becsípődés)", "instabilitás, csigolyaelcsúszás", "lábba sugárzó fájdalom, zsibbadás"],
    therapies: ["gyogytorna", "fdm", "dorn_terapia"],
  },
  has: {
    complaints: ["puffadás, székrekedés, IBS", "fájdalmas menstruáció, ciszták", "műtét utáni hegek, feszülő has"],
    therapies: ["visceralis_terapia", "nyirok_kezeles", "hegkezeles"],
  },
  csipo: {
    complaints: ["csípőfájdalom, beszűkült mozgás", "aszimmetrikus terhelés, medenceferdeség", "terhesség utáni panaszok"],
    therapies: ["dorn_terapia", "gyogytorna", "fdm"],
  },
  terd: {
    complaints: ["térdfájdalom lépcsőn, guggolásban", "műtét utáni rehabilitáció", "húzódások, sportsérülések"],
    therapies: ["mulligan_terapia", "gyogytorna", "kinezio_tape"],
  },
  boka: {
    complaints: ["bokaficam után maradt panasz", "lábfájdalom, boka instabilitás", "beszűkült boka mozgástartomány"],
    therapies: ["mulligan_terapia", "fdm", "kinezio_tape"],
  },
};

const CASES = [
  {
    meta: "30-as évek · irodai munka · 4 hónapos panasz",
    title: "Derékfájás, ami reggelre a legrosszabb",
    blocks: [
      { label: "Panasz", text: "Reggeli felkeléskor éles derékfájás, ami napközben enyhült, de hosszú üléstől mindig visszatért." },
      { label: "Mit találtam", text: "Az állapotfelmérésen a <strong>mély stabilizátorok</strong> nem kapcsoltak be időben, a derék körüli <strong>fascia</strong> pedig feszes volt, a csípő mozgástartománya beszűkült." },
      { label: "Mit tettünk", text: "Először <strong>FDM</strong>-mel oldottam a kötőszöveti feszülést, majd <strong>szegmentális stabilizációs tréninget</strong> és otthon végezhető gyakorlatsort építettünk fel." },
    ],
    outcome: "A reggeli fájdalom megszűnt, a napi ülés már nem hozza vissza.",
    therapies: ["FDM", "Gyógytorna", "Dorn terápia"],
  },
  {
    meta: "40-es évek · visszatérő fejfájás · 2 éve tart",
    title: "Fejfájás, amire a fájdalomcsillapító nem hatott",
    blocks: [
      { label: "Panasz", text: "Heti több alkalommal jelentkező fejfájás a tarkótól indulva, esténként erősödve." },
      { label: "Mit találtam", text: "A tarkó és a rágóizmok tónusa emelkedett volt, éjszakai <strong>fogcsikorgatás</strong> jeleivel, a <strong>paraszimpatikus idegrendszer</strong> alulműködésére utaló panaszokkal." },
      { label: "Mit tettünk", text: "<strong>Cranio FDM</strong> és <strong>állkapocs-ízületi terápia</strong>, mellette <strong>vagus terápia</strong> és légzésgyakorlatok az idegrendszer nyugtatására." },
    ],
    outcome: "A fejfájások száma heti többről havi egyre csökkent.",
    therapies: ["Cranio FDM", "Állkapocs-ízületi terápia", "Vagus terápia"],
  },
];


function LandingScreen({ go }) {
  const d = window.KP_DATA;
  const online = window.useFocus() === "Online fókusz";
  return (
    <>
      <div style={{ background: "var(--mesh-hero)" }}>
        <Section tight className="kp-split" style={{ display: "grid", gridTemplateColumns: "1.05fr .95fr", gap: "var(--space-16)", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
            <Eyebrow>Gyógytornász‑fizioterapeuta · Budapest</Eyebrow>
            <h1 style={{ fontSize: "var(--display-1-size)", lineHeight: "var(--display-1-line)", letterSpacing: "var(--display-1-track)", fontWeight: "var(--display-1-weight)" }}>
              Üdvözöllek a <GradientText>weboldalamon</GradientText>!
            </h1>
            <p style={{ fontSize: "var(--body-lg-size)", lineHeight: "var(--body-lg-line)", color: "var(--text-body)", maxWidth: "540px" }}>
              Kirilla Réka vagyok, elhivatott gyógytornász‑fizioterapeuta. Küldetésem, hogy segítsek neked megszabadulni a fájdalmaktól, helyreállítani a mozgásképességed, és visszanyerni életminőséged.
            </p>
            <p style={{ fontSize: "var(--body-md-size)", lineHeight: "var(--body-md-line)", color: "var(--text-muted)", maxWidth: "540px" }}>
              Módszereim között a gyógytorna, manuálterápia, valamint egyéb kiegészítő kezelések állnak, melyek egyaránt támogatják a fájdalomcsillapítást, a regenerálódást és a prevenciót.
            </p>
            {online ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)", marginTop: "var(--space-2)" }}>
                <div style={{ display: "flex", gap: "var(--gap-inline)", flexWrap: "wrap" }}>
                  <Button size="lg" icon="fa-solid fa-file-arrow-down" onClick={() => window.KP_JUMP && window.KP_JUMP("hirlevel")}>Kérem az 5 gyakorlatot</Button>
                  <Button size="lg" variant="outline" onClick={() => go("#/online-programs")}>Online programok</Button>
                </div>
                <window.AvailabilityNote />
              </div>
            ) : null}
          </div>
          <div style={{ position: "relative" }}>
            <img
              src="https://res.cloudinary.com/dcwv2corw/image/upload/c_fill,w_760,h_1000,q_auto,f_auto/kezd%C5%91lap__u1ybav"
              alt="Kirilla Réka gyógytornász‑fizioterapeuta"
              style={{ width: "100%", aspectRatio: "3 / 4", objectFit: "cover", borderRadius: "var(--radius-card-lg)", boxShadow: "var(--shadow-lg)" }}
            />
            <div className="kp-hero-badges" style={{ position: "absolute", bottom: "-18px", left: "-22px", display: "flex", flexWrap: "wrap", maxWidth: "calc(100% + 22px)", gap: "var(--gap-inline)" }}>
              <Card surface="plain" padding="sm" radius="md" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <i className="fa-solid fa-house" aria-hidden="true" style={{ color: "var(--rose-500)" }} />
                <span style={{ fontSize: "var(--body-sm-size)", fontWeight: "var(--weight-semibold)", color: "var(--text-strong)", whiteSpace: "nowrap" }}>Otthonról végezhető programok</span>
              </Card>
              <Card surface="plain" padding="sm" radius="md" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <i className="fa-solid fa-location-dot" aria-hidden="true" style={{ color: "var(--lilac-600)" }} />
                <span style={{ fontSize: "var(--body-sm-size)", fontWeight: "var(--weight-semibold)", color: "var(--text-strong)", whiteSpace: "nowrap" }}>Egyéni kezelés Budapesten</span>
              </Card>
            </div>
          </div>
        </Section>
      </div>

      <Section tight>
        <Card surface="mesh" padding="lg" radius="xl" className="kp-split" style={{ display: "grid", gridTemplateColumns: ".8fr 1.2fr", gap: "var(--space-12)", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--gap-stack)", alignItems: "flex-start" }}>
            <SectionHeading eyebrow="Rólam" title="Miért válassz engem?" level={3} />
            {online ? (
              <Button size="sm" variant="ghost" icon="fa-solid fa-arrow-right" iconPosition="right" onClick={() => go("#/about")}>Rólam bővebben</Button>
            ) : null}
          </div>
          <BenefitList
            items={[
              "Szakértői tapasztalat és folyamatosan frissített tudás",
              "Személyre szabott, hatékony kezelések holisztikus szemléletmóddal",
              "Empatikus és figyelmes megközelítés",
            ]}
          />
        </Card>
      </Section>

      <Section tight>
        <SectionHeading eyebrow="Szolgáltatások" title={online ? "Három út, ahogy segíteni tudok" : "Hogyan tudok segíteni?"} level={2} align="center" style={{ marginBottom: "var(--space-10)" }} />
        {online ? <window.CourseLadder go={go} /> : (
        <div className="kp-cols-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--gap-grid)" }}>
          <LinkTile
            icon="fa-solid fa-house"
            title="Online programok"
            description="Az otthonodból is könnyedén elvégezhető, szakszerűen felépített programok"
            linkLabel="Tovább az online programokhoz"
            surface="filled"
            href="https://oktatas.kirillareka.hu/"
          />
          <LinkTile
            icon="fa-solid fa-house-medical-flag"
            title="Egyéni kezelés"
            description="Személyes állapotfelmérés alapján kialakított komplex terápia Budapesten"
            linkLabel="Tovább az egyéni kezelésekhez"
            href="#/individual-treatments"
          />
        </div>
        )}
      </Section>

      {online ? (
        <Section tight>
          <SectionHeading eyebrow="Online programok" title="Amit már most el tudsz kezdeni" level={3} lead="Otthon végezhető, hetekre bontott programok. Nem kell időpontra várnod." style={{ marginBottom: "var(--space-8)" }} />
          <window.CoursePromo go={go} />
        </Section>
      ) : null}

      <Section tight>
        <SectionHeading eyebrow="Hol fáj?" title="Kezdjük ott, ahol a panaszod van" level={2} align="center" lead="Válaszd ki a testtájékot, és megmutatom, milyen panaszokkal találkozom ott, és melyik terápiával dolgozom rajta." maxWidth="640px" style={{ marginBottom: "var(--space-10)", marginInline: "auto" }} />
        <SymptomRouter go={go} />
      </Section>

      {online ? null : <window.AboutBlock />}

      <Section tight>
        <SectionHeading eyebrow="Páciens történetek" title="Így néz ki egy kezelési folyamat" level={2} lead="Két anonimizált eset a praxisomból — a panasztól a kezelési tervig." style={{ marginBottom: "var(--space-10)" }} />
        <div className="kp-cols-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--gap-grid)", alignItems: "stretch" }}>
          {CASES.map((c) => <CaseStory key={c.title} {...c} />)}
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "var(--space-10)" }}>
          <Button size="md" variant="ghost" icon="fa-solid fa-arrow-right" iconPosition="right" onClick={() => go("#/blog/tortenetek")}>További páciens történetek a blogon</Button>
        </div>
      </Section>

      <Section tight>
        <SectionHeading eyebrow="Visszajelzések" title="Rólam mondták" level={2} align="center" style={{ marginBottom: "var(--space-10)" }} />
        <TestimonialCarousel items={d.landingOpinions} perView={3} />
      </Section>

      {online ? null : <window.QualificationsBlock />}

      <Section id="hirlevel" tight>
        {online ? <window.LeadMagnet layout="wide" /> : (
        <Card surface="tintLilac" padding="lg" radius="xl" className="kp-split" style={{ display: "grid", gridTemplateColumns: "1fr .9fr", gap: "var(--space-12)", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--gap-stack)" }}>
            <Eyebrow tone="lilac">Hírlevél</Eyebrow>
            <h2 style={{ fontSize: "var(--heading-1-size)", lineHeight: "var(--heading-1-line)", letterSpacing: "var(--heading-1-track)", fontWeight: "var(--heading-1-weight)" }}>
              Küldök egy gyakorlatot, mielőtt bármit választanál
            </h2>
            <p style={{ fontSize: "var(--body-md-size)", lineHeight: "var(--body-md-line)", color: "var(--text-muted)", maxWidth: "460px" }}>
              Iratkozz fel, és elküldöm az első otthon végezhető gyakorlatsorom, utána pedig havonta egy levelet arról, mit tehetsz a saját mozgásodért. Bármikor leiratkozhatsz.
            </p>
          </div>
          <NewsletterForm />
        </Card>
        )}
      </Section>
    </>
  );
}

Object.assign(window, { LandingScreen, NewsletterForm });

function InfoTip({ text }) {
  const [open, setOpen] = React.useState(false);
  return (
    <span style={{ position: "relative", display: "inline-flex" }} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        aria-label="Megjegyzés"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        style={{ width: "20px", height: "20px", display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: "999px", border: "none", padding: 0, cursor: "pointer", background: "var(--blush-100)", color: "var(--text-link)", boxShadow: "var(--shadow-ring-hairline)", fontSize: "10px", lineHeight: 1 }}
      >
        <i className="fa-solid fa-info" aria-hidden="true" />
      </button>
      {open && (
        <span
          role="tooltip"
          style={{ position: "absolute", bottom: "calc(100% + 10px)", left: "50%", transform: "translateX(-50%)", width: "min(290px, 62vw)", padding: "12px 14px", borderRadius: "var(--radius-md, 14px)", background: "var(--surface-raised, #fff)", color: "var(--text-body)", boxShadow: "var(--shadow-pop, 0 12px 32px rgba(0,0,0,.14))", fontSize: "var(--body-sm-size)", lineHeight: "var(--body-sm-line)", letterSpacing: "normal", textTransform: "none", fontWeight: "var(--weight-regular, 400)", zIndex: 5, pointerEvents: "none" }}
        >
          {text}
        </span>
      )}
    </span>
  );
}

function SymptomRouter({ go }) {
  const [active, setActive] = React.useState("derek");
  const region = REGIONS.find((r) => r.id === active);
  const detail = REGION_DETAIL[active];
  const therapies = detail.therapies.map((id) => window.KP_DATA.therapies.find((t) => t.id === id)).filter(Boolean);

  return (
    <div className="kp-split" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))", gap: "var(--space-10)", alignItems: "center" }}>
      <BodyMap regions={REGIONS} activeId={active} onSelect={setActive} caption="A rajz sematikus, csak a tájékozódást segíti." />
      <Card surface="plain" padding="lg" radius="xl" style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
          <Eyebrow>Kiválasztva</Eyebrow>
          <h3 style={{ fontSize: "var(--heading-1-size)", lineHeight: "var(--heading-1-line)", letterSpacing: "var(--heading-1-track)", fontWeight: "var(--heading-1-weight)", color: "var(--text-strong)" }}>{region.label}</h3>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
          <span style={{ fontSize: "var(--eyebrow-size)", letterSpacing: "var(--eyebrow-track)", fontWeight: "var(--eyebrow-weight)", textTransform: "uppercase", color: "var(--text-muted)" }}>Amivel itt találkozom</span>
          <ul style={{ margin: 0, paddingInlineStart: "18px", listStyleType: '"\\2014"' }}>
            {detail.complaints.map((c) => (
              <li key={c} style={{ paddingLeft: "10px", marginBottom: "8px", fontSize: "var(--body-md-size)", lineHeight: "var(--body-md-line)", color: "var(--text-body)" }}>{c}</li>
            ))}
          </ul>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "var(--eyebrow-size)", letterSpacing: "var(--eyebrow-track)", fontWeight: "var(--eyebrow-weight)", textTransform: "uppercase", color: "var(--text-muted)" }}>Amivel dolgozom rajta</span>
            <InfoTip text="Nem csak ez a három terápia lehet hatásos ezen a testtájékon — ezek a leggyakoribb választásaim, de a kezelési tervet mindig az állapotfelmérés alapján állítom össze." />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--gap-inline)" }}>
            {therapies.map((t) => (
              <a
                key={t.id}
                href={"#/therapy/" + t.id}
                onClick={(e) => { e.preventDefault(); go("#/therapy/" + t.id); }}
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--gap-inline)", padding: "13px 18px", borderRadius: "var(--radius-pill)", background: "var(--blush-100)", boxShadow: "var(--shadow-ring-hairline)", textDecoration: "none" }}
              >
                <span style={{ fontSize: "var(--body-md-size)", fontWeight: "var(--weight-semibold)", color: "var(--text-strong)" }}>{t.title}</span>
                <i className="fa-solid fa-arrow-right" aria-hidden="true" style={{ fontSize: "11px", color: "var(--text-link)" }} />
              </a>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--gap-inline)", alignItems: "center" }}>
          <Button size="md" href="https://kirillareka.salonic.hu/">Időpontot foglalok</Button>
          <Button size="md" variant="ghost" icon="fa-solid fa-arrow-right" iconPosition="right" onClick={() => go("#/individual-treatments")}>Minden terápia</Button>
        </div>
      </Card>
    </div>
  );
}

function NewsletterForm() {
  const [email, setEmail] = React.useState("");
  const [sent, setSent] = React.useState(false);

  if (sent) {
    return (
      <Card surface="plain" padding="md" radius="lg" style={{ display: "flex", gap: "var(--gap-inline)", alignItems: "flex-start" }}>
        <i className="fa-solid fa-circle-check" aria-hidden="true" style={{ color: "var(--feedback-success)", fontSize: "19px", marginTop: "2px" }} />
        <span style={{ fontSize: "var(--body-md-size)", lineHeight: "var(--body-md-line)" }}>
          Köszönöm! Hamarosan megkapod az első gyakorlatsort a megadott címre.
        </span>
      </Card>
    );
  }

  return (
    <Card surface="plain" padding="md" radius="lg" style={{ display: "flex", flexDirection: "column", gap: "var(--gap-stack)" }}>
      <TextField
        label="E-mail címed"
        type="email"
        icon="fa-solid fa-envelope"
        placeholder="pelda@email.hu"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button size="md" fullWidth onClick={() => email && setSent(true)}>Kérem a gyakorlatsort</Button>
      <span style={{ fontSize: "var(--caption-size)", lineHeight: "var(--caption-line)", color: "var(--text-subtle)" }}>
        A feliratkozással elfogadod az <a href="#/privacy">adatkezelési tájékoztatót</a>.
      </span>
    </Card>
  );
}
```

---

## plan-b.jsx

```jsx
const { SectionHeading, Button, Card, Chip, Eyebrow, GradientText, TextField, BenefitList } = window.KirillaPhysioDesignSystem_b46dcf;

const PDF_TITLE = "5 gyakorlat derékfájásra";
const PDF_POINTS = [
  "Öt gyakorlat, amit otthon, eszköz nélkül elvégezhetsz",
  "Mindegyikhez leírás és annyi ismétlés, amennyi valóban elég",
  "Utána havonta egy levél arról, mit tehetsz a saját mozgásodért",
];
const AVAILABILITY = "A naptáram gyakran hetekre előre betelt, ezért készítettem online programokat: azokat bármikor elkezdheted, és otthonról végezheted.";

function useFocus() {
  return React.useContext(window.FocusCtx);
}

function AvailabilityNote({ tone = "default" }) {
  const onAccent = tone === "onAccent";
  return (
    <p style={{ display: "flex", gap: "var(--gap-inline)", alignItems: "flex-start", fontSize: "var(--body-sm-size)", lineHeight: "var(--body-sm-line)", color: onAccent ? "var(--text-on-accent-muted)" : "var(--text-muted)", maxWidth: "540px" }}>
      <i className="fa-regular fa-calendar" aria-hidden="true" style={{ marginTop: "3px", color: onAccent ? "inherit" : "var(--rose-500)" }} />
      <span>{AVAILABILITY}</span>
    </p>
  );
}

function LeadMagnetForm({ compact = false }) {
  const [email, setEmail] = React.useState("");
  const [sent, setSent] = React.useState(false);

  if (sent) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--gap-stack)" }}>
        <div style={{ display: "flex", gap: "var(--gap-inline)", alignItems: "flex-start" }}>
          <i className="fa-solid fa-circle-check" aria-hidden="true" style={{ color: "var(--feedback-success)", fontSize: "19px", marginTop: "2px" }} />
          <span style={{ fontSize: "var(--body-md-size)", lineHeight: "var(--body-md-line)" }}>
            Köszönöm! A PDF-et elküldtem a megadott címre. Ha nem érkezik meg pár percen belül, nézd meg a spam mappát is.
          </span>
        </div>
        <Button size="sm" variant="secondary" icon="fa-solid fa-arrow-right" iconPosition="right" href={window.COURSE_PLATFORM}>Megnézem az online programokat</Button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--gap-stack)" }}>
      <TextField label="E-mail címed" type="email" icon="fa-solid fa-envelope" placeholder="pelda@email.hu" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Button size={compact ? "md" : "lg"} fullWidth onClick={() => email && setSent(true)}>Kérem a PDF-et</Button>
      <span style={{ fontSize: "var(--caption-size)", lineHeight: "var(--caption-line)", color: "var(--text-subtle)" }}>
        A feliratkozással elfogadod az <a href="#/privacy">adatkezelési tájékoztatót</a>. Bármikor leiratkozhatsz.
      </span>
    </div>
  );
}

function LeadMagnet({ layout = "wide" }) {
  if (layout === "inline") {
    return (
      <Card surface="tintLilac" padding="lg" radius="xl" style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)", height: "100%" }}>
        <Eyebrow tone="lilac">Ingyenes</Eyebrow>
        <h3 style={{ fontSize: "var(--heading-1-size)", lineHeight: "var(--heading-1-line)", letterSpacing: "var(--heading-1-track)", fontWeight: "var(--heading-1-weight)" }}>{PDF_TITLE}</h3>
        <p style={{ fontSize: "var(--body-md-size)", lineHeight: "var(--body-md-line)", color: "var(--text-body)" }}>
          Megadod az e-mail címed, és elküldöm a gyakorlatsort. Nem kell hozzá eszköz, és ma el tudod kezdeni.
        </p>
        <LeadMagnetForm compact />
      </Card>
    );
  }
  return (
    <Card surface="tintLilac" padding="lg" radius="xl" className="kp-split" style={{ display: "grid", gridTemplateColumns: "1fr .85fr", gap: "var(--space-12)", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--gap-stack)" }}>
        <Eyebrow tone="lilac">Ingyenes PDF</Eyebrow>
        <h2 style={{ fontSize: "var(--heading-1-size)", lineHeight: "var(--heading-1-line)", letterSpacing: "var(--heading-1-track)", fontWeight: "var(--heading-1-weight)" }}>
          <GradientText>{PDF_TITLE}</GradientText>
        </h2>
        <BenefitList items={PDF_POINTS} />
      </div>
      <Card surface="plain" padding="md" radius="lg">
        <LeadMagnetForm />
      </Card>
    </Card>
  );
}

function LadderStep({ eyebrow, title, meta, description, cta, featured = false }) {
  return (
    <Card surface={featured ? "filled" : "plain"} padding="lg" radius="xl" style={{ display: "flex", flexDirection: "column", gap: "var(--gap-stack)", height: "100%" }}>
      <Eyebrow tone={featured ? "onAccent" : "rose"}>{eyebrow}</Eyebrow>
      <h3 style={{ fontSize: "var(--heading-1-size)", lineHeight: "var(--heading-1-line)", letterSpacing: "var(--heading-1-track)", fontWeight: "var(--heading-1-weight)", color: featured ? "var(--text-on-accent)" : "var(--text-strong)" }}>{title}</h3>
      <span style={{ fontSize: "var(--body-sm-size)", fontWeight: "var(--weight-semibold)", color: featured ? "var(--text-on-accent-muted)" : "var(--text-accent)" }}>{meta}</span>
      <p style={{ fontSize: "var(--body-md-size)", lineHeight: "var(--body-md-line)", color: featured ? "var(--text-on-accent-muted)" : "var(--text-muted)", flex: 1 }}>{description}</p>
      <div>{cta}</div>
    </Card>
  );
}

function CourseLadder({ go }) {
  return (
    <div className="kp-cols-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--gap-grid)", alignItems: "stretch" }}>
      <LadderStep
        eyebrow="Első lépés"
        title={PDF_TITLE}
        meta="Ingyenes · PDF"
        description="Öt gyakorlat, amit ma el tudsz kezdeni otthon. Ha ez segít, onnan tovább tudunk építeni."
        cta={<Button size="md" variant="secondary" icon="fa-solid fa-file-arrow-down" onClick={() => window.KP_JUMP && window.KP_JUMP("hirlevel")}>Kérem a PDF-et</Button>}
      />
      <LadderStep
        featured
        eyebrow="Ha egyedül dolgoznál"
        title="Online program"
        meta="Bármikor kezdheted · otthonról végezheted"
        description="Felépített, hetekre bontott programok: videós gyakorlatok, sorrend és haladás. Nem kell időpontra várnod."
        cta={<Button size="md" variant="onAccent" icon="fa-solid fa-arrow-right" iconPosition="right" onClick={() => go && go("#/online-programs")}>Programok megtekintése</Button>}
      />
      <LadderStep
        eyebrow="Ha kézre van szükséged"
        title="Személyes kezelés"
        meta="20.000 Ft · 60 perc · Budapest, XII."
        description="Állapotfelmérés és komplex kezelés a rendelőben. Akkor a legjobb választás, ha a panasz vizsgálatot igényel."
        cta={<Button size="md" variant="outline" href="https://kirillareka.salonic.hu/">Időpontot foglalok</Button>}
      />
    </div>
  );
}

function CoursePromo({ go, limit = 2 }) {
  const courses = (window.KP_COURSES || []).filter((c) => c.status === "live").slice(0, limit);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "var(--gap-grid)", alignItems: "stretch" }}>
      {courses.map((c) => (
        <Card key={c.slot} surface="plain" padding="none" radius="lg" style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <image-slot id={c.slot} shape="rect" fit="cover" placeholder="Program borítókép" style={{ display: "block", width: "100%", height: "190px" }}></image-slot>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--gap-stack)", padding: "var(--space-6)", flex: 1 }}>
            <h3 style={{ fontSize: "var(--heading-2-size)", lineHeight: "var(--heading-2-line)", letterSpacing: "var(--heading-2-track)", fontWeight: "var(--heading-2-weight)" }}>{c.title}</h3>
            {c.description ? <p style={{ fontSize: "var(--body-sm-size)", lineHeight: "var(--body-sm-line)", color: "var(--text-muted)", flex: 1 }}>{c.description}</p> : <span style={{ flex: 1 }} />}
            <div style={{ display: "flex", gap: "var(--gap-inline)", flexWrap: "wrap" }}>
              <Button size="sm" href={window.COURSE_PLATFORM}>Megnézem</Button>
              <Button size="sm" variant="ghost" onClick={() => go && go("#/online-programs")}>Részletek</Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

Object.assign(window, { useFocus, AvailabilityNote, LeadMagnet, LeadMagnetForm, CourseLadder, CoursePromo, PDF_TITLE, PDF_POINTS });
```

---

## AboutScreen.jsx

```jsx
const { SectionHeading, Card, Eyebrow, GradientText, QualificationList } = window.KirillaPhysioDesignSystem_b46dcf;

const ABOUT = [
  "A mozgás és az egészségtudatosság már kislány koromtól kezdve központi eleme volt az életemnek. Sok sportágban kipróbáltam magam, kezdve az akrobatikával, az aerobikkal, a zumbával, majd később a futás, TRX és funkcionális edzés irányába mentem el, valamint egy ideig az erőemelésben is kipróbáltam magam. Jelenleg pedig a testépítés, és a tánc, amit rendszeresen végzek.",
  "A mozgás szeretete, és a vágy, hogy segítsek más embereken egyértelművé tette számomra, hogy gyógytornász szeretnék lenni. A 4 éves gyógytornász-fizioterapeuta képzést a Pécsi Tudományegyetemen végeztem el.",
  "Diplomám megszerzése után egy gerincambulancián kezdtem el dolgozni, ahol egyéni gyógytornával kezeltem gerinc eredetű panasszal rendelkező pácienseket, és hamar elkezdtem tanfolyamokra járni, hogy a gyógytornán túl egyéb eszközökkel is tudjam segíteni a pácienseim gyógyulását. Emellett dolgoztam egy mozgásközpontban, ahol csoportos gerinctornákat tartottam. Egy másik jógaközpontban pedig anatómiát oktattam leendő jógaoktatók számára.",
  "A kellő mennyiségű szakmai tapasztalat, és 25+ elvégzett tanfolyam után 2023-ban elindítottam a saját vállalkozásomat, mely során egyre több kiegészítő terápiás eszközt (manuálterápia, köpöly, visceralis terápia stb.) alkalmaztam, és a mai napig is folyamatosan bővítem a terápiás eszköztáramat.",
  "A mozgás mellett elengedhetetlennek tartom, hogy odafigyeljünk az étkezésünkre, és a mentális egészségünkkel is aktívan foglalkozzunk.",
  "A kompetenciahatáraimat betartva ebben is segítem a pácienseimet, illetve igyekszem jó példát mutatni a saját életstílusommal: tisztán étkezem, rendszeresen meditálok, és sok önfejlesztő tartalmat fogyasztok.",
];

const TRIAD = [
  { icon: "fa-solid fa-person-walking", label: "Mozgás", x: "16%", y: "20%" },
  { icon: "fa-solid fa-apple-whole", label: "Étkezés", x: "84%", y: "20%" },
  { icon: "fa-solid fa-brain", label: "Mentálhigiéné", x: "50%", y: "84%" },
];

function TriadDiagram() {
  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: "1 / 0.82", minHeight: "230px", marginTop: "var(--space-2)" }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <g fill="none" stroke="var(--rose-300)" strokeWidth="1.5" strokeLinecap="round" vectorEffect="non-scaling-stroke">
          <line x1="30" y1="20" x2="70" y2="20" vectorEffect="non-scaling-stroke" />
          <line x1="26.2" y1="39.2" x2="39.8" y2="64.8" vectorEffect="non-scaling-stroke" />
          <line x1="73.8" y1="39.2" x2="60.2" y2="64.8" vectorEffect="non-scaling-stroke" />
        </g>
      </svg>
      {TRIAD.map((t) => (
        <span key={t.label} style={{ position: "absolute", left: t.x, top: t.y, width: "52px", height: "52px", transform: "translate(-50%, -50%)" }}>
          <span style={{ width: "52px", height: "52px", borderRadius: "var(--radius-circle)", background: "var(--white)", color: "var(--rose-700)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "20px", boxShadow: "var(--shadow-sm)" }}>
            <i className={t.icon} aria-hidden="true" />
          </span>
          <span style={{ position: "absolute", left: "50%", top: "calc(100% + 8px)", transform: "translateX(-50%)", fontFamily: "var(--font-display)", fontSize: "var(--body-sm-size)", lineHeight: "var(--body-sm-line)", fontWeight: 600, color: "var(--text-strong)", whiteSpace: "nowrap" }}>{t.label}</span>
        </span>
      ))}
    </div>
  );
}

function AboutBlock({ heading = "Rólam:" }) {
  return (
    <Section tight className="kp-split" style={{ display: "grid", gridTemplateColumns: "1fr 1.35fr", gap: "var(--space-16)", alignItems: "start" }}>
      <div className="kp-about-sticky" style={{ position: "sticky", top: "110px", display: "flex", flexDirection: "column", gap: "var(--gap-stack)" }}>
        <SectionHeading eyebrow="Bemutatkozás" title={heading} level={3} />
        <Card surface="tintRose" padding="md" radius="lg" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <i className="fa-solid fa-graduation-cap" aria-hidden="true" style={{ fontSize: "18px", color: "var(--rose-700)" }} />
          <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--heading-3-size)", lineHeight: "var(--heading-3-line)", fontWeight: "var(--heading-3-weight)", color: "var(--text-strong)" }}>Pécsi Tudományegyetem</span>
        </Card>
        <Card surface="tintLilac" padding="md" radius="lg" style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--numeral-size)", lineHeight: 1, letterSpacing: "var(--numeral-track)", fontWeight: "var(--numeral-weight)" }}>
            <GradientText>25+</GradientText>
          </span>
          <span style={{ fontSize: "var(--body-sm-size)", color: "var(--text-muted)" }}>elvégzett tanfolyam</span>
        </Card>
        <TriadDiagram />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
        {ABOUT.map((p, i) => (
          <p key={i} style={{ fontSize: "var(--body-md-size)", lineHeight: "var(--body-md-line)", color: "var(--text-body)" }}>{p}</p>
        ))}
      </div>
    </Section>
  );
}

function QualificationsBlock() {
  return (
    <Section tight>
      <SectionHeading eyebrow="Szakmai háttér" title="Végzettségeim" level={3} style={{ marginBottom: "var(--space-8)" }} />
      <Card surface="plain" padding="lg" radius="xl">
        <QualificationList items={window.KP_DATA.qualifications} columns={2} />
      </Card>
    </Section>
  );
}

function AboutScreen() {
  return (
    <>
      <div style={{ background: "var(--mesh-hero)" }}>
        <Section tight style={{ paddingBottom: "var(--space-10)" }}>
          <div className="kp-split" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) clamp(220px, 28vw, 360px)", gap: "var(--space-12)", alignItems: "center" }}>
            <SectionHeading
              style={{ maxWidth: "100%" }}
              eyebrow="Rólam"
              title="Kirilla Réka vagyok, gyógytornász-fizioterapeuta"
              level={2}
              lead="A mozgás szeretete vitt a szakma felé, és a mai napig folyamatosan tanulok. Itt elolvashatod, honnan indultam, és milyen végzettségek állnak a munkám mögött."
              maxWidth="100%"
            />
            <img src="media/reka-portrait.jpg" alt="Kirilla Réka gyógytornász-fizioterapeuta" style={{ width: "100%", aspectRatio: "1 / 1", objectFit: "cover", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-sm)", display: "block" }} />
          </div>
        </Section>
      </div>
      <AboutBlock heading="Az utam:" />
      <QualificationsBlock />
    </>
  );
}

Object.assign(window, { AboutScreen, AboutBlock, QualificationsBlock, KP_ABOUT: ABOUT });
```

---

## ProgramsScreen.jsx

```jsx
const { SectionHeading, Button, Card, Chip } = window.KirillaPhysioDesignSystem_b46dcf;

/* Catalogue. `weeks` / `lessons` are null until Réka supplies them — the card renders an em dash
   placeholder rather than inventing a number. Add entries to the top of the array; the grid wraps. */
const COURSES = [
  { slot: "course-csipo", title: "Csípő Program", description: "", weeks: null, lessons: null, status: "soon" },
  { slot: "course-henger", title: "Hengerezz okosan", description: "Az SMR henger és trigger labda használata", weeks: null, lessons: null, status: "live" },
  { slot: "course-gerinc", title: "Stabil Gerinc Program", description: "A gerincstabilizáló izmok fejlesztése az alapoktól a haladó szintig", weeks: null, lessons: null, status: "live" },
];

const PLATFORM = "https://oktatas.kirillareka.hu/";

function CourseCard({ c }) {
  const soon = c.status === "soon";
  return (
    <Card surface="plain" padding="none" radius="lg" style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <image-slot
        id={c.slot}
        shape="rect"
        fit="cover"
        placeholder="Program borítókép"
        style={{ display: "block", width: "100%", height: "170px", opacity: soon ? 0.7 : 1 }}
      ></image-slot>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--gap-stack)", padding: "var(--space-6)", flex: 1 }}>
        <span style={{ display: "flex", gap: "10px", alignItems: "center", fontSize: "var(--caption-size)", letterSpacing: ".2px", color: "var(--text-subtle)" }}>
          <span style={{ display: "inline-flex", gap: "6px", alignItems: "center" }}>
            <i className="fa-regular fa-calendar" aria-hidden="true" />{c.weeks ? c.weeks + " hét" : "— hét"}
          </span>
          <span aria-hidden="true" style={{ color: "var(--line-strong)" }}>·</span>
          <span style={{ display: "inline-flex", gap: "6px", alignItems: "center" }}>
            <i className="fa-regular fa-circle-play" aria-hidden="true" />{c.lessons ? c.lessons + " lecke" : "— lecke"}
          </span>
        </span>
        <h3 style={{ fontSize: "var(--heading-3-size)", lineHeight: "var(--heading-3-line)", letterSpacing: "var(--heading-3-track)", fontWeight: "var(--heading-3-weight)" }}>{c.title}</h3>
        {c.description ? (
          <p style={{ fontSize: "var(--body-sm-size)", lineHeight: "var(--body-sm-line)", color: "var(--text-muted)", textWrap: "pretty" }}>{c.description}</p>
        ) : null}
        <div style={{ marginTop: "auto", paddingTop: "var(--space-4)" }}>
          {soon ? (
            <Chip tone="plum" size="sm">Hamarosan</Chip>
          ) : (
            <Button size="sm" variant="secondary" icon="fa-solid fa-arrow-right" iconPosition="right" href={PLATFORM}>Megnyitom</Button>
          )}
        </div>
      </div>
    </Card>
  );
}

function ProgramsScreen({ go }) {
  const focus = window.useFocus();
  const online = focus === "Online fókusz";
  return (
    <>
      {online ? (
        <div style={{ background: "var(--mesh-hero)" }}>
          <Section tight className="kp-split" style={{ display: "grid", gridTemplateColumns: "1fr .9fr", gap: "var(--space-16)", alignItems: "center", paddingBottom: "var(--space-12)" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
              <SectionHeading eyebrow="Online programok" title="Otthon is elkezdheted, ma" level={2} lead="Felépített, videós programok, ugyanazzal a szemlélettel, ahogy a rendelőben dolgozom. Időpontra nem kell várnod." />
              <window.AvailabilityNote />
              <div style={{ display: "flex", gap: "var(--gap-inline)", flexWrap: "wrap" }}>
                <Button size="lg" href={PLATFORM}>Tovább a kurzusokhoz</Button>
                <Button size="lg" variant="ghost" icon="fa-brands fa-youtube" onClick={() => go && go("#/blog/videok")}>Ingyenes tartalmak a YouTube-on</Button>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--gap-inline)" }}>
              <image-slot id="course-preview-video" shape="rounded" radius="20" fit="cover" placeholder="Előzetes a programból (videó boritókép)" style={{ display: "block", width: "100%", aspectRatio: "16 / 10" }}></image-slot>
              <span style={{ fontSize: "var(--caption-size)", lineHeight: "var(--caption-line)", color: "var(--text-muted)" }}>Előzetes: így épül fel egy lecke.</span>
            </div>
          </Section>
        </div>
      ) : null}

      <Section tight>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-6)", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "var(--space-8)" }}>
          <SectionHeading eyebrow="Katalógus" title="Programok" lead="Az otthonodból is könnyedén elvégezhető, szakszerűen felépített programok." level={2} />
          <Button size="md" icon="fa-solid fa-arrow-up-right-from-square" iconPosition="right" href={PLATFORM}>Tovább az online kurzusokhoz</Button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(288px, 1fr))", gap: "var(--gap-grid)", alignItems: "stretch" }}>
          {COURSES.map((c) => <CourseCard key={c.slot} c={c} />)}
        </div>
      </Section>

      {online ? (
        <Section id="hirlevel" tight>
          <window.LeadMagnet layout="wide" />
        </Section>
      ) : null}
    </>
  );
}

Object.assign(window, { ProgramsScreen, KP_COURSES: COURSES, COURSE_PLATFORM: PLATFORM });
```

---

## data.js

```js
/* Content lifted verbatim from kirilla_physio_react_v1 (src/components/therapies/therapies.ts,
   src/components/faq/faqs.ts, src/components/opinions/{opinions,aboutMe}.ts, src/pages/qualifications.ts).
   Hungarian copy is the product — do not translate or rewrite it. */
(function(){
const therapies = [
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
const faqs = [
  {
    question: "Hol dolgozol helyileg?",
    answer: "Budapest, XII. kerület, Nagyenyed utca 15/A",
  },
  {
    question: "Visceralis / vagus / köpöly / bármelyik másik terápia előtt is kell állapotfelmérés?",
    answer: "Igen, muszáj felmérnem az egészségi állapotodat mielőtt bármilyen kezelésbe belekezdünk, hogy rád adaptálva, a lehető leghatékonyabban tudjak segíteni a problémádon, és ne alkalmazzak olyan technikákat amikkel árthatnék neked. ",
  },
  {
    question: "Honnan tudjam hogy nekem melyik kezelésre van szükségem?",
    answer: "Nem kell előre tudnod, az állapotfelmérés során - miután beszámoltál a panaszaidról és megvizsgáltalak - megbeszéljük, hogy a te eseteben mit javaslok, mi a leghatékonyabb számodra. ",
  },
  {
    question: "Hány alkalomra van szükség?/Milyen gyakran kell járni?",
    answer: "Nagyon változó, az első alkalomkor az állapotfelmérés után már fogok tudni mondani egy becslést. \n" +
      "Általánosságban a régóta fennálló panaszok gyógyításához több idő kell, míg egy frissen kialakultnál nagyobb eséllyel lesz elég egy pár kezelés.\n" +
      "A kezelések gyakoriságát is egyénileg alakítjuk ki, a gyógyulás előrehaladtával változhat (pl. kezdetben heti 1 alkalom, majd 2-3 hetente).\n",
  },
  {
    question: "Muszáj előtte MR vizsgálatra mennem?",
    answer: "Nem muszáj, mivel egy alapos vizsgálat és speciális tesztek alapján építem fel a kezelésedet, és nem az MR képedet kezelem (sokszor nincs összefüggés a panasz és az MR által kimutatott eredmények között).\n" +
      "Ha már készült, akkor hozd magaddal, ha pedig úgy látom, hogy muszáj készíteni, akkor jelzem az állapotfelmérésen. \n" +
      "Friss hasi ultrahang vizsgálatot viszont szükséges lehet készíteni bizonyos esetekben viscerális terápia előtt (pl. ciszták, vesekő) - keress fel üzenetben az állaptfelmérés előtt, ha ebben nem vagy biztos.",
  },
  {
    question: "Fájni fog a kezelés?",
    answer: "Nem minden esetben fáj, sőt, sokan kellemesnek élik meg a kezeléseket. Vannak terápiás irányzatok (pl. az FDM), amiknél várható fájdalom, de mindig az a célom, hogy ez egy elviselhető fájdalom legyen számodra, és ne egy szenvedés. A kezelés közbe végig kommunikálunk, és nyugodtan jelezheted, ha már túl sok.",
  },
  {
    question: "Mit hozzak magammal az állapotfelmérésre?",
    answer: "Olyan öltözetet, amiben kényelmesen tudsz mozogni, és meg tudom vizsgálni a panaszos testrészed (átöltözésre van lehetőség).\n" +
      "Ha vannak korábbi leleteid, vizsgálati eredményeid, akkor azok is legyenek nálad (az is jó, ha telefonról mutatod meg).",
  },
  {
    question: "Van valami otthon végezhető gyakorlat, amit csinálhatok?",
    answer: "Az esetek nagy részében már az első alkalom végén, az állapotfelmérés után javasolni fogok otthon végezhető gyakorlatokat, amiket szükség esetén írásban vagy videóban rögzítünk.",
  },
]
const opinions = [
  {
    author: "M. Marina",
    description: "Réka megmentett a műtéttől! Már majdnem bejelentkeztem műtétre a kéztő alagút szindrómámmal, de szerencsére még pont időben Réka kezei közé kerültem, és már nincs szükségem a műtétre. Már az első kezelés után sokkal jobb lett, és 1 hónap múlva mondhatni teljesen elmúlt a fájdalom és a zsibbadás az ujjaimban. Újra tudom használni a kezemet!🙏",
  },
  {
    author: "M. Ágnes",
    description: "Réka alapos állapotfelmérést követően alakítja ki alkalmazandó terápiáját. Már az első kezelését követően érezhető javulást tapasztaltam állapotomban. Kedves, odafigyelő természete, széleskörű tudása és ennek gyakorlati felhasználása figyelemre méltó."
  },
  {
    author: "B. Ivett",
    description: "Szia Réka 🤗 képzeld mára már teljesen elmúlt a nyak fájdalmam és minden irányba tudom már mozgatni. ❤️ Nagyon szépen köszönök! 🤗"
  },
  {
    author: "M. Veronika",
    description: "Szia Réka!\n" +
      "Ne haragudj a zavarásért de szerettem volna elmesélni, hogy pénteken jött meg a kezelés óta ugye először és szerintem életem legjobb menstruációja volt!!! Nagyon sokat segített szerintem a kezelés! Teljesen más érzés volt így menstruálni! Nem fájt annyira, ha picit fájt is teljesen elviselhető volt és nem volt egyáltalán hányingerem!!🥺🥰 \n" +
      "Nagyon köszönöm!!\n" +
      "Várom, hogy menjek február végén!:)",
  },
  {
    author: "M. Nóra",
    description: "Jaj Réka! Konkrétan délben vettem be utoljára gyógyszert (fél adagot), mostanra rég kiment. Megettem egy fél pizzát és még most sincs fájdalmam. Semmi. Én olyan hálás vagyok. Köszönöm🩵\n" +
      "Este még bevettem egy fájdalomcsillapítót, biztos ami biztos, de ma egyet sem és konkrétan nem fájt a 2. nap! És nincs tünetem. Sírok a boldogságtól🥰"
  },
  {
    author: "L. Viktória",
    description: "Kedves Réka, kedd óta szeretném neked leírni! Szóval kedd reggel amikor felkeltem az ágyból ég és föld volt a különbség a lábfejemben! Könnyebb volt, nem fájt vagy feszült. A bal lábfejem jobbhoz ehhez képest “nyomi” volt. Jót tett, hogy a talpamat is kezelted! Köszönöm! Azóta is jó a helyzet! 🙏"
  },
  {
    author: "Sz. Kornél",
    description: "Szia! ☺️\n" +
      "A mai kezelés igen hatékony volt még egyszer köszönöm javult végre a vállam eddig ez csak neked sikerült ☺️"
  },
  {
    author: "M. Péter",
    description: "Csak ajánlani tudom, Réka egy igazi angyal. 😇 Már néhány kezelés után érezhetően javult a testtartásom és este sem sajog a hátam."
  }
]
const aboutMeOpinions = [
  {
    author: "B. Katalin",
    description: "\"Rékát csak ajánlani tudom, nekem sokféle gerinc és mozgásszervi problémám van, amiken a kezelései sokat segítenek, nagyon profi szakember. A legszimpatikusabb benne, hogy a mai fiatalokhoz képest nagyon céltudatos, folyamatosan képezi magát. 🥰 Mindig kedves és nyugodtság árad belőle, ami a fizikai gyógyulás mellett nagyon pozitív plusz dolog nekem 🥰\"\n"
  },
  {
    author: "T. Fanni",
    description: "Rékát mindenkinek csak ajánlani tudom, nagyon profi, komolyan veszi a problémákat és mindent belead abba, hogy az összes hozzá forduló páciensének a lehető leghatásosabb, személyre szabottabb kezelést biztosítsa. Folyamatosan fejleszti magát különböző képzéseken, hogy minél szélesebb körben tudja a páciensek igényeihez igazítani a tudását. Nála garantáltan a páciensek élveznek prioritást! Nagyon kedves és türelmes, emellett mind szakmailag, mind emberileg motiváló is, aki teheti őt válassza, mert a legjobb!🙏🏻🤍"
  },
  {
    author: "K. Júlia",
    description: "Rékának egész életemben hálás leszek!🙏🙏❤️❤️ Neki köszönhető, hogy elkerültem 2 műtétet. Szerintem nagyobb tudással rendelkezik, mint némelyik orvos, profin és szakszerűen látja el a hozzá forduló pácienseket. Mindenkinek bátran merem ajánlani!😊😊"
  },
  {
    author: "G. Zsuzsanna",
    description: "Réka nagyon kedves és profi, munkája során mindig a maximumot adja. Nagyon odafigyel minden apró panaszra, sokat segített nekem is. Bármilyen problémával nyugodtan lehet hozzá fordulni, nagyon jó szívvel ajánlom😊!"
  },
  {
    author: "H. Anna",
    description: "Réka nagyon kompetensen, odafigyelően végzi a munkáját és odafigyel arra is, hogy folyamatosan képezze magát. Csak ajánlani tudom!"
  },
  {
    author: "P. Martin",
    description: "Réka igazán jó szakember, felkészült, figyelmes és segítőkész. Sokféle mozgásszervi és egyéb problémán is tud segíteni, még a stresszkezelésben is. Nekem helyretette a hónapok óta nem múló csuklófájdalmam. 😇"
  }
]
const qualifications = [
  {
    date: "2017-2021",
    description: "Pécsi Tudományegyetem Egészségtudományi kar Gyógytornász-fizioterapeuta BSc",
    highlight: true,
  },
  {
    date: "2017",
    description: "Ayurvédikus marma masszázs",
  },
  {
    date: "2020",
    description: "Sportsérülések komplex rehabilitációja",
  },
  {
    date: "2021",
    description: "SMR (self myofascial release) a sport- és mozgásszervi rehabilitációban",
  },
  {
    date: "2021",
    description: "Kinesiology-taping / Sporttaping",
  },
  {
    date: "2021",
    description: "Jikiden Reiki",
  },
  {
    date: "2021",
    description: "Dorn módszer és Breuss masszázs",
  },
  {
    date: "2021",
    description: "Dorn baba és gyerek kezelés",
  },
  {
    date: "2022",
    description: "Pranayama Workshop",
  },
  {
    date: "2022",
    description: "Hegkezelés – nyirokelvezetés és myofasciális technikák",
  },
  {
    date: "2022",
    description: "Mechanikai Diagnózis és Terápia - McKenzie A kurzus (lumbális gerinc)",
  },
  {
    date: "2022",
    description: "Neurodinamika, A perifériás neurogén panaszok funkcióvizsgálata, kezelése és tape-elése, „Az idegrendszer mobilizációja”",
  },
  {
    date: "2022",
    description: "Szegmentális stabilizációs tréning az ágyéki gerinc-medence komplex rehabilitációjában",
  },
  {
    date: "2022",
    description: "FDM 1, 2, 3 (Fascia Disztorziós Modell)",
  },
  {
    date: "2022",
    description: "Neuro-mozgáskorrekció alaptanfolyam",
  },
  {
    date: "2022",
    description: "Mulligan manuálterápia 1, 2",
  },
  {
    date: "2022",
    description: "A nyaki gerinc vizsgálata és kezelése különös tekintettel a szegmentális instabilitásra",
  },
  {
    date: "2023",
    description: "Nervus Vagus terápia",
  },
  {
    date: "2023",
    description: "Viscerális terápia (máj-epe, méh-prostata, diaphragmák, gyomor-nyelőcső, belek, tüdő-lép, vese-húgyhólyag, hasnyálmirigy, mellékvese)",
  },
  {
    date: "2023",
    description: "Oriolus Nyirok Koncepció",
  },
  {
    date: "2024",
    description: "Silva-féle agykontroll",
  },
  {
    date: "2024",
    description: "Dr Joe Dispenza progressive retreat",
  },
  {
    date: "2024",
    description: "Neuro-mozgáskorrekció Haladó 1.",
  },
  {
    date: "2025",
    description: "CranioFDM (fejfájások terápiája)",
  },
  {
    date: "2025",
    description: "Állkapocs-ízületi terápia",
  },
]
window.KP_DATA = { therapies, faqs, treatmentsOpinions: opinions, landingOpinions: aboutMeOpinions, qualifications };
})();
```

---

## responsive.css

```css
/* Page-level layout collapse for the website kit. Screens use inline styles, so the
   mobile overrides need !important. Classes are applied on the grid containers. */
@media (max-width:900px){
.kp-split{grid-template-columns:1fr!important;gap:var(--space-8)!important}
.kp-cols-3,.kp-cols-4{grid-template-columns:repeat(2,1fr)!important}
.kp-about-sticky{position:static!important;top:auto!important}
}
@media (max-width:820px){
.kp-hero-badges{position:static!important;inset:auto!important;margin-top:var(--space-4)!important;max-width:100%!important}
}
@media (max-width:760px){
.kp-dashlist{column-count:1!important}
}
@media (max-width:980px){
/* The jump nav has to stay visible on narrow screens too, so it becomes a sticky
   glass bar under the header instead of a side rail. */
.kp-blog-shell{grid-template-columns:1fr!important;gap:var(--space-6)!important}
.kp-blog-rail{position:sticky!important;top:72px!important;z-index:5;flex-direction:row!important;overflow-x:auto!important;gap:2px!important;padding:6px;border-radius:var(--radius-pill);background:var(--surface-glass);backdrop-filter:var(--blur-glass);-webkit-backdrop-filter:var(--blur-glass);box-shadow:var(--shadow-ring-hairline),var(--shadow-sm)}
.kp-blog-rail .kp-blog-rail-item{flex:1 0 auto;min-height:48px;padding:10px 14px!important;border-radius:var(--radius-pill)!important}
.kp-blog-rail-hint{display:none!important}
.kp-blog-posts{grid-template-columns:1fr!important}
.kp-story-shell{grid-template-columns:1fr!important}
}
@media (max-width:700px){
/* The three full labels do not fit a phone-width row — short ones do. */
.kp-blog-rail-label{display:none!important}
.kp-blog-rail-short{display:inline!important}
.kp-blog-rail .kp-blog-rail-item{flex:1 1 0;justify-content:center;gap:10px!important}
}
@media (max-width:700px){
.kp-cols-2{grid-template-columns:1fr!important}
}
@media (max-width:620px){
.kp-cols-3,.kp-cols-4{grid-template-columns:1fr!important}
}
```

---

## theme-dark.css

```css
/* Dark theme for the website UI kit — activated by the Tweaks "Dark mode" toggle
   (html[data-theme="dark"]). It remaps the token layer only: light surface steps go dark,
   text-carrying steps go light, and the deep brand surfaces (footer band, gradient) stay deep,
   so every design-system component follows without component-level edits. */

html[data-theme="dark"]{
/* Ramps — light steps become dark grounds, text steps become light */
--plum-700:#E4D2D7;--plum-600:#C3A0A7;--plum-300:#4B2F38;--plum-200:#3B242C;--plum-100:#2E1C23;--plum-50:#281A20;
--rose-700:#EDBCD6;--rose-600:#E7B0CC;--rose-400:#B0648F;--rose-300:#8A4A6B;--rose-200:#4A2536;--rose-100:#331B27;
--blush-400:#5A3540;--blush-300:#40252E;--blush-200:#2E1B22;--blush-100:#221419;
--lilac-700:#DCCDE3;--lilac-600:#C6B2CF;--lilac-400:#7A6088;--lilac-300:#3D3046;--lilac-200:#2E2434;--lilac-100:#251E2B;
--mist-peach:#2C1C1B;--mist-pink:#2E1A24;--mist-lilac:#241E2C;--mist-cream:#241A1B;
--white:#2C1B22;

/* Text */
--text-strong:#F7EAEE;--text-body:#E8D6DC;--text-muted:#C9AEB6;--text-subtle:#C9AEB6;
--text-accent:#EDBCD6;--text-accent-alt:#DCCDE3;
--text-on-accent:#FFFFFF;--text-on-accent-muted:#F6E4EC;--text-link:#DCCDE3;--text-link-hover:#EDBCD6;
/* Surfaces */
--surface-page:#1E1216;--surface-card:#2C1B22;--surface-raised:#33202A;--surface-sunken:#180E12;
--surface-tint-rose:#3A222B;--surface-tint-lilac:#2A2231;--surface-tint-cream:#2A1A20;
--surface-accent:#7A3358;--surface-accent-deep:#3A2028;--surface-invert:#3A2028;
--surface-glass:rgba(34,20,25,.66);
/* Interactive */
--accent:#8E3A66;--accent-hover:#A2477A;--accent-press:#B4568A;
--accent-alt:#8E74A0;--accent-alt-hover:#A084AE;--accent-alt-press:#BCA5C6;
--accent-soft:#3E2530;--accent-soft-hover:#4C2E3B;
/* Lines */
--line-hairline:rgba(237,212,226,.14);--line-soft:#3B242C;--line-strong:#4B2F38;--line-on-accent:rgba(255,255,255,.34);
--focus-ring:#BCA5C6;
/* Feedback */
--feedback-success:#5EC9A4;--feedback-success-bg:#17342C;
--feedback-error:#E88396;--feedback-error-bg:#3A1E23;
--feedback-warning:#E7B472;--feedback-warning-bg:#38271A;
/* Gradients and mesh */
--gradient-brand:linear-gradient(135deg,#8E3A66 0%,#54232D 100%);
--gradient-brand-soft:linear-gradient(135deg,#3E2530 0%,#2A1A20 100%);
--gradient-brand-deep:linear-gradient(135deg,#2A1620 0%,#160C10 100%);
--gradient-rule:linear-gradient(90deg,rgba(237,188,214,0) 0%,#EDBCD6 32%,#8A4A6B 74%,rgba(138,74,107,0) 100%);
--gradient-text:linear-gradient(100deg,#EDBCD6 0%,#DCCDE3 100%);
--mesh-page:radial-gradient(58% 46% at 12% 8%,#3A222B 0%,rgba(58,34,43,0) 62%),radial-gradient(52% 44% at 88% 4%,#2A2231 0%,rgba(42,34,49,0) 60%),radial-gradient(64% 52% at 74% 88%,#331B27 0%,rgba(51,27,39,0) 66%),linear-gradient(180deg,#1E1216 0%,#160C10 100%);
--mesh-hero:radial-gradient(46% 60% at 18% 22%,#432631 0%,rgba(67,38,49,0) 64%),radial-gradient(44% 54% at 82% 16%,#2F2439 0%,rgba(47,36,57,0) 60%),radial-gradient(58% 48% at 60% 96%,#5A3540 0%,rgba(90,53,64,0) 68%),linear-gradient(180deg,#221419 0%,#180E12 100%);
--mesh-band:radial-gradient(50% 70% at 8% 12%,rgba(237,197,195,.16) 0%,rgba(237,197,195,0) 60%),radial-gradient(60% 80% at 92% 90%,rgba(0,0,0,.45) 0%,rgba(0,0,0,0) 64%),linear-gradient(135deg,#5F2848 0%,#3A2028 100%);
--mesh-card:radial-gradient(80% 100% at 0% 0%,#3A222B 0%,rgba(58,34,43,0) 70%),radial-gradient(80% 100% at 100% 100%,#2A2231 0%,rgba(42,34,49,0) 70%),#2C1B22;
/* Elevation — deeper, since plum tints don't read on dark grounds */
--shadow-xs:0 1px 2px rgba(0,0,0,.30);
--shadow-sm:0 2px 10px rgba(0,0,0,.32);
--shadow-md:0 10px 28px rgba(0,0,0,.40);
--shadow-lg:0 22px 56px rgba(0,0,0,.46);
--shadow-xl:0 36px 88px rgba(0,0,0,.52);
--shadow-rose:0 14px 34px rgba(0,0,0,.44);
--shadow-lilac:0 14px 34px rgba(0,0,0,.44);
--shadow-ring-hairline:inset 0 0 0 1px rgba(237,212,226,.12);
--shadow-ring-light:inset 0 0 0 1px rgba(255,255,255,.10);
}
```
