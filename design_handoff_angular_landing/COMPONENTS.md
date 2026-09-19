# Design system component sources

React (JSX) implementations and their TypeScript prop contracts. Port each to a standalone Angular component. The `.d.ts` is the API contract — every prop maps to an `input()`; every `on*` callback maps to an `output()`.

---

## brand/

### Wordmark

**Prop contract** (`Wordmark.d.ts`)

```ts
import * as React from "react";

/**
 * The brand lockup. `full` pairs the floral-spine mark with the "Kirilla Physio" name set in type
 * plus the "gyógytornász‑fizioterapeuta" line beneath it (for headers);
 * `lockup` / `lockupTagline` render the supplied artwork as-is.
 */
export interface WordmarkProps {
  variant?: "full" | "mark" | "lockup" | "lockupTagline";
  size?: "sm" | "md" | "lg";
  /** onAccent flips the type colours for gradient bands and the plum footer. */
  tone?: "default" | "onAccent";
  href?: string;
  /** Show the leaf mark next to the name in the "full" variant. Default true — false on deep surfaces where the mark disappears. */
  mark?: boolean;
  /** Path to the design system's assets/ folder from the consuming page. Default "assets/". */
  assetBase?: string;
  /** `full` variant only: show the "gyógytornász‑fizioterapeuta" line under the name. Default true. */
  subtitle?: boolean;
  style?: React.CSSProperties;
}

export declare function Wordmark(props: WordmarkProps): JSX.Element;
```

**Design intent**

The real brand logo: a watercolour floral-spine mark with a serif "Kirilla Physio" wordmark.

```jsx
<Wordmark assetBase="../../assets/" />                     /* header: mark + name in type */
<Wordmark variant="mark" assetBase="../../assets/" />      /* mark only, transparent */
<Wordmark variant="lockup" assetBase="../../assets/" />    /* supplied lockup artwork */
<Wordmark variant="lockupTagline" />                       /* + "Legfőbb kincsünk az egészségünk." — print */
<Wordmark tone="onAccent" mark={false} />                  /* plum footer / gradient band — text only, the mark has no contrast there */
```

`assetBase` is the path to `assets/` from the page using it — pass `"../../assets/"` from a UI kit or card. The lockups are on white, not transparent: keep them on white/plum-50, or use `mix-blend-mode: multiply`. Never recolour or stretch the mark. There is no knockout version yet, so on dark grounds use the type form (`tone="onAccent"`).

**Implementation** (`Wordmark.jsx`)

```jsx
import React from "react";

const MARK = "brand-mark.png";
const LOCKUP = "brand-lockup.png";
const LOCKUP_TAGLINE = "brand-lockup-tagline.png";

export function Wordmark({ variant = "full", size = "md", tone = "default", href = "#/", assetBase = "assets/", subtitle = true, mark = true, style }) {
  const scale = size === "lg" ? 1.35 : size === "sm" ? 0.8 : 1;
  const onAccent = tone === "onAccent";
  const nameColor = onAccent ? "var(--text-on-accent)" : "var(--plum-700)";
  const src = (file) => assetBase + file;

  if (variant === "mark") {
    return (
      <a href={href} style={{ display: "inline-flex", ...style }}>
        <img src={src(MARK)} alt="KirillaPhysio" style={{ height: 52 * scale + "px", width: "auto", objectFit: "contain" }} />
      </a>
    );
  }

  if (variant === "lockup" || variant === "lockupTagline") {
    return (
      <a href={href} style={{ display: "inline-flex", ...style }}>
        <img
          src={src(variant === "lockup" ? LOCKUP : LOCKUP_TAGLINE)}
          alt={variant === "lockup" ? "Kirilla Physio" : "Kirilla Physio — Legfőbb kincsünk az egészségünk."}
          style={{ height: (variant === "lockup" ? 78 : 96) * scale + "px", width: "auto", objectFit: "contain" }}
        />
      </a>
    );
  }

  return (
    <a href={href} style={{ display: "inline-flex", alignItems: "center", gap: 10 * scale + "px", textDecoration: "none", flex: "0 0 auto", whiteSpace: "nowrap", ...style }}>
      {mark && <img src={src(MARK)} alt="" aria-hidden="true" style={{ height: 52 * scale + "px", width: "auto", objectFit: "contain", flex: "0 0 auto" }} />}
      <span style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: 21 * scale + "px", fontWeight: "var(--weight-semibold)", letterSpacing: -0.4 * scale + "px", color: nameColor, lineHeight: 1.15 }}>
          Kirilla Physio
        </span>
        {subtitle && <span className="kp-wm-sub" style={{ fontSize: 11.5 * scale + "px", letterSpacing: ".2px", color: onAccent ? "var(--text-on-accent-muted)" : "var(--text-muted)" }}>
          gyógytornász‑fizioterapeuta
        </span>}
        <style>{`@media(max-width:600px){.kp-wm-sub{font-size:12.5px!important}}`}</style>
      </span>
    </a>
  );
}
```

---

## core/

### Button

**Prop contract** (`Button.d.ts`)

```ts
import * as React from "react";

/**
 * The brand's only button. Always a pill; the primary variant is the rose→lilac gradient.
 */
export interface ButtonProps {
  children?: React.ReactNode;
  /** primary = gradient fill (one per viewport). onAccent* variants sit on gradient bands. */
  variant?: "primary" | "secondary" | "lilac" | "outline" | "ghost" | "onAccent" | "onAccentOutline";
  size?: "lg" | "md" | "sm";
  /** Font Awesome 6 class string, e.g. "fa-solid fa-arrow-up-right-from-square". */
  icon?: string;
  iconPosition?: "left" | "right";
  /** Renders an <a> instead of a <button>. */
  href?: string;
  onClick?: (event: React.MouseEvent) => void;
  disabled?: boolean;
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
  /** Required when the button has no text label. */
  ariaLabel?: string;
  style?: React.CSSProperties;
}

export declare function Button(props: ButtonProps): JSX.Element;
```

**Design intent**

Every call to action on a KirillaPhysio surface — always a pill, never a rounded rectangle.

```jsx
<Button variant="primary" size="lg" href="https://kirillareka.salonic.hu/">Időpontot foglalok</Button>
<Button variant="secondary" icon="fa-solid fa-arrow-up-right-from-square">Részletek</Button>
<Button variant="onAccentOutline">Kapcsolat</Button>
```

Variants: `primary` (rose→lilac gradient, coloured lift — **one per viewport**), `secondary` (rose-200 tint), `lilac` (lilac-200 tint, for informational actions), `outline`, `ghost`, and `onAccent` / `onAccentOutline` for use inside a gradient band. Sizes `lg` / `md` / `sm`. Hover darkens one step and lifts 2px; press sinks 1px and scales to .985. CTA copy is first person — "Időpontot foglalok", not "Foglalj időpontot".

**Implementation** (`Button.jsx`)

```jsx
import React from "react";

const SIZES = {
  lg: { fontSize: "17px", padding: "16px 32px", gap: "10px" },
  md: { fontSize: "15.5px", padding: "13px 26px", gap: "10px" },
  sm: { fontSize: "14px", padding: "9px 18px", gap: "8px" },
};

const VARIANTS = {
  primary: {
    rest: { background: "var(--gradient-brand)", color: "var(--text-on-accent)", boxShadow: "var(--shadow-rose)" },
    hover: { background: "linear-gradient(135deg,#5F2848 0%,#451D25 100%)", boxShadow: "0 20px 42px rgba(84,35,45,.34)" },
    press: { background: "var(--gradient-brand-deep)", boxShadow: "var(--shadow-xs)" },
  },
  secondary: {
    rest: { background: "var(--accent-soft)", color: "var(--rose-700)", boxShadow: "none" },
    hover: { background: "var(--accent-soft-hover)" },
    press: { background: "var(--rose-700)", color: "var(--white)" },
  },
  lilac: {
    rest: { background: "var(--lilac-200)", color: "var(--lilac-700)", boxShadow: "none" },
    hover: { background: "var(--lilac-300)" },
    press: { background: "var(--lilac-400)", color: "var(--white)" },
  },
  outline: {
    rest: { background: "transparent", color: "var(--rose-700)", boxShadow: "inset 0 0 0 1.5px var(--rose-400)" },
    hover: { background: "var(--rose-100)", boxShadow: "inset 0 0 0 1.5px var(--rose-500)" },
    press: { background: "var(--rose-200)" },
  },
  ghost: {
    rest: { background: "transparent", color: "var(--text-body)", boxShadow: "none" },
    hover: { background: "var(--plum-100)" },
    press: { background: "var(--plum-200)" },
  },
  onAccent: {
    rest: { background: "var(--white)", color: "var(--rose-700)", boxShadow: "var(--shadow-md)" },
    hover: { background: "var(--rose-100)" },
    press: { background: "var(--rose-200)" },
  },
  onAccentOutline: {
    rest: { background: "transparent", color: "var(--text-on-accent)", boxShadow: "inset 0 0 0 1.5px var(--line-on-accent)" },
    hover: { background: "rgba(255,255,255,.14)", boxShadow: "inset 0 0 0 1.5px rgba(255,255,255,.7)" },
    press: { background: "rgba(255,255,255,.22)" },
  },
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  href,
  onClick,
  disabled = false,
  fullWidth = false,
  type = "button",
  ariaLabel,
  style,
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const v = VARIANTS[variant] || VARIANTS.primary;
  const s = SIZES[size] || SIZES.md;
  const lifted = hover && !press && !disabled;

  const composed = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: fullWidth ? "100%" : "auto",
    gap: s.gap,
    padding: s.padding,
    fontFamily: "var(--font-body)",
    fontSize: s.fontSize,
    fontWeight: "var(--weight-bold)",
    lineHeight: 1,
    letterSpacing: ".1px",
    border: "none",
    borderRadius: "var(--radius-pill)",
    cursor: disabled ? "not-allowed" : "pointer",
    textDecoration: "none",
    whiteSpace: "nowrap",
    opacity: disabled ? 0.45 : 1,
    transition: "var(--transition-control)",
    transform: press ? "var(--lift-press)" : lifted ? "var(--lift-hover)" : "none",
    ...v.rest,
    ...(hover && !disabled ? v.hover : null),
    ...(press && !disabled ? v.press : null),
    ...style,
  };

  const glyph = icon ? <i className={icon} aria-hidden="true" style={{ fontSize: "1em" }} /> : null;
  const inner = (
    <>
      <style>{`@media(max-width:600px){.kp-btn-sm{min-height:40px}}`}</style>
      {iconPosition === "left" ? glyph : null}
      {children ? <span>{children}</span> : null}
      {iconPosition === "right" ? glyph : null}
    </>
  );

  const handlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => { setHover(false); setPress(false); },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
  };

  if (href && !disabled) {
    return (
      <a href={href} className={size === "sm" ? "kp-btn-sm" : undefined} style={composed} aria-label={ariaLabel} onClick={onClick} {...handlers}>
        {inner}
      </a>
    );
  }
  return (
    <button type={type} className={size === "sm" ? "kp-btn-sm" : undefined} style={composed} disabled={disabled} aria-label={ariaLabel} onClick={onClick} {...handlers}>
      {inner}
    </button>
  );
}
```

### Card

**Prop contract** (`Card.d.ts`)

```ts
import * as React from "react";

/**
 * The system's container. 28px radius, plum-tinted shadow, hairline drawn as an inset shadow —
 * never a real border, which reads hard against the pastel mesh.
 */
export interface CardProps {
  children?: React.ReactNode;
  surface?: "plain" | "mesh" | "tintRose" | "tintLilac" | "tintCream" | "filled" | "band" | "invert";
  padding?: "none" | "sm" | "md" | "lg";
  radius?: "md" | "lg" | "xl" | "band";
  /** Adds the hover lift + shadow step. Use for cards that navigate. */
  interactive?: boolean;
  href?: string;
  onClick?: (event: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

export declare function Card(props: CardProps): JSX.Element;
```

**Design intent**

Every boxed surface — feature tiles, price blocks, testimonial cards, closing CTA bands.

```jsx
<Card surface="mesh" padding="lg" interactive href="#/individual-treatments">…</Card>
<Card surface="band" radius="band" padding="lg">…</Card>
```

Surfaces: `plain` (white + shadow), `mesh` (corner wash, for cards on white), `tintRose` / `tintLilac` / `tintCream` (flat tint, hairline only, no shadow), `filled` (gradient + white type), `band` (saturated mesh band for closing CTAs), `invert` (plum-800 footer surface). Never put a coloured left border on a card, and never wrap a product screenshot in one.

**Implementation** (`Card.jsx`)

```jsx
import React from "react";

const SURFACES = {
  plain: { background: "var(--surface-card)", color: "var(--text-body)", boxShadow: "var(--shadow-md), var(--shadow-ring-hairline)" },
  mesh: { background: "var(--mesh-card)", color: "var(--text-body)", boxShadow: "var(--shadow-md), var(--shadow-ring-hairline)" },
  tintRose: { background: "var(--surface-tint-rose)", color: "var(--text-body)", boxShadow: "var(--shadow-ring-hairline)" },
  tintLilac: { background: "var(--surface-tint-lilac)", color: "var(--text-body)", boxShadow: "var(--shadow-ring-hairline)" },
  tintCream: { background: "var(--surface-tint-cream)", color: "var(--text-body)", boxShadow: "var(--shadow-ring-hairline)" },
  filled: { background: "var(--gradient-brand)", color: "var(--text-on-accent)", boxShadow: "var(--shadow-rose)" },
  band: { background: "var(--mesh-band)", color: "var(--text-on-accent)", boxShadow: "var(--shadow-lg)" },
  invert: { background: "var(--surface-invert)", color: "var(--text-on-accent)", boxShadow: "var(--shadow-lg)" },
};

const PADS = { none: "0", sm: "18px", md: "var(--pad-card)", lg: "var(--pad-card-lg)" };
const RADII = { md: "var(--radius-lg)", lg: "var(--radius-card)", xl: "var(--radius-card-lg)", band: "var(--radius-band)" };

export function Card({ children, surface = "plain", padding = "md", radius = "lg", interactive = false, href, onClick, className, style }) {
  const [hover, setHover] = React.useState(false);
  const s = SURFACES[surface] || SURFACES.plain;
  const active = interactive && hover;

  const composed = {
    display: "block",
    position: "relative",
    padding: PADS[padding] || PADS.md,
    borderRadius: RADII[radius] || RADII.lg,
    background: s.background,
    color: s.color,
    boxShadow: active ? "var(--shadow-lg), var(--shadow-ring-hairline)" : s.boxShadow,
    transform: active ? "var(--lift-hover)" : "none",
    transition: "box-shadow var(--dur-base) var(--ease-soft), transform var(--dur-base) var(--ease-soft)",
    textDecoration: "none",
    cursor: interactive ? "pointer" : "default",
    overflow: "hidden",
    ...style,
  };

  const handlers = interactive ? { onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false) } : {};
  const Tag = href ? "a" : "div";
  return (
    <Tag href={href} className={className} style={composed} onClick={onClick} {...handlers}>
      {children}
    </Tag>
  );
}
```

### Chip

**Prop contract** (`Chip.d.ts`)

```ts
import * as React from "react";

/** A small tinted pill for metadata — duration, category, status. Not interactive. */
export interface ChipProps {
  children?: React.ReactNode;
  tone?: "rose" | "lilac" | "plum" | "success" | "error" | "gradient" | "onAccent";
  /** Font Awesome 6 class string. */
  icon?: string;
  size?: "md" | "sm";
  style?: React.CSSProperties;
}

export declare function Chip(props: ChipProps): JSX.Element;
```

**Design intent**

Static metadata pill — session length, therapy category, price note. Never a button; if it is clickable, use `Button size="sm"`.

```jsx
<Chip icon="fa-solid fa-clock">60 perc</Chip>
<Chip tone="lilac">Manuálterápia</Chip>
<Chip tone="onAccent">Budapest, XII.</Chip>
```

Tones `rose` `lilac` `plum` `success` `error` `gradient` `onAccent`. Use `onAccent` inside a gradient band.

**Implementation** (`Chip.jsx`)

```jsx
import React from "react";

const TONES = {
  rose: { background: "var(--rose-100)", color: "var(--rose-700)" },
  lilac: { background: "var(--lilac-100)", color: "var(--lilac-700)" },
  plum: { background: "var(--plum-100)", color: "var(--plum-700)" },
  success: { background: "var(--feedback-success-bg)", color: "var(--feedback-success)" },
  error: { background: "var(--feedback-error-bg)", color: "var(--feedback-error)" },
  gradient: { background: "var(--gradient-brand)", color: "var(--text-on-accent)" },
  onAccent: { background: "rgba(255,255,255,.18)", color: "var(--text-on-accent)" },
};

export function Chip({ children, tone = "rose", icon, size = "md", style }) {
  const t = TONES[tone] || TONES.rose;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--gap-inline)",
        padding: size === "sm" ? "5px 12px" : "8px 16px",
        borderRadius: "var(--radius-pill)",
        fontSize: size === "sm" ? "12.5px" : "14px",
        fontWeight: "var(--weight-semibold)",
        lineHeight: 1.2,
        background: t.background,
        color: t.color,
        ...style,
      }}
    >
      {icon ? <i className={icon} aria-hidden="true" style={{ fontSize: ".95em" }} /> : null}
      {children}
    </span>
  );
}
```

### Eyebrow

**Prop contract** (`Eyebrow.d.ts`)

```ts
import * as React from "react";

/** The uppercase micro-label above a section heading. The only uppercase type in the system. */
export interface EyebrowProps {
  children?: React.ReactNode;
  tone?: "rose" | "lilac" | "plum" | "onAccent";
  align?: "left" | "center" | "right";
  style?: React.CSSProperties;
}

export declare function Eyebrow(props: EyebrowProps): JSX.Element;
```

**Design intent**

The uppercase micro-label that sits above a section heading or card title.

```jsx
<Eyebrow>Terápiák</Eyebrow>
<Eyebrow tone="onAccent" align="center">Időpont foglalás</Eyebrow>
```

11.5px / 700 / +1.3px tracking. One or two words, no punctuation, no emoji. This is the only place uppercase is allowed.

**Implementation** (`Eyebrow.jsx`)

```jsx
import React from "react";

const TONES = { rose: "var(--text-accent)", lilac: "var(--text-accent-alt)", plum: "var(--text-muted)", onAccent: "var(--text-on-accent-muted)" };

export function Eyebrow({ children, tone = "rose", align = "left", style }) {
  return (
    <div
      style={{
        fontFamily: "var(--font-body)",
        fontSize: "var(--eyebrow-size)",
        lineHeight: "var(--eyebrow-line)",
        letterSpacing: "var(--eyebrow-track)",
        fontWeight: "var(--eyebrow-weight)",
        textTransform: "uppercase",
        color: TONES[tone] || TONES.rose,
        textAlign: align,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
```

### GradientText

**Prop contract** (`GradientText.d.ts`)

```ts
import * as React from "react";

/** Clips text in the rose→lilac gradient. The redesign's headline device — use sparingly. */
export interface GradientTextProps {
  children?: React.ReactNode;
  fill?: "brand" | "soft" | "deep";
  style?: React.CSSProperties;
}

export declare function GradientText(props: GradientTextProps): JSX.Element;
```

**Design intent**

Clips a word or short phrase in the brand gradient. Prices, stats, and at most one headline per page.

```jsx
<h1>Üdvözöllek a <GradientText>weboldalamon</GradientText>!</h1>
<GradientText style={{fontSize:'var(--numeral-size)',fontWeight:700}}>20.000 Ft</GradientText>
```

Only at 19px and up — below that the gradient reads as muddy grey. Never on body copy, never on a coloured background.

**Implementation** (`GradientText.jsx`)

```jsx
import React from "react";

const FILLS = {
  brand: "var(--gradient-text)",
  soft: "var(--gradient-brand-soft)",
  deep: "var(--gradient-brand-deep)",
};

export function GradientText({ children, fill = "brand", style }) {
  return (
    <span
      style={{
        backgroundImage: FILLS[fill] || FILLS.brand,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        display: "inline",
        ...style,
      }}
    >
      {children}
    </span>
  );
}
```

### IconButton

**Prop contract** (`IconButton.d.ts`)

```ts
import * as React from "react";

/** A circular icon-only control. Always carries an ariaLabel, in Hungarian. */
export interface IconButtonProps {
  /** Font Awesome 6 class string, e.g. "fa-brands fa-instagram". */
  icon: string;
  /** Hungarian accessible label — required, the control has no visible text. */
  ariaLabel: string;
  variant?: "solid" | "soft" | "lilac" | "glass" | "plain";
  size?: "lg" | "md" | "sm";
  href?: string;
  onClick?: (event: React.MouseEvent) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export declare function IconButton(props: IconButtonProps): JSX.Element;
```

**Design intent**

A circular icon-only control — social links, carousel arrows, back-to-top, the mobile menu toggle.

```jsx
<IconButton icon="fa-brands fa-instagram" ariaLabel="Ide kattintva tudod felkeresni az Instagram profilomat" href="https://www.instagram.com/kirilla_physio/" />
<IconButton icon="fa-solid fa-chevron-up" ariaLabel="Vissza a lap tetejére" variant="glass" size="lg" />
```

Variants `solid` (gradient), `soft`, `lilac`, `glass` (translucent + blur, for controls floating over the mesh) and `plain`. Sizes 56 / 44 / 36px — never smaller, 44px is the touch minimum.

**Implementation** (`IconButton.jsx`)

```jsx
import React from "react";

const SIZES = { lg: 56, md: 44, sm: 36 };
const FONT = { lg: "20px", md: "16px", sm: "13px" };

const VARIANTS = {
  solid: { background: "var(--gradient-brand)", color: "var(--text-on-accent)", boxShadow: "var(--shadow-rose)", hover: "0 18px 38px rgba(226,127,166,.34)" },
  soft: { background: "var(--accent-soft)", color: "var(--rose-700)", boxShadow: "none", hover: "var(--shadow-sm)" },
  lilac: { background: "var(--lilac-200)", color: "var(--lilac-700)", boxShadow: "none", hover: "var(--shadow-sm)" },
  glass: { background: "var(--surface-glass)", color: "var(--plum-600)", boxShadow: "var(--shadow-md)", hover: "var(--shadow-lg)", backdropFilter: "var(--blur-glass)" },
  plain: { background: "transparent", color: "var(--text-muted)", boxShadow: "none", hover: "none" },
};

export function IconButton({ icon, ariaLabel, variant = "soft", size = "md", href, onClick, disabled = false, style }) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const v = VARIANTS[variant] || VARIANTS.soft;
  const d = SIZES[size] || SIZES.md;

  const composed = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: d + "px",
    height: d + "px",
    border: "none",
    borderRadius: "var(--radius-circle)",
    background: v.background,
    color: v.color,
    boxShadow: press ? "var(--shadow-xs)" : hover ? v.hover : v.boxShadow,
    backdropFilter: v.backdropFilter,
    fontSize: FONT[size] || FONT.md,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.45 : 1,
    transition: "var(--transition-control)",
    transform: press ? "var(--lift-press)" : hover && !disabled ? "var(--lift-hover)" : "none",
    ...style,
  };

  const handlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => { setHover(false); setPress(false); },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
  };
  const glyph = <i className={icon} aria-hidden="true" />;
  const cls = size === "sm" ? "kp-iconbtn-sm" : undefined;
  const bump = <style>{`@media(max-width:600px){.kp-iconbtn-sm{width:42px!important;height:42px!important}}`}</style>;

  if (href && !disabled) {
    return <a href={href} aria-label={ariaLabel} className={cls} style={composed} onClick={onClick} {...handlers}>{bump}{glyph}</a>;
  }
  return <button type="button" aria-label={ariaLabel} className={cls} disabled={disabled} style={composed} onClick={onClick} {...handlers}>{bump}{glyph}</button>;
}
```

### SectionHeading

**Prop contract** (`SectionHeading.d.ts`)

```ts
import * as React from "react";

/** Eyebrow + display heading + lead paragraph, as one block with the system's stack rhythm. */
export interface SectionHeadingProps {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  /** Body-lg lead line under the heading. */
  lead?: React.ReactNode;
  /** 1–3 map to the display tiers, 4 to heading-1. Sizing only — set `as` for the tag. */
  level?: 1 | 2 | 3 | 4;
  /** Heading tag. Defaults to h2; pass "h1" when this heading is the page title. */
  as?: "h1" | "h2" | "h3";
  align?: "left" | "center";
  /** onAccent flips the colours for use inside a gradient band. */
  tone?: "default" | "onAccent";
  /** Clips the title in the rose→lilac gradient. Use once per page at most. */
  gradientTitle?: boolean;
  maxWidth?: string;
  style?: React.CSSProperties;
}

export declare function SectionHeading(props: SectionHeadingProps): JSX.Element;
```

**Design intent**

Opens every section. Keeps the eyebrow / heading / lead rhythm consistent so sections don't drift.

```jsx
<SectionHeading eyebrow="Terápiák" title="Miben tudok segíteni?" level={2}
  lead="A hagyományos gyógytornán túl számos egyéb terápiás irányt elsajátítottam." />
<SectionHeading tone="onAccent" align="center" title="Kezdjük egy állapotfelméréssel" />
```

Headings are sentences, usually questions, always sentence case. `gradientTitle` clips the title in the brand gradient — at most once per page.

**Implementation** (`SectionHeading.jsx`)

```jsx
import React from "react";
import { Eyebrow } from "./Eyebrow.jsx";
import { GradientText } from "./GradientText.jsx";

const LEVELS = {
  1: { fontSize: "var(--display-1-size)", lineHeight: "var(--display-1-line)", letterSpacing: "var(--display-1-track)", fontWeight: "var(--display-1-weight)" },
  2: { fontSize: "var(--display-2-size)", lineHeight: "var(--display-2-line)", letterSpacing: "var(--display-2-track)", fontWeight: "var(--display-2-weight)" },
  3: { fontSize: "var(--display-3-size)", lineHeight: "var(--display-3-line)", letterSpacing: "var(--display-3-track)", fontWeight: "var(--display-3-weight)" },
  4: { fontSize: "var(--heading-1-size)", lineHeight: "var(--heading-1-line)", letterSpacing: "var(--heading-1-track)", fontWeight: "var(--heading-1-weight)" },
};

export function SectionHeading({ eyebrow, title, lead, level = 2, as, align = "left", tone = "default", gradientTitle = false, maxWidth = "680px", style }) {
  const onAccent = tone === "onAccent";
  const Tag = as || "h2";
  return (
    <header
      style={{
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
        gap: "var(--gap-stack)",
        textAlign: align,
        alignItems: align === "center" ? "center" : "flex-start",
        ...style,
      }}
    >
      {eyebrow ? <Eyebrow tone={onAccent ? "onAccent" : "rose"}>{eyebrow}</Eyebrow> : null}
      <Tag
        style={{
          fontFamily: "var(--font-display)",
          color: onAccent ? "var(--text-on-accent)" : "var(--text-strong)",
          maxWidth,
          minWidth: 0,
          ...LEVELS[level],
        }}
      >
        {gradientTitle && !onAccent ? <GradientText>{title}</GradientText> : title}
      </Tag>
      {lead ? (
        <p
          style={{
            fontSize: "var(--body-lg-size)",
            lineHeight: "var(--body-lg-line)",
            letterSpacing: "var(--body-lg-track)",
            color: onAccent ? "var(--text-on-accent-muted)" : "var(--text-muted)",
            maxWidth,
          }}
        >
          {lead}
        </p>
      ) : null}
    </header>
  );
}
```

---

## content/

### BenefitList

**Prop contract** (`BenefitList.d.ts`)

```ts
import * as React from "react";

/** The "Miért válassz engem?" list — a check glyph in a soft circle beside each line. */
export interface BenefitListProps {
  items: React.ReactNode[];
  /** Font Awesome 6 class string; defaults to the brand's fa-check. */
  icon?: string;
  tone?: "rose" | "lilac" | "onAccent";
  align?: "left" | "center";
  style?: React.CSSProperties;
}

export declare function BenefitList(props: BenefitListProps): JSX.Element;
```

**Design intent**

Short list of reasons or inclusions, each with a check in a soft circle.

```jsx
<BenefitList items={[
  "Szakértői tapasztalat és folyamatosan frissített tudás",
  "Személyre szabott, hatékony kezelések holisztikus szemléletmóddal",
  "Empatikus és figyelmes megközelítés",
]} />
```

For clinical symptom lists use an em-dash marker instead (`list-style-type: "\2014"`), which is the brand's inherited convention — not this component.

**Implementation** (`BenefitList.jsx`)

```jsx
import React from "react";

export function BenefitList({ items = [], icon = "fa-solid fa-check", tone = "rose", align = "left", style }) {
  const color = tone === "onAccent" ? "var(--text-on-accent)" : tone === "lilac" ? "var(--lilac-600)" : "var(--rose-500)";
  const text = tone === "onAccent" ? "var(--text-on-accent)" : "var(--text-body)";
  return (
    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "var(--gap-stack)", alignItems: align === "center" ? "center" : "stretch", ...style }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: "flex", gap: "var(--gap-inline)", alignItems: "flex-start", color: text, fontSize: "var(--body-md-size)", lineHeight: "var(--body-md-line)", maxWidth: "540px" }}>
          <span
            style={{
              flex: "0 0 auto",
              width: "26px",
              height: "26px",
              borderRadius: "var(--radius-circle)",
              background: tone === "onAccent" ? "rgba(255,255,255,.2)" : tone === "lilac" ? "var(--lilac-100)" : "var(--rose-100)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "2px",
            }}
          >
            <i className={icon} aria-hidden="true" style={{ fontSize: "12px", color }} />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
```

### BodyMap

**Prop contract** (`BodyMap.d.ts`)

```ts
import * as React from "react";

/**
 * Schematic body diagram with edge-anchored label pills — the "Hol fáj?" symptom-first entry point.
 * Three tracks: left labels | 240px figure | right labels, so a pill can never reach the figure or
 * the opposite column. The figure is drawn from plain rounded shapes (no anatomical illustration).
 * Controlled component: pair it with a panel that renders the selected region's complaints and therapies.
 */
export interface BodyRegion {
  id: string;
  /** Hungarian region label, e.g. "Derék, hát". */
  label: string;
  /** Horizontal anchor as a percentage of the 240px figure, e.g. "40%". */
  x: string;
  /** Vertical anchor as a percentage of the map height, e.g. "34%". */
  y: string;
  /** Which column the label sits in. Default "left". */
  side?: "left" | "right";
}

export interface BodyMapProps {
  regions: BodyRegion[];
  activeId?: string;
  onSelect?: (id: string) => void;
  /** Small centred note under the figure. */
  caption?: React.ReactNode;
  style?: React.CSSProperties;
}

export declare function BodyMap(props: BodyMapProps): JSX.Element;
```

**Design intent**

Symptom-first navigation. A visitor knows where it hurts, not which method they need — this maps regions onto the therapy pages.

```jsx
const [region, setRegion] = React.useState("derek");
<BodyMap
  activeId={region}
  onSelect={setRegion}
  caption="Válaszd ki, hol érzed a panaszt."
  regions={[
    { id: "fej", label: "Fej, fejfájás", x: "50%", y: "6%", side: "right" },
    { id: "nyak", label: "Nyak", x: "50%", y: "15%" },
    { id: "derek", label: "Derék, hát", x: "40%", y: "34%" },
    { id: "terd", label: "Térd", x: "60%", y: "68%", side: "right" },
  ]}
/>
```

Six to nine regions. `x` anchors the dot horizontally within the 240px figure, `y` vertically within the map; the label pill itself sits in the left or right track per `side`, so a label can never collide with the figure or the opposite column — only with its own column neighbours, which you avoid by keeping y values at least 8% apart per side. The map needs about 420px of width; below that, collapse the surrounding grid to one column. The figure is deliberately abstract — do not swap it for an anatomical drawing or a photograph, and never label it as a medical illustration. The panel beside it is composed from `Card` + a dash list + `TherapyCard`/links; this component only owns the picking.

**Implementation** (`BodyMap.jsx`)

```jsx
import React from "react";

const FIG_W = 240;
const FIG_H = 430;

const PART = { position: "absolute", background: "var(--blush-300)" };

function Figure() {
  return (
    <div aria-hidden="true" style={{ position: "absolute", left: 0, top: 0, width: FIG_W + "px", height: FIG_H + "px" }}>
      <span style={{ ...PART, left: "92px", top: "0", width: "56px", height: "56px", borderRadius: "var(--radius-circle)" }} />
      <span style={{ ...PART, left: "111px", top: "50px", width: "18px", height: "20px", borderRadius: "var(--radius-xs)" }} />
      <span style={{ ...PART, left: "68px", top: "66px", width: "104px", height: "124px", borderRadius: "36px 36px 22px 22px" }} />
      <span style={{ ...PART, left: "42px", top: "76px", width: "22px", height: "146px", borderRadius: "var(--radius-pill)" }} />
      <span style={{ ...PART, left: "176px", top: "76px", width: "22px", height: "146px", borderRadius: "var(--radius-pill)" }} />
      <span style={{ ...PART, left: "74px", top: "186px", width: "92px", height: "48px", borderRadius: "18px 18px 26px 26px" }} />
      <span style={{ ...PART, left: "82px", top: "230px", width: "30px", height: "172px", borderRadius: "var(--radius-pill)" }} />
      <span style={{ ...PART, left: "128px", top: "230px", width: "30px", height: "172px", borderRadius: "var(--radius-pill)" }} />
      <span style={{ ...PART, left: "80px", top: "406px", width: "34px", height: "16px", borderRadius: "var(--radius-pill)" }} />
      <span style={{ ...PART, left: "126px", top: "406px", width: "34px", height: "16px", borderRadius: "var(--radius-pill)" }} />
    </div>
  );
}

function Label({ region, active, side, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect && onSelect(region.id)}
      aria-label={region.label}
      aria-pressed={active}
      style={{
        position: "absolute",
        top: region.y,
        left: side === "left" ? 0 : "auto",
        right: side === "right" ? 0 : "auto",
        maxWidth: "100%",
        transform: "translateY(-50%)",
        display: "inline-flex",
        alignItems: "center",
        textAlign: side === "left" ? "right" : "left",
        padding: "8px 15px",
        border: "none",
        borderRadius: "var(--radius-pill)",
        background: active ? "var(--gradient-brand)" : "var(--white)",
        boxShadow: active ? "var(--shadow-rose)" : "var(--shadow-sm), var(--shadow-ring-hairline)",
        cursor: "pointer",
        transition: "var(--transition-control)",
        fontFamily: "var(--font-body)",
        fontSize: "13.5px",
        lineHeight: 1.25,
        fontWeight: "var(--weight-semibold)",
        color: active ? "var(--text-on-accent)" : "var(--text-strong)",
      }}
    >
      {region.label}
    </button>
  );
}

function Pill({ region, active, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect && onSelect(region.id)}
      aria-pressed={active}
      style={{
        minHeight: "44px",
        padding: "10px 16px",
        border: "none",
        borderRadius: "var(--radius-pill)",
        background: active ? "var(--gradient-brand)" : "var(--white)",
        boxShadow: active ? "var(--shadow-rose)" : "var(--shadow-sm), var(--shadow-ring-hairline)",
        cursor: "pointer",
        fontFamily: "var(--font-body)",
        fontSize: "var(--body-sm-size)",
        lineHeight: 1.25,
        fontWeight: "var(--weight-semibold)",
        color: active ? "var(--text-on-accent)" : "var(--text-strong)",
        transition: "var(--transition-control)",
      }}
    >
      {region.label}
    </button>
  );
}

export function BodyMap({ regions = [], activeId, onSelect, caption, style }) {
  const left = regions.filter((r) => r.side !== "right");
  const right = regions.filter((r) => r.side === "right");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--gap-stack)", alignItems: "center", width: "100%", ...style }}>
      <style>{`.kp-bm-narrow{display:none}@media(max-width:720px){.kp-bm-wide{display:none!important}.kp-bm-narrow{display:flex!important}}`}</style>
      <div className="kp-bm-wide" style={{ display: "grid", gridTemplateColumns: "minmax(88px, 1fr) " + FIG_W + "px minmax(88px, 1fr)", width: "100%", maxWidth: "560px", height: FIG_H + "px" }}>
        <div style={{ position: "relative" }}>
          {left.map((r) => <Label key={r.id} region={r} side="left" active={r.id === activeId} onSelect={onSelect} />)}
        </div>

        <div style={{ position: "relative" }}>
          <Figure />
          {regions.map((r) => {
            const active = r.id === activeId;
            const isRight = r.side === "right";
            return (
              <span
                key={r.id + "-line"}
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: r.y,
                  left: isRight ? r.x : 0,
                  right: isRight ? 0 : "calc(100% - " + r.x + ")",
                  height: "1.5px",
                  background: active ? "var(--rose-400)" : "var(--line-strong)",
                  transform: "translateY(-50%)",
                }}
              />
            );
          })}
          {regions.map((r) => {
            const active = r.id === activeId;
            return (
              <span
                key={r.id + "-dot"}
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: r.x,
                  top: r.y,
                  transform: "translate(-50%, -50%)",
                  width: active ? "16px" : "12px",
                  height: active ? "16px" : "12px",
                  borderRadius: "var(--radius-circle)",
                  background: active ? "var(--rose-700)" : "var(--white)",
                  boxShadow: active ? "0 0 0 4px rgba(114,48,86,.18)" : "inset 0 0 0 2.5px var(--rose-400)",
                  transition: "var(--transition-control)",
                }}
              />
            );
          })}
        </div>

        <div style={{ position: "relative" }}>
          {right.map((r) => <Label key={r.id} region={r} side="right" active={r.id === activeId} onSelect={onSelect} />)}
        </div>
      </div>

      {/* Below 720px the side labels have nowhere to go: the figure keeps tappable dots
          and the labels move into a wrapped pill list underneath. */}
      <div className="kp-bm-narrow" style={{ flexDirection: "column", gap: "var(--space-5)", alignItems: "center", width: "100%" }}>
        <div style={{ position: "relative", width: FIG_W + "px", height: FIG_H + "px", flex: "0 0 auto" }}>
          <Figure />
          {regions.map((r) => {
            const active = r.id === activeId;
            return (
              <button
                key={r.id + "-tap"}
                type="button"
                onClick={() => onSelect && onSelect(r.id)}
                aria-label={r.label}
                aria-pressed={active}
                style={{ position: "absolute", left: r.x, top: r.y, transform: "translate(-50%, -50%)", width: "44px", height: "44px", padding: 0, border: "none", background: "transparent", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center" }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: active ? "18px" : "13px",
                    height: active ? "18px" : "13px",
                    borderRadius: "var(--radius-circle)",
                    background: active ? "var(--rose-700)" : "var(--white)",
                    boxShadow: active ? "0 0 0 4px rgba(114,48,86,.18)" : "inset 0 0 0 2.5px var(--rose-400)",
                    transition: "var(--transition-control)",
                  }}
                />
              </button>
            );
          })}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center" }}>
          {regions.map((r) => <Pill key={r.id + "-pill"} region={r} active={r.id === activeId} onSelect={onSelect} />)}
        </div>
      </div>
      {caption ? (
        <p style={{ fontSize: "var(--caption-size)", lineHeight: "var(--caption-line)", color: "var(--text-muted)", textAlign: "center", maxWidth: "320px" }}>{caption}</p>
      ) : null}
    </div>
  );
}
```

### CaseStory

**Prop contract** (`CaseStory.d.ts`)

```ts
import * as React from "react";

/**
 * A structured patient story: complaint → what I found → what we did → outcome.
 * Labelled blocks rather than a quote, so it reads in Réka's clinical voice.
 * Block text accepts an HTML string so <strong> emphasis works as elsewhere in therapy copy.
 */
export interface CaseStoryBlock {
  /** Uppercase eyebrow label, e.g. "Panasz", "Mit találtam". */
  label: React.ReactNode;
  /** Plain text, an HTML string (rendered as HTML), or a node. */
  text: React.ReactNode;
}

export interface CaseStoryProps {
  /** Non-identifying context line, e.g. "34 éves · irodai munka · 4 hónapos panasz". */
  meta?: React.ReactNode;
  title: React.ReactNode;
  blocks: CaseStoryBlock[];
  /** The result, in one sentence. Rendered in a tinted highlight with a check. */
  outcome?: React.ReactNode;
  /** Names of the therapies used — shown as plum chips. */
  therapies?: string[];
  surface?: "plain" | "mesh" | "tintRose" | "tintLilac" | "tintCream";
  style?: React.CSSProperties;
}

export declare function CaseStory(props: CaseStoryProps): JSX.Element;
```

**Design intent**

Patient case in four labelled beats. More persuasive than another testimonial, and it lets Réka name the mechanism.

```jsx
<CaseStory
  meta="30-as évek · irodai munka · 4 hónapos panasz"
  title="Derékfájás, ami reggelre a legrosszabb"
  blocks={[
    { label: "Panasz", text: "Reggeli felkeléskor éles derékfájás…" },
    { label: "Mit találtam", text: "A <strong>mély stabilizátorok</strong> nem kapcsoltak be…" },
    { label: "Mit tettünk", text: "FDM a fascia oldására, majd szegmentális stabilizációs tréning." },
  ]}
  outcome="6 kezelés után a reggeli fájdalom megszűnt."
  therapies={["FDM", "Gyógytorna"]}
/>
```

Block text accepts an HTML string, so `<strong>` emphasis works exactly as in therapy copy. Rules: no names, no photos, no detail that identifies anyone — `meta` stays non-identifying. Never promise the same result ("segíthet", not "meggyógyul"). The outcome must be one the practice can stand behind; if there is no real case yet, do not invent one — use `TestimonialCarousel` instead.

**Implementation** (`CaseStory.jsx`)

```jsx
import React from "react";
import { Card } from "../core/Card.jsx";
import { Chip } from "../core/Chip.jsx";
import { Eyebrow } from "../core/Eyebrow.jsx";

export function CaseStory({ meta, title, blocks = [], outcome, therapies = [], surface = "plain", style }) {
  return (
    <Card surface={surface} padding="lg" radius="xl" style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)", height: "100%", ...style }}>
      <style>{`@media(max-width:640px){.kp-case-block{grid-template-columns:1fr!important;gap:4px!important}}`}</style>
      {meta ? <Eyebrow>{meta}</Eyebrow> : null}
      <h3 style={{ fontSize: "var(--heading-1-size)", lineHeight: "var(--heading-1-line)", letterSpacing: "var(--heading-1-track)", fontWeight: "var(--heading-1-weight)", color: "var(--text-strong)" }}>{title}</h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
        {blocks.map((block, i) => (
          <div key={i} className="kp-case-block" style={{ display: "grid", gridTemplateColumns: "112px 1fr", gap: "var(--space-5)", alignItems: "baseline" }}>
            <span style={{ fontSize: "var(--eyebrow-size)", lineHeight: "var(--body-sm-line)", letterSpacing: "var(--eyebrow-track)", fontWeight: "var(--eyebrow-weight)", textTransform: "uppercase", color: "var(--text-muted)" }}>{block.label}</span>
            {typeof block.text === "string" ? (
              <p style={{ fontSize: "var(--body-md-size)", lineHeight: "var(--body-md-line)", color: "var(--text-body)" }} dangerouslySetInnerHTML={{ __html: block.text }} />
            ) : (
              <p style={{ fontSize: "var(--body-md-size)", lineHeight: "var(--body-md-line)", color: "var(--text-body)" }}>{block.text}</p>
            )}
          </div>
        ))}
      </div>

      {outcome ? (
        <div style={{ display: "flex", gap: "var(--gap-inline)", alignItems: "flex-start", background: "var(--surface-tint-lilac)", borderRadius: "var(--radius-lg)", padding: "18px 20px", boxShadow: "var(--shadow-ring-hairline)" }}>
          <i className="fa-solid fa-check" aria-hidden="true" style={{ color: "var(--rose-700)", fontSize: "15px", marginTop: "3px" }} />
          <p style={{ fontSize: "var(--body-md-size)", lineHeight: "var(--body-md-line)", fontWeight: "var(--weight-semibold)", color: "var(--text-strong)" }}>{outcome}</p>
        </div>
      ) : null}

      {therapies.length ? (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--gap-inline)", marginTop: "auto" }}>
          {therapies.map((t) => (
            <Chip key={t} size="sm" tone="plum">{t}</Chip>
          ))}
        </div>
      ) : null}
    </Card>
  );
}
```

### FaqAccordion

**Prop contract** (`FaqAccordion.d.ts`)

```ts
import * as React from "react";

export interface FaqEntry {
  /** Hungarian question, sentence case, with its question mark. */
  question: string;
  /** Answer body; newlines are preserved. */
  answer: string;
}

/**
 * The "Gyakori kérdések" accordion. Chevron rotates −180° when open, matching the source.
 */
export interface FaqAccordionProps {
  items: FaqEntry[];
  /** Allow several rows open at once. Default: one at a time. */
  allowMultiple?: boolean;
  style?: React.CSSProperties;
}

export declare function FaqAccordion(props: FaqAccordionProps): JSX.Element;
```

**Design intent**

The "Gyakori kérdések" block. Row tints lilac-100 while open; chevron rotates −180°, as in the source.

```jsx
<FaqAccordion items={faqs} />
```

Questions are the patient's own phrasing ("Fájni fog a kezelés?"), answers preserve their line breaks. One row open at a time unless `allowMultiple`.

**Implementation** (`FaqAccordion.jsx`)

```jsx
import React from "react";

function Item({ question, answer, open, onToggle }) {
  return (
    <div style={{ borderRadius: "var(--radius-lg)", background: open ? "var(--surface-tint-lilac)" : "var(--surface-card)", boxShadow: "var(--shadow-ring-hairline)", overflow: "hidden", transition: "background var(--dur-base) var(--ease-soft)" }}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--gap-inline)",
          width: "100%",
          padding: "18px 22px",
          border: "none",
          background: "transparent",
          textAlign: "left",
          cursor: "pointer",
          fontFamily: "var(--font-display)",
          fontSize: "var(--heading-3-size)",
          lineHeight: 1.35,
          letterSpacing: "var(--heading-3-track)",
          fontWeight: "var(--heading-3-weight)",
          color: "var(--text-strong)",
        }}
      >
        <i
          className="fa-solid fa-chevron-down"
          aria-hidden="true"
          style={{ fontSize: "13px", color: open ? "var(--lilac-700)" : "var(--rose-500)", transform: open ? "rotate(-180deg)" : "none", transition: "transform var(--dur-fast) var(--ease-soft)" }}
        />
        <span style={{ flex: 1 }}>{question}</span>
      </button>
      <div style={{ display: "grid", gridTemplateRows: open ? "1fr" : "0fr", transition: "grid-template-rows var(--dur-slow) var(--ease-soft)" }}>
        <div style={{ overflow: "hidden" }}>
          <div style={{ padding: "0 22px 20px 45px", fontSize: "var(--body-md-size)", lineHeight: "var(--body-md-line)", color: "var(--text-body)", whiteSpace: "pre-wrap" }}>{answer}</div>
        </div>
      </div>
    </div>
  );
}

export function FaqAccordion({ items = [], allowMultiple = false, style }) {
  const [open, setOpen] = React.useState([]);
  const toggle = (i) =>
    setOpen((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : allowMultiple ? [...prev, i] : [i]));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--gap-inline)", ...style }}>
      {items.map((item, i) => (
        <Item key={i} question={item.question} answer={item.answer} open={open.includes(i)} onToggle={() => toggle(i)} />
      ))}
    </div>
  );
}
```

### JumpMenu

**Prop contract** (`JumpMenu.d.ts`)

```ts
import * as React from "react";

export interface JumpMenuItem {
  id: string;
  label: string;
}

/**
 * The in-page section jump row from the treatments page. Pills, wrapping, centred.
 */
export interface JumpMenuProps {
  items: JumpMenuItem[];
  /** Id of the section currently in view — renders that pill in the gradient. */
  activeId?: string;
  onSelect?: (id: string) => void;
  align?: "center" | "left";
  style?: React.CSSProperties;
}

export declare function JumpMenu(props: JumpMenuProps): JSX.Element;
```

**Design intent**

Section shortcuts at the top of a long page — the treatments page has seven.

```jsx
<JumpMenu activeId="arak" onSelect={setSection} items={[
  { id: "foglalas", label: "Időpont foglalás" },
  { id: "arak", label: "Árak" },
]} />
```

Every pill carries `fa-arrow-up-right-from-square`, as in the source. The active pill fills with the brand gradient; the rest are rose-100.

**Implementation** (`JumpMenu.jsx`)

```jsx
import React from "react";

export function JumpMenu({ items = [], activeId, onSelect, align = "center", style }) {
  const [hover, setHover] = React.useState(null);
  return (
    <nav style={{ display: "flex", flexWrap: "wrap", gap: "var(--gap-inline)", justifyContent: align === "center" ? "center" : "flex-start", ...style }}>
      {items.map((item) => {
        const active = item.id === activeId;
        const hot = hover === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect && onSelect(item.id)}
            onMouseEnter={() => setHover(item.id)}
            onMouseLeave={() => setHover(null)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 18px",
              border: "none",
              borderRadius: "var(--radius-pill)",
              background: active ? "var(--gradient-brand)" : hot ? "var(--rose-200)" : "var(--rose-100)",
              color: active ? "var(--text-on-accent)" : "var(--rose-700)",
              fontSize: "var(--body-sm-size)",
              fontWeight: "var(--weight-semibold)",
              lineHeight: 1.2,
              cursor: "pointer",
              boxShadow: active ? "var(--shadow-rose)" : "none",
              transform: hot && !active ? "var(--lift-hover)" : "none",
              transition: "var(--transition-control)",
            }}
          >
            <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" style={{ fontSize: "10.5px", opacity: 0.75 }} />
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}
```

### LinkTile

**Prop contract** (`LinkTile.d.ts`)

```ts
import * as React from "react";

/**
 * The large navigational tile from "Hogyan tudok segíteni?" — icon disc, title, blurb, arrow link.
 */
export interface LinkTileProps {
  /** Font Awesome 6 class string, e.g. "fa-solid fa-house-medical-flag". */
  icon: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Directional link copy, e.g. "Tovább az egyéni kezelésekhez". */
  linkLabel?: React.ReactNode;
  href?: string;
  surface?: "mesh" | "plain" | "tintRose" | "tintLilac" | "filled";
  style?: React.CSSProperties;
}

export declare function LinkTile(props: LinkTileProps): JSX.Element;
```

**Design intent**

The two big route tiles on the landing page ("Egyéni kezelés" / "Online programok").

```jsx
<LinkTile icon="fa-solid fa-house-medical-flag" title="Egyéni kezelés"
  description="Személyes állapotfelmérés alapján kialakított komplex terápia Budapesten"
  linkLabel="Tovább az egyéni kezelésekhez" href="#/individual-treatments" />
```

Link copy is directional and explicit, as the source writes it. Use `surface="filled"` for at most one tile in a pair, to mark the primary route.

**Implementation** (`LinkTile.jsx`)

```jsx
import React from "react";
import { Card } from "../core/Card.jsx";

export function LinkTile({ icon, title, description, linkLabel, href, surface = "mesh", style }) {
  const [hover, setHover] = React.useState(false);
  const onAccent = surface === "filled" || surface === "band";
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ display: "flex", height: "100%" }}>
      <Card surface={surface} padding="lg" radius="xl" interactive href={href} style={{ display: "flex", flexDirection: "column", gap: "var(--gap-stack)", height: "100%", ...style }}>
        <span
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "var(--radius-circle)",
            background: onAccent ? "rgba(255,255,255,.2)" : "var(--gradient-brand-soft)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            color: onAccent ? "var(--text-on-accent)" : "var(--rose-700)",
            fontSize: "22px",
          }}
        >
          <i className={icon} aria-hidden="true" />
        </span>
        <h3 style={{ fontSize: "var(--heading-2-size)", lineHeight: "var(--heading-2-line)", letterSpacing: "var(--heading-2-track)", fontWeight: "var(--heading-2-weight)", color: onAccent ? "var(--text-on-accent)" : "var(--text-strong)" }}>{title}</h3>
        <p style={{ fontSize: "var(--body-md-size)", lineHeight: "var(--body-md-line)", color: onAccent ? "var(--text-on-accent-muted)" : "var(--text-muted)", flex: 1 }}>{description}</p>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "9px", fontSize: "var(--label-size)", fontWeight: "var(--label-weight)", color: onAccent ? "var(--text-on-accent)" : "var(--text-link)" }}>
          {linkLabel}
          <i className="fa-solid fa-arrow-right" aria-hidden="true" style={{ fontSize: "11px", transform: hover ? "translateX(4px)" : "none", transition: "transform var(--dur-fast) var(--ease-soft)" }} />
        </span>
      </Card>
    </div>
  );
}
```

### PriceItem

**Prop contract** (`PriceItem.d.ts`)

```ts
import * as React from "react";

/** One row of the "Árak" list: treatment name, duration chip, gradient price, what's included. */
export interface PriceItemProps {
  /** e.g. "Állapotfelmérés". */
  title: string;
  /** Hungarian formatting: period thousands separator, "Ft" after — "20.000 Ft". */
  price: string;
  /** e.g. "60 perc". */
  duration?: string;
  /** The parenthetical "Az ár tartalmazza: …" copy. */
  includes?: React.ReactNode;
  /** Switches the fill from cream to the mesh card wash. */
  featured?: boolean;
  style?: React.CSSProperties;
}

export declare function PriceItem(props: PriceItemProps): JSX.Element;
```

**Design intent**

One priced treatment. Prices are set in gradient-clipped 46px numerals.

```jsx
<PriceItem title="Állapotfelmérés" price="20.000 Ft" duration="60 perc" featured
  includes="Az ár tartalmazza: személyes konzultáció, leletelemzés, testtartás elemzés, speciális tesztek…" />
```

Never round the number and never drop the duration. Add the payment note ("Fizetés készpénzzel vagy azonnali átutalással a kezelés végén.") beneath the group in italic caption type, as the source does.

**Implementation** (`PriceItem.jsx`)

```jsx
import React from "react";
import { Card } from "../core/Card.jsx";
import { Chip } from "../core/Chip.jsx";
import { GradientText } from "../core/GradientText.jsx";

export function PriceItem({ title, price, duration, includes, featured = false, style }) {
  return (
    <Card surface={featured ? "mesh" : "tintCream"} padding="md" radius="lg" style={{ display: "flex", flexDirection: "column", gap: "var(--gap-stack)", height: "100%", ...style }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "var(--gap-inline)" }}>
        <h3 style={{ fontSize: "var(--heading-2-size)", lineHeight: "var(--heading-2-line)", letterSpacing: "var(--heading-2-track)", fontWeight: "var(--heading-2-weight)" }}>{title}</h3>
        {duration ? <Chip size="sm" tone={featured ? "rose" : "plum"} icon="fa-solid fa-clock">{duration}</Chip> : null}
      </div>
      <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--numeral-size)", lineHeight: "var(--numeral-line)", letterSpacing: "var(--numeral-track)", fontWeight: "var(--numeral-weight)" }}>
        <GradientText>{price}</GradientText>
      </div>
      {includes ? (
        <p style={{ fontSize: "var(--body-sm-size)", lineHeight: "var(--body-sm-line)", color: "var(--text-muted)" }}>{includes}</p>
      ) : null}
    </Card>
  );
}
```

### QualificationList

**Prop contract** (`QualificationList.d.ts`)

```ts
import * as React from "react";

export interface Qualification {
  /** Year or range, e.g. "2017-2021". */
  date: string;
  description: string;
  /** The BSc degree row — rendered in rose and semibold. */
  highlight?: boolean;
}

/** The "Végzettségeim" list: date column + course name, two columns on desktop. */
export interface QualificationListProps {
  items: Qualification[];
  columns?: 1 | 2 | 3;
  style?: React.CSSProperties;
}

export declare function QualificationList(props: QualificationListProps): JSX.Element;
```

**Design intent**

The "Végzettségeim" credential list — 25+ rows, so it runs in two columns on desktop and one on mobile.

```jsx
<QualificationList columns={2} items={[
  { date: "2017-2021", description: "Pécsi Tudományegyetem … Gyógytornász-fizioterapeuta BSc", highlight: true },
  { date: "2020", description: "Sportsérülések komplex rehabilitációja" },
]} />
```

`highlight` marks the degree. Dates are tabular-numeral aligned; rows are separated by a hairline, never a card each.

**Implementation** (`QualificationList.jsx`)

```jsx
import React from "react";

export function QualificationList({ items = [], columns = 2, style }) {
  return (
    <React.Fragment>
    <style>{`@media(max-width:760px){.kp-quallist{column-count:1!important}}`}</style>
    <ul className="kp-quallist" style={{ listStyle: "none", margin: 0, padding: 0, columnCount: columns, columnGap: "var(--space-10)", ...style }}>
      {items.map((item, i) => (
        <li
          key={i}
          style={{
            breakInside: "avoid",
            display: "flex",
            gap: "var(--gap-inline)",
            padding: "9px 0",
            borderBottom: "1px solid var(--line-hairline)",
            fontSize: "var(--body-sm-size)",
            lineHeight: "var(--body-sm-line)",
            color: item.highlight ? "var(--text-strong)" : "var(--text-body)",
            fontWeight: item.highlight ? "var(--weight-semibold)" : "var(--weight-regular)",
          }}
        >
          <span style={{ flex: "0 0 74px", color: item.highlight ? "var(--text-accent)" : "var(--text-subtle)", fontVariantNumeric: "tabular-nums", fontWeight: "var(--weight-semibold)" }}>{item.date}</span>
          <span>{item.description}</span>
        </li>
      ))}
    </ul>
    </React.Fragment>
  );
}
```

### SelfCheckQuiz

**Prop contract** (`SelfCheckQuiz.d.ts`)

```ts
import * as React from "react";

/**
 * Short self-check: a few single-choice questions, then one recommendation.
 * Low-commitment entry for a visitor not ready to book. Holds its own state;
 * the consumer supplies the questions and a resolve() that maps answers to a result.
 */
export interface QuizOption {
  label: React.ReactNode;
  value: string;
}

export interface QuizQuestion {
  id: string;
  question: React.ReactNode;
  /** Optional clarifying line under the question. */
  help?: React.ReactNode;
  options: QuizOption[];
}

export interface QuizResult {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  lead?: React.ReactNode;
  /** Em-dash list of suggested reading — usually therapy pages. */
  links?: Array<{ label: string; href: string }>;
  primary?: { label: React.ReactNode; href?: string; onClick?: () => void };
  /** Honest caveat, e.g. that this is not a diagnosis. */
  note?: React.ReactNode;
}

export interface SelfCheckQuizProps {
  questions: QuizQuestion[];
  /** answers is keyed by question id. Called on every render once complete. */
  resolve: (answers: Record<string, string>) => QuizResult;
  eyebrow?: React.ReactNode;
  restartLabel?: React.ReactNode;
  surface?: "plain" | "mesh" | "tintRose" | "tintLilac" | "tintCream";
  style?: React.CSSProperties;
}

export declare function SelfCheckQuiz(props: SelfCheckQuizProps): JSX.Element;
```

**Design intent**

Four or five questions ending in one clear next step — the low-commitment entry point for someone not ready to book.

```jsx
<SelfCheckQuiz
  eyebrow="Önteszt"
  questions={[
    { id: "hol", question: "Hol érzed a panaszt?", options: [{ label: "Derék, hát", value: "derek" }, { label: "Nyak, fej", value: "nyak" }] },
    { id: "mennyi", question: "Mióta tart?", options: [{ label: "Néhány napja", value: "akut" }, { label: "Több hónapja", value: "kronikus" }] },
  ]}
  resolve={(a) => ({
    title: "Állapotfelméréssel érdemes kezdenünk",
    lead: "A panaszod alapján…",
    links: [{ label: "FDM", href: "#/therapy/fdm" }],
    primary: { label: "Időpontot foglalok", href: "https://kirillareka.salonic.hu/" },
    note: "Ez a kérdőív nem diagnózis…",
  })}
/>
```

Non-negotiable: the result never diagnoses and never promises an outcome — `note` carries that caveat in plain Hungarian. Five questions maximum, one tap each, and every path ends somewhere real (booking, a therapy page, or the free exercise), never in a dead end.

**Implementation** (`SelfCheckQuiz.jsx`)

```jsx
import React from "react";
import { Card } from "../core/Card.jsx";
import { Button } from "../core/Button.jsx";
import { Eyebrow } from "../core/Eyebrow.jsx";

function Progress({ index, total }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
      <span style={{ fontSize: "var(--caption-size)", fontWeight: "var(--weight-semibold)", color: "var(--text-muted)", whiteSpace: "nowrap" }}>
        {index + 1} / {total}
      </span>
      <div style={{ display: "flex", gap: "6px", flex: 1 }}>
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            style={{
              height: "5px",
              flex: 1,
              borderRadius: "var(--radius-pill)",
              background: i <= index ? "var(--gradient-brand)" : "var(--plum-200)",
              transition: "background var(--dur-base) var(--ease-soft)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function Option({ label, selected, onClick }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--gap-inline)",
        width: "100%",
        textAlign: "left",
        padding: "15px 20px",
        border: "none",
        borderRadius: "var(--radius-pill)",
        background: selected ? "var(--gradient-brand)" : hover ? "var(--blush-200)" : "var(--blush-100)",
        color: selected ? "var(--text-on-accent)" : "var(--text-body)",
        boxShadow: selected ? "var(--shadow-rose)" : "var(--shadow-ring-hairline)",
        fontFamily: "var(--font-body)",
        fontSize: "var(--body-md-size)",
        lineHeight: 1.3,
        fontWeight: "var(--weight-semibold)",
        cursor: "pointer",
        transition: "var(--transition-control)",
      }}
    >
      <span
        style={{
          width: "18px",
          height: "18px",
          flex: "0 0 auto",
          borderRadius: "var(--radius-circle)",
          background: selected ? "var(--white)" : "var(--white)",
          boxShadow: selected ? "none" : "inset 0 0 0 1.5px var(--plum-300)",
        }}
      />
      {label}
    </button>
  );
}

export function SelfCheckQuiz({ questions = [], resolve, eyebrow, restartLabel = "Újrakezdem", surface = "plain", style }) {
  const [index, setIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState({});
  const [done, setDone] = React.useState(false);

  const q = questions[index];
  const result = done && resolve ? resolve(answers) : null;

  const pick = (value) => {
    const next = { ...answers, [q.id]: value };
    setAnswers(next);
    if (index + 1 < questions.length) setIndex(index + 1);
    else setDone(true);
  };

  const restart = () => {
    setAnswers({});
    setIndex(0);
    setDone(false);
  };

  if (result) {
    return (
      <Card surface={surface} padding="lg" radius="xl" style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)", ...style }}>
        <Eyebrow>{result.eyebrow || "Javaslatom"}</Eyebrow>
        <h3 style={{ fontSize: "var(--heading-1-size)", lineHeight: "var(--heading-1-line)", letterSpacing: "var(--heading-1-track)", fontWeight: "var(--heading-1-weight)", color: "var(--text-strong)" }}>{result.title}</h3>
        {result.lead ? <p style={{ fontSize: "var(--body-md-size)", lineHeight: "var(--body-md-line)", color: "var(--text-body)" }}>{result.lead}</p> : null}
        {result.links && result.links.length ? (
          <ul style={{ margin: 0, paddingInlineStart: "18px", listStyleType: '"\\2014"', display: "flex", flexDirection: "column", gap: "8px" }}>
            {result.links.map((l) => (
              <li key={l.label} style={{ paddingLeft: "10px", fontSize: "var(--body-md-size)", lineHeight: "var(--body-md-line)" }}>
                <a href={l.href} style={{ color: "var(--text-link)", fontWeight: "var(--weight-semibold)" }}>{l.label}</a>
              </li>
            ))}
          </ul>
        ) : null}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--gap-inline)", alignItems: "center", marginTop: "var(--space-2)" }}>
          {result.primary ? <Button size="md" href={result.primary.href} onClick={result.primary.onClick}>{result.primary.label}</Button> : null}
          <Button size="md" variant="ghost" icon="fa-solid fa-rotate-left" onClick={restart}>{restartLabel}</Button>
        </div>
        {result.note ? <p style={{ fontSize: "var(--caption-size)", lineHeight: "var(--caption-line)", color: "var(--text-muted)" }}>{result.note}</p> : null}
      </Card>
    );
  }

  if (!q) return null;

  return (
    <Card surface={surface} padding="lg" radius="xl" style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)", ...style }}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Progress index={index} total={questions.length} />
      <h3 style={{ fontSize: "var(--heading-2-size)", lineHeight: "var(--heading-2-line)", letterSpacing: "var(--heading-2-track)", fontWeight: "var(--heading-2-weight)", color: "var(--text-strong)" }}>{q.question}</h3>
      {q.help ? <p style={{ fontSize: "var(--body-sm-size)", lineHeight: "var(--body-sm-line)", color: "var(--text-muted)" }}>{q.help}</p> : null}
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--gap-inline)" }}>
        {q.options.map((o) => (
          <Option key={o.value} label={o.label} selected={answers[q.id] === o.value} onClick={() => pick(o.value)} />
        ))}
      </div>
      {index > 0 ? (
        <div>
          <Button size="sm" variant="ghost" icon="fa-solid fa-arrow-left" onClick={() => setIndex(index - 1)}>Vissza</Button>
        </div>
      ) : null}
    </Card>
  );
}
```

### StatStrip

**Prop contract** (`StatStrip.d.ts`)

```ts
import * as React from "react";

/**
 * Compact social-proof row: 2-4 gradient numerals with a labelled caption, divided by hairlines.
 * Sits directly under a hero. Values are unrounded, brand-voice numbers ("25+", "2023 óta").
 */
export interface StatStripItem {
  /** The numeral or short string, e.g. "25+". Rendered in gradient-clipped display type. */
  value: React.ReactNode;
  /** Plain-language caption, e.g. "elvégzett tanfolyam". */
  label: React.ReactNode;
  /** Optional Font Awesome 6 class, e.g. "fa-solid fa-graduation-cap". */
  icon?: string;
}

export interface StatStripProps {
  items: StatStripItem[];
  surface?: "plain" | "mesh" | "tintRose" | "tintLilac" | "tintCream" | "filled" | "band" | "invert";
  /** Numeral size. Default "md" (34px); "lg" uses the 46px numeral tier. */
  size?: "sm" | "md" | "lg";
  style?: React.CSSProperties;
}

export declare function StatStrip(props: StatStripProps): JSX.Element;
```

**Design intent**

Social-proof strip for directly under a hero — the practice's concrete numbers, never invented ones.

```jsx
<StatStrip items={[
  { value: "25+", label: "elvégzett tanfolyam", icon: "fa-solid fa-graduation-cap" },
  { value: "2023", label: "óta saját praxis", icon: "fa-solid fa-house-medical-flag" },
  { value: "13", label: "alkalmazott terápia", icon: "fa-solid fa-hand-holding-heart" },
]} />
```

Keep to 3-4 items — more and the numerals stop reading as facts. Numbers follow the brand rule: unrounded and concrete. Never a made-up patient count or a star rating the practice cannot evidence. On a gradient band use `surface="band"`, which drops the gradient clip in favour of white numerals.

**Implementation** (`StatStrip.jsx`)

```jsx
import React from "react";
import { Card } from "../core/Card.jsx";
import { GradientText } from "../core/GradientText.jsx";

const NUM_SIZES = { sm: "28px", md: "34px", lg: "var(--numeral-size)" };

export function StatStrip({ items = [], surface = "plain", size = "md", style }) {
  const onAccent = surface === "filled" || surface === "band" || surface === "invert";
  return (
    <Card
      surface={surface}
      padding="md"
      radius="lg"
      className="kp-statstrip"
      style={{ display: "grid", gridTemplateColumns: "repeat(" + items.length + ", 1fr)", alignItems: "center", ...style }}
    >
      <style>{`@media(max-width:760px){.kp-statstrip{grid-template-columns:repeat(auto-fit,minmax(150px,1fr))!important;gap:var(--space-5)!important}.kp-statstrip>div{box-shadow:none!important;padding-inline:0!important}}`}</style>
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            padding: "4px var(--space-6)",
            boxShadow: i === 0 ? "none" : onAccent ? "inset 1px 0 0 var(--line-on-accent)" : "inset 1px 0 0 var(--line-hairline)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: NUM_SIZES[size] || NUM_SIZES.md,
              lineHeight: 1.05,
              letterSpacing: "var(--numeral-track)",
              fontWeight: "var(--numeral-weight)",
              color: onAccent ? "var(--text-on-accent)" : undefined,
            }}
          >
            {onAccent ? item.value : <GradientText>{item.value}</GradientText>}
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "var(--body-sm-size)",
              lineHeight: "var(--body-sm-line)",
              color: onAccent ? "var(--text-on-accent-muted)" : "var(--text-muted)",
            }}
          >
            {item.icon ? <i className={item.icon} aria-hidden="true" style={{ fontSize: ".95em", color: onAccent ? "inherit" : "var(--rose-500)" }} /> : null}
            {item.label}
          </span>
        </div>
      ))}
    </Card>
  );
}
```

### StepFlow

**Prop contract** (`StepFlow.d.ts`)

```ts
import * as React from "react";

/**
 * Numbered process walkthrough — "Az első alkalom" style. Step one is gradient-filled,
 * the rest sit as white discs joined by a rose rule in the "row" variant.
 */
export interface StepFlowStep {
  title: React.ReactNode;
  description: React.ReactNode;
  /** Short accent line under the copy, e.g. "60 perc". */
  meta?: React.ReactNode;
  /** Font Awesome class for the meta line. Defaults to "fa-solid fa-clock". */
  icon?: string;
}

export interface StepFlowProps {
  steps: StepFlowStep[];
  /** "row" for 3-4 steps side by side, "stack" for a vertical read. */
  variant?: "row" | "stack";
  surface?: "plain" | "mesh" | "tintRose" | "tintLilac" | "tintCream";
  style?: React.CSSProperties;
}

export declare function StepFlow(props: StepFlowProps): JSX.Element;
```

**Design intent**

What happens at the appointment, in order. Written to remove the anxiety that stops a booking, so each step says plainly what Réka does and what the patient does.

```jsx
<StepFlow steps={[
  { title: "Beszélgetünk", description: "Végigkérdezem a panaszod történetét…", meta: "kb. 15 perc" },
  { title: "Megvizsgállak", description: "Testtartás- és mozgásvizsgálat…", meta: "kb. 20 perc" },
  { title: "Kezelek és tervet adok", description: "Az első kezelést is elvégzem…", meta: "kb. 25 perc" },
]} />
```

Three or four steps in `variant="row"`; more than four, switch to `"stack"`. Second person singular throughout ("megvizsgállak", not "a vizsgálat megtörténik"). Durations are honest estimates and belong in `meta`.

**Implementation** (`StepFlow.jsx`)

```jsx
import React from "react";
import { Card } from "../core/Card.jsx";

function Disc({ n, tone }) {
  const filled = tone === "filled";
  return (
    <span
      style={{
        flex: "0 0 auto",
        width: "44px",
        height: "44px",
        borderRadius: "var(--radius-circle)",
        background: filled ? "var(--gradient-brand)" : "var(--white)",
        color: filled ? "var(--text-on-accent)" : "var(--rose-700)",
        boxShadow: filled ? "var(--shadow-rose)" : "var(--shadow-sm)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-display)",
        fontSize: "17px",
        fontWeight: "var(--weight-bold)",
      }}
    >
      {n}
    </span>
  );
}

export function StepFlow({ steps = [], variant = "row", surface = "mesh", style }) {
  const stack = variant === "stack";
  return (
    <Card
      surface={surface}
      padding="lg"
      radius="xl"
      className="kp-stepflow"
      style={{
        display: "grid",
        gridTemplateColumns: stack ? "1fr" : "repeat(" + steps.length + ", 1fr)",
        gap: stack ? "var(--space-8)" : "var(--space-8)",
        ...style,
      }}
    >
      <style>{`@media(max-width:860px){.kp-stepflow{grid-template-columns:1fr!important;gap:var(--space-6)!important}.kp-stepflow .kp-step-line{display:none!important}}`}</style>
      {steps.map((step, i) => (
        <div key={i} style={{ display: "flex", flexDirection: stack ? "row" : "column", gap: stack ? "var(--space-5)" : "var(--gap-stack)", alignItems: stack ? "flex-start" : "stretch" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)", flex: "0 0 auto" }}>
            <Disc n={i + 1} tone={i === 0 ? "filled" : "plain"} />
            {!stack && i < steps.length - 1 ? <span className="kp-step-line" style={{ height: "2px", flex: 1, background: "var(--rose-200)", borderRadius: "var(--radius-pill)" }} /> : null}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <h3 style={{ fontSize: "var(--heading-3-size)", lineHeight: "var(--heading-3-line)", fontWeight: "var(--heading-3-weight)", color: "var(--text-strong)" }}>{step.title}</h3>
            <p style={{ fontSize: "var(--body-sm-size)", lineHeight: "var(--body-sm-line)", color: "var(--text-body)" }}>{step.description}</p>
            {step.meta ? (
              <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "var(--caption-size)", lineHeight: "var(--caption-line)", fontWeight: "var(--weight-semibold)", color: "var(--text-accent)" }}>
                <i className={step.icon || "fa-solid fa-clock"} aria-hidden="true" style={{ fontSize: ".95em" }} />
                {step.meta}
              </span>
            ) : null}
          </div>
        </div>
      ))}
    </Card>
  );
}
```

### TestimonialCarousel

**Prop contract** (`TestimonialCarousel.d.ts`)

```ts
import * as React from "react";

export interface Testimonial {
  /** Patient initial-form name, e.g. "M. Marina". */
  author: string;
  /** The quote, VERBATIM — including emoji and line breaks. */
  description: string;
}

/**
 * The patient-testimonial slider ("Rólam mondták" / "Visszajelzések a pácienseimtől").
 */
export interface TestimonialCarouselProps {
  items: Testimonial[];
  /** Cards visible at once. 3 on desktop, 1 on mobile. */
  perView?: number;
  style?: React.CSSProperties;
}

export declare function TestimonialCarousel(props: TestimonialCarouselProps): JSX.Element;
```

**Design intent**

The patient-testimonial slider. Replaces the source's Swiper instance; same behaviour, brand styling.

```jsx
<TestimonialCarousel perView={3} items={[
  { author: "B. Ivett", description: "Szia Réka 🤗 képzeld mára már teljesen elmúlt a nyak fájdalmam…" },
]} />
```

**Quote patients verbatim** — keep the emoji, keep the line breaks (`white-space: pre-wrap`), keep the initial-form names. The active dot stretches to a 22px gradient pill. `perView={1}` below 768px.

**Implementation** (`TestimonialCarousel.jsx`)

```jsx
import React from "react";
import { IconButton } from "../core/IconButton.jsx";
import { Card } from "../core/Card.jsx";

/* Cards visible at once drops with the viewport: 3 → 2 → 1, so a phone never
   renders a 110px-wide quote card. */
function useResponsivePerView(perView) {
  const read = () => (typeof window === "undefined" ? perView : window.innerWidth < 760 ? 1 : window.innerWidth < 1060 ? Math.min(2, perView) : perView);
  const [view, setView] = React.useState(read);
  React.useEffect(() => {
    const on = () => setView(read());
    on();
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, [perView]);
  return view;
}

export function TestimonialCarousel({ items = [], perView = 3, style }) {
  const [index, setIndex] = React.useState(0);
  const view = useResponsivePerView(perView);
  const pages = Math.max(1, items.length - view + 1);
  const clamped = Math.min(index, pages - 1);
  const step = 100 / view;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--gap-card)", ...style }}>
      <div style={{ overflow: "hidden" }}>
        <div
          style={{
            display: "flex",
            gap: "var(--gap-grid)",
            transform: "translateX(calc(" + -clamped * step + "% - " + clamped * (24 / view) + "px))",
            transition: "transform var(--dur-slow) var(--ease-soft)",
          }}
        >
          {items.map((item, i) => (
            <Card
              key={i}
              surface="plain"
              padding="md"
              radius="lg"
              style={{ flex: "0 0 calc(" + step + "% - " + (24 - 24 / view) + "px)", display: "flex", flexDirection: "column", gap: "var(--gap-stack)" }}
            >
              <i className="fa-solid fa-quote-left" aria-hidden="true" style={{ fontSize: "16px", color: "var(--rose-300)" }} />
              <p style={{ fontSize: "var(--body-sm-size)", lineHeight: 1.66, color: "var(--text-body)", whiteSpace: "pre-wrap", flex: 1 }}>{item.description}</p>
              <div style={{ fontSize: "var(--label-size)", fontWeight: "var(--label-weight)", color: "var(--rose-700)" }}>{item.author}</div>
            </Card>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "var(--gap-inline)" }}>
        <IconButton icon="fa-solid fa-chevron-left" ariaLabel="Előző visszajelzés" variant="soft" size="sm" onClick={() => setIndex(Math.max(0, clamped - 1))} disabled={clamped === 0} />
        <div style={{ display: "flex", gap: "6px", padding: "0 8px" }}>
          {Array.from({ length: pages }).map((_, i) => (
            <span
              key={i}
              onClick={() => setIndex(i)}
              style={{
                width: i === clamped ? "22px" : "7px",
                height: "7px",
                borderRadius: "var(--radius-pill)",
                background: i === clamped ? "var(--gradient-brand)" : "var(--plum-200)",
                cursor: "pointer",
                transition: "width var(--dur-base) var(--ease-soft), background var(--dur-base) var(--ease-soft)",
              }}
            />
          ))}
        </div>
        <IconButton icon="fa-solid fa-chevron-right" ariaLabel="Következő visszajelzés" variant="soft" size="sm" onClick={() => setIndex(Math.min(pages - 1, clamped + 1))} disabled={clamped === pages - 1} />
      </div>
    </div>
  );
}
```

### TherapyCard

**Prop contract** (`TherapyCard.d.ts`)

```ts
import * as React from "react";

/**
 * One therapy in the therapies grid: 4:3 photo, title, one-line summary, "Részletek" link.
 */
export interface TherapyCardProps {
  /** Hungarian therapy name, e.g. "Visceralis terápia". */
  title: string;
  /** The one-line summary the source calls `short`. */
  short?: React.ReactNode;
  /** Cloudinary public id from assets/imagery.md — resolved against cloud dcwv2corw. */
  imageId?: string;
  /** Explicit image URL; wins over imageId. */
  imageUrl?: string;
  href?: string;
  linkLabel?: string;
  style?: React.CSSProperties;
}

export declare function TherapyCard(props: TherapyCardProps): JSX.Element;
```

**Design intent**

One cell of the therapies grid. Photo on top at 4:3, title, the source's `short` line, then "Részletek".

```jsx
<TherapyCard title="Visceralis terápia" short="Belsőszervi eredetű panaszok manuális kezelése"
  imageId="Visceral_key38l" href="#/therapy/visceralis_terapia" />
```

Photo scales 1.04 on hover, the card lifts 2px, the arrow nudges 3px. Grid is 3-up → 2-up → 1-up at 1024 / 768. Image ids live in `assets/imagery.md`.

**Implementation** (`TherapyCard.jsx`)

```jsx
import React from "react";
import { Card } from "../core/Card.jsx";

const CLOUD = "https://res.cloudinary.com/dcwv2corw/image/upload";

export function TherapyCard({ title, short, imageId, imageUrl, href, linkLabel = "Részletek", style }) {
  const [hover, setHover] = React.useState(false);
  const src = imageUrl || (imageId ? CLOUD + "/c_fill,w_640,h_480,q_auto,f_auto/" + encodeURIComponent(imageId) : null);

  return (
    <Card
      surface="mesh"
      padding="none"
      radius="lg"
      interactive
      href={href}
      style={{ display: "flex", flexDirection: "column", height: "100%", ...style }}
    >
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ position: "relative", aspectRatio: "4 / 3", overflow: "hidden", background: "var(--plum-100)" }}
      >
        {src ? (
          <img
            src={src}
            alt={title}
            loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover", transform: hover ? "scale(1.04)" : "none", transition: "transform var(--dur-slow) var(--ease-soft)" }}
          />
        ) : null}
      </div>
      <div style={{ padding: "20px 22px 22px", display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
        <h3 style={{ fontSize: "var(--heading-3-size)", lineHeight: "var(--heading-3-line)", letterSpacing: "var(--heading-3-track)", fontWeight: "var(--heading-3-weight)" }}>{title}</h3>
        <p style={{ fontSize: "var(--body-sm-size)", lineHeight: "var(--body-sm-line)", color: "var(--text-muted)", flex: 1 }}>{short}</p>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginTop: "6px", fontSize: "var(--label-size)", fontWeight: "var(--label-weight)", color: "var(--text-link)" }}>
          {linkLabel}
          <i className="fa-solid fa-arrow-right" aria-hidden="true" style={{ fontSize: "11px", transform: hover ? "translateX(3px)" : "none", transition: "transform var(--dur-fast) var(--ease-soft)" }} />
        </span>
      </div>
    </Card>
  );
}
```

---

## forms/

### NewsletterSignup

**Prop contract** (`NewsletterSignup.d.ts`)

```ts
import * as React from "react";

/**
 * Newsletter signup block: title, inline e-mail field with submit button, and a short note.
 * After submit the field is replaced by the success message.
 * tone="onAccent" for the plum footer and gradient bands.
 */
export interface NewsletterSignupProps {
  title?: string;
  note?: string;
  placeholder?: string;
  cta?: string;
  successMessage?: string;
  tone?: "default" | "onAccent";
  /** Called with the entered address on submit. */
  onSubmit?: (email: string) => void;
  style?: React.CSSProperties;
}

export declare function NewsletterSignup(props: NewsletterSignupProps): JSX.Element;
```

**Design intent**

Newsletter signup block. One column: title, an inline pill with the e-mail field and its submit button, and a caption-size note. Submitting swaps the field for the success message — nothing is sent anywhere.

\`\`\`jsx
<NewsletterSignup />                                  /* light surfaces */
<NewsletterSignup tone="onAccent" />                  /* plum footer, gradient band */
<NewsletterSignup cta="Kérem" onSubmit={handle} />
\`\`\`

Use it wherever the practice collects e-mail addresses — it replaced the address/e-mail column in the footer.

**Implementation** (`NewsletterSignup.jsx`)

```jsx
import React from "react";
import { Button } from "../core/Button.jsx";

export function NewsletterSignup({
  title = "Iratkozz fel a hírlevelemre",
  note = "Havonta egy levél gyakorlatokkal és tippekkel. Bármikor leiratkozhatsz.",
  placeholder = "E-mail címed",
  cta = "Feliratkozom",
  successMessage = "Köszönöm! Hamarosan jelentkezem az első levéllel.",
  tone = "default",
  onSubmit,
  style,
}) {
  const [email, setEmail] = React.useState("");
  const [sent, setSent] = React.useState(false);
  const [focus, setFocus] = React.useState(false);
  const onAccent = tone === "onAccent";

  const titleColor = onAccent ? "var(--text-on-accent)" : "var(--text-strong)";
  const noteColor = onAccent ? "var(--text-on-accent-muted)" : "var(--text-muted)";

  const submit = (e) => {
    e.preventDefault();
    if (!email) return;
    if (onSubmit) onSubmit(email);
    setSent(true);
  };

  return (
    <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "var(--gap-stack)", minWidth: "260px", maxWidth: "360px", ...style }}>
      <span style={{ fontSize: "var(--body-md-size)", fontWeight: "var(--weight-bold)", color: titleColor }}>{title}</span>
      {sent ? (
        <span style={{ display: "flex", gap: "var(--gap-inline)", alignItems: "flex-start", fontSize: "var(--body-sm-size)", lineHeight: "var(--body-sm-line)", color: noteColor }}>
          <i className="fa-solid fa-circle-check" aria-hidden="true" style={{ marginTop: "3px", color: onAccent ? "var(--white)" : "var(--rose-500)" }} />
          {successMessage}
        </span>
      ) : (
        <>
          <div style={{ display: "flex", gap: "8px", alignItems: "center", padding: "6px 6px 6px 16px", borderRadius: "var(--radius-pill)", background: onAccent ? "rgba(255,255,255,.12)" : "var(--surface-card)", boxShadow: focus ? (onAccent ? "inset 0 0 0 1.5px rgba(255,255,255,.6)" : "inset 0 0 0 1.5px var(--lilac-500), var(--shadow-ring-focus)") : (onAccent ? "inset 0 0 0 1px var(--line-on-accent)" : "var(--shadow-ring-hairline)"), transition: "box-shadow var(--dur-fast) var(--ease-soft)" }}>
            <i className="fa-solid fa-envelope" aria-hidden="true" style={{ color: onAccent ? "var(--text-on-accent-muted)" : "var(--text-subtle)", fontSize: "15px" }} />
            <input
              type="email"
              name="email"
              required
              value={email}
              placeholder={placeholder}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              aria-label={title}
              style={{ flex: 1, minWidth: 0, border: "none", outline: "none", background: "transparent", fontFamily: "var(--font-body)", fontSize: "var(--body-sm-size)", color: onAccent ? "var(--text-on-accent)" : "var(--text-strong)" }}
            />
            <Button type="submit" size="sm" variant={onAccent ? "onAccent" : "primary"}>{cta}</Button>
          </div>
          <span style={{ fontSize: "var(--caption-size)", lineHeight: "var(--caption-line)", color: noteColor }}>{note}</span>
        </>
      )}
    </form>
  );
}
```

### TextField

**Prop contract** (`TextField.d.ts`)

```ts
import * as React from "react";

/**
 * Single-line form field. 14px radius (inputs are the one thing that isn't a pill),
 * hairline inset shadow at rest, lilac ring on focus, rose-red ring when invalid.
 */
export interface TextFieldProps {
  /** Hungarian field label, e.g. "Neved". */
  label?: React.ReactNode;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: "text" | "email" | "tel" | "password" | "date";
  name?: string;
  /** Font Awesome 6 class string, shown before the input. */
  icon?: string;
  helper?: React.ReactNode;
  /** Presence switches the field to its error styling. */
  error?: React.ReactNode;
  disabled?: boolean;
  required?: boolean;
  style?: React.CSSProperties;
}

export declare function TextField(props: TextFieldProps): JSX.Element;
```

**Design intent**

Single-line input. Forward-looking: the live site has no forms yet, so treat this as the pattern for the contact form when it lands.

```jsx
<TextField label="Neved" placeholder="Kirilla Réka" required />
<TextField label="E-mail" type="email" icon="fa-solid fa-envelope" error="Kérlek adj meg egy érvényes e-mail címet." />
```

Inputs use `--radius-input` (14px), not the pill. Minimum height 44px. Labels are Hungarian and sentence case.

**Implementation** (`TextField.jsx`)

```jsx
import React from "react";

export function TextField({ label, value, onChange, placeholder, type = "text", name, icon, helper, error, disabled = false, required = false, style }) {
  const [focus, setFocus] = React.useState(false);
  const invalid = Boolean(error);
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: "8px", width: "100%", ...style }}>
      {label ? (
        <span style={{ fontSize: "var(--label-size)", fontWeight: "var(--label-weight)", letterSpacing: "var(--label-track)", color: "var(--text-strong)" }}>
          {label}
          {required ? <span style={{ color: "var(--feedback-error)" }}> *</span> : null}
        </span>
      ) : null}
      <span
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--gap-inline)",
          padding: "12px 16px",
          borderRadius: "var(--radius-input)",
          background: disabled ? "var(--surface-sunken)" : "var(--surface-card)",
          boxShadow: invalid
            ? "inset 0 0 0 1.5px var(--feedback-error)"
            : focus
            ? "inset 0 0 0 1.5px var(--lilac-500), var(--shadow-ring-focus)"
            : "var(--shadow-ring-hairline)",
          opacity: disabled ? 0.6 : 1,
          transition: "box-shadow var(--dur-fast) var(--ease-soft)",
        }}
      >
        {icon ? <i className={icon} aria-hidden="true" style={{ color: "var(--text-subtle)", fontSize: "15px" }} /> : null}
        <input
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          onChange={onChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            background: "transparent",
            fontSize: "var(--body-md-size)",
            color: "var(--text-strong)",
            minWidth: 0,
          }}
        />
      </span>
      {error || helper ? (
        <span style={{ fontSize: "var(--caption-size)", lineHeight: "var(--caption-line)", color: invalid ? "var(--feedback-error)" : "var(--text-muted)" }}>
          {error || helper}
        </span>
      ) : null}
    </label>
  );
}
```

### Textarea

**Prop contract** (`Textarea.d.ts`)

```ts
import * as React from "react";

/** Multi-line field. Same shell as TextField; vertical resize only. */
export interface TextareaProps {
  label?: React.ReactNode;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  name?: string;
  rows?: number;
  helper?: React.ReactNode;
  error?: React.ReactNode;
  disabled?: boolean;
  required?: boolean;
  style?: React.CSSProperties;
}

export declare function Textarea(props: TextareaProps): JSX.Element;
```

**Design intent**

Multi-line field for the message body of a contact form.

```jsx
<Textarea label="Miben segíthetek?" rows={5} helper="Írd le röviden, mi a panaszod." />
```

Same radius, ring and error behaviour as `TextField`. Resize is vertical only.

**Implementation** (`Textarea.jsx`)

```jsx
import React from "react";

export function Textarea({ label, value, onChange, placeholder, name, rows = 4, helper, error, disabled = false, required = false, style }) {
  const [focus, setFocus] = React.useState(false);
  const invalid = Boolean(error);
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: "8px", width: "100%", ...style }}>
      {label ? (
        <span style={{ fontSize: "var(--label-size)", fontWeight: "var(--label-weight)", letterSpacing: "var(--label-track)", color: "var(--text-strong)" }}>
          {label}
          {required ? <span style={{ color: "var(--feedback-error)" }}> *</span> : null}
        </span>
      ) : null}
      <textarea
        name={name}
        rows={rows}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        onChange={onChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          width: "100%",
          resize: "vertical",
          padding: "14px 16px",
          border: "none",
          outline: "none",
          borderRadius: "var(--radius-input)",
          background: disabled ? "var(--surface-sunken)" : "var(--surface-card)",
          boxShadow: invalid
            ? "inset 0 0 0 1.5px var(--feedback-error)"
            : focus
            ? "inset 0 0 0 1.5px var(--lilac-500), var(--shadow-ring-focus)"
            : "var(--shadow-ring-hairline)",
          fontSize: "var(--body-md-size)",
          lineHeight: "var(--body-md-line)",
          color: "var(--text-strong)",
          opacity: disabled ? 0.6 : 1,
          transition: "box-shadow var(--dur-fast) var(--ease-soft)",
        }}
      />
      {error || helper ? (
        <span style={{ fontSize: "var(--caption-size)", lineHeight: "var(--caption-line)", color: invalid ? "var(--feedback-error)" : "var(--text-muted)" }}>
          {error || helper}
        </span>
      ) : null}
    </label>
  );
}
```

---

## navigation/

### BackToTop

**Prop contract** (`BackToTop.d.ts`)

```ts
import * as React from "react";

/**
 * Fixed back-to-top circle. Glass over the mesh; the chevron keeps the source's 2s alternating hop,
 * which is the one bit of playful motion the system allows.
 */
export interface BackToTopProps {
  /** Show after the user has scrolled. Fades and slides 8px when hidden. */
  visible?: boolean;
  onClick?: (event: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

export declare function BackToTop(props: BackToTopProps): JSX.Element;
```

**Design intent**

Fixed 52px glass circle, bottom-right, appears once the page has scrolled.

```jsx
<BackToTop visible={scrolled} onClick={() => scroller.scrollTo({ top: 0, behavior: "smooth" })} />
```

Keep the hopping chevron — it is inherited from the live site and is deliberate. Position is fixed at 48px bottom / 20px right; nothing else in the system is pinned except the header.

**Implementation** (`BackToTop.jsx`)

```jsx
import React from "react";

export function BackToTop({ visible = true, onClick, style }) {
  const [hover, setHover] = React.useState(false);
  return (
    <>
      <button
        type="button"
        aria-label="Vissza a lap tetejére"
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          position: "fixed",
          bottom: "48px",
          right: "20px",
          zIndex: 40,
          width: "52px",
          height: "52px",
          border: "none",
          borderRadius: "var(--radius-circle)",
          background: "var(--surface-glass)",
          backdropFilter: "var(--blur-glass)",
          WebkitBackdropFilter: "var(--blur-glass)",
          color: "var(--rose-600)",
          fontSize: "19px",
          cursor: "pointer",
          boxShadow: hover ? "var(--shadow-lg)" : "var(--shadow-md)",
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
          transform: visible ? "none" : "translateY(8px)",
          transition: "opacity var(--dur-base) var(--ease-soft), transform var(--dur-base) var(--ease-soft), box-shadow var(--dur-base) var(--ease-soft)",
          ...style,
        }}
      >
        <i className="fa-solid fa-chevron-up" aria-hidden="true" style={{ animation: "kpJump 2s infinite alternate" }} />
      </button>
      <style>{`@keyframes kpJump{0%{transform:translateY(0)}10%{transform:translateY(-4px)}20%{transform:translateY(0)}30%{transform:translateY(-4px)}40%{transform:translateY(0)}}`}</style>
    </>
  );
}
```

### Footer

**Prop contract** (`Footer.d.ts`)

```ts
import * as React from "react";
import { WeeklyMessageProps } from "./WeeklyMessage";
import { NewsletterSignupProps } from "../forms/NewsletterSignup";

export interface PolicyLink {
  label: string;
  href: string;
}

export interface SocialLink {
  /** Font Awesome brand class, e.g. "fa-brands fa-tiktok". */
  icon: string;
  href: string;
  /** Hungarian aria-label, verbatim from the source. */
  label: string;
}

/**
 * Site footer on the plum-800 surface: wordmark with the newsletter signup, social row, policy links.
 * Defaults carry the real practice details.
 */
export interface FooterProps {
  socialLabel?: string;
  /** Passed through to the footer NewsletterSignup (tone is already onAccent). */
  newsletterProps?: NewsletterSignupProps;
  policyLinks?: PolicyLink[];
  socials?: SocialLink[];
  /** Show the weekly positive-message band at the top of the footer. Default true. */
  weekly?: boolean;
  /** Passed through to WeeklyMessage. */
  weeklyProps?: WeeklyMessageProps;
  style?: React.CSSProperties;
}

export declare function Footer(props: FooterProps): JSX.Element;
```

**Design intent**

Site footer. The only place the deep plum surface (`--surface-invert`) is used at full-bleed.

```jsx
<Footer />                                  /* newsletter signup, socials and policy links are the defaults */
<Footer newsletterProps={{ title: "Hírlevél" }} />
<Footer weekly={false} />
```

The first column is the wordmark plus `NewsletterSignup` (tone `onAccent`) — the address and e-mail address no longer live here; the contacts screen carries them.

Social aria-labels are Hungarian sentences, copied from the source — don't shorten them to "Instagram". The four networks are Facebook, Instagram, TikTok, YouTube, in that order.

**Implementation** (`Footer.jsx`)

```jsx
import React from "react";
import { Wordmark } from "../brand/Wordmark.jsx";
import { IconButton } from "../core/IconButton.jsx";
import { WeeklyMessage } from "./WeeklyMessage.jsx";
import { NewsletterSignup } from "../forms/NewsletterSignup.jsx";

const SOCIALS = [
  { icon: "fa-brands fa-facebook", href: "https://www.facebook.com/kirillaphysio/", label: "Ide kattintva tudod felkeresni a Facebook profilomat" },
  { icon: "fa-brands fa-instagram", href: "https://www.instagram.com/kirilla_physio/", label: "Ide kattintva tudod felkeresni az Instagram profilomat" },
  { icon: "fa-brands fa-tiktok", href: "https://www.tiktok.com/@kirilla_physio", label: "Ide kattintva tudod felkeresni a TikTok profilomat" },
  { icon: "fa-brands fa-youtube", href: "https://www.youtube.com/channel/UCN9ZM4g1KHw_8GTmYq9cG2g", label: "Ide kattintva tudod felkeresni a YouTube csatornámat" },
];

const POLICY = [
  { label: "Ászf", href: "#/terms" },
  { label: "Adatkezelési tájékoztató", href: "#/privacy" },
  { label: "Cookie nyilatkozat", href: "#/cookie" },
];

export function Footer({ socialLabel = "Vedd fel velem a kapcsolatot a közösségi média oldalaimon!", newsletterProps, policyLinks = POLICY, socials = SOCIALS, assetBase = "assets/", weekly = true, weeklyProps, style }) {
  return (
    <footer style={{ background: "var(--surface-invert)", color: "var(--text-on-accent)", ...style }}>
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "56px var(--container-pad) 28px", display: "flex", flexWrap: "wrap", gap: "var(--space-10)", justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--gap-stack)", minWidth: "240px" }}>
          <Wordmark tone="onAccent" mark={false} assetBase={assetBase} />
          <NewsletterSignup tone="onAccent" {...newsletterProps} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--gap-stack)", maxWidth: "320px" }}>
          <span style={{ fontSize: "var(--body-sm-size)", color: "var(--text-on-accent-muted)" }}>{socialLabel}</span>
          <div style={{ display: "flex", gap: "var(--gap-inline)" }}>
            {socials.map((s) => (
              <IconButton key={s.href} icon={s.icon} ariaLabel={s.label} href={s.href} variant="plain" size="sm" style={{ background: "rgba(255,255,255,.12)", color: "var(--white)" }} />
            ))}
          </div>
        </div>
        {weekly ? <WeeklyMessage {...weeklyProps} /> : null}
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,.14)" }}>
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "16px var(--container-pad)", display: "flex", flexWrap: "wrap", gap: "var(--space-4)", justifyContent: "space-between", fontSize: "var(--caption-size)", color: "var(--text-on-accent-muted)" }}>
          <div style={{ display: "flex", gap: "var(--space-4)", flexWrap: "wrap" }}>
            {policyLinks.map((p) => (
              <a key={p.href} href={p.href} style={{ color: "var(--text-on-accent-muted)" }}>{p.label}</a>
            ))}
          </div>
          <span>© {new Date().getFullYear()} Kirilla Réka</span>
        </div>
      </div>
    </footer>
  );
}
```

### Header

**Prop contract** (`Header.d.ts`)

```ts
import * as React from "react";

export interface NavItem {
  label: string;
  /** Hash route, e.g. "#/individual-treatments". */
  href: string;
}

/**
 * Site header: type wordmark, pill nav, one primary CTA. Glass over the pastel mesh, sticky.
 * Collapses to a hamburger sheet below 860px.
 */
export interface HeaderProps {
  items: NavItem[];
  /** href of the current route — that pill fills rose-100. */
  activeHref?: string;
  /** Intercepts clicks for in-page routing. */
  onNavigate?: (href: string) => void;
  ctaLabel?: string;
  ctaHref?: string;
  sticky?: boolean;
  style?: React.CSSProperties;
}

export declare function Header(props: HeaderProps): JSX.Element;
```

**Design intent**

The site header. Glass + blur so the pastel mesh reads through it; sticky at the top.

```jsx
<Header activeHref="#/" onNavigate={setRoute} ctaHref="https://kirillareka.salonic.hu/"
  items={[
    { label: "Kezdőlap", href: "#/" },
    { label: "Online programok", href: "https://oktatas.kirillareka.hu/" },
    { label: "Egyéni kezelések", href: "#/individual-treatments" },
    { label: "Kapcsolat", href: "#/contacts" },
  ]} />
```

Nav order is the source's order — keep it. One primary CTA only. Below 860px the nav becomes a hamburger sheet.

**Implementation** (`Header.jsx`)

```jsx
import React from "react";
import { Wordmark } from "../brand/Wordmark.jsx";
import { Button } from "../core/Button.jsx";
import { IconButton } from "../core/IconButton.jsx";

export function Header({ items = [], activeHref, onNavigate, ctaLabel = "Időpontot foglalok", ctaHref, sticky = true, assetBase = "assets/", style }) {
  const [open, setOpen] = React.useState(false);
  const [hover, setHover] = React.useState(null);

  const link = (item) => {
    const active = item.href === activeHref;
    const hot = hover === item.href;
    return (
      <a
        key={item.href}
        href={item.href}
        onClick={(e) => { if (onNavigate) { e.preventDefault(); onNavigate(item.href); setOpen(false); } }}
        onMouseEnter={() => setHover(item.href)}
        onMouseLeave={() => setHover(null)}
        style={{
          padding: "9px 16px",
          borderRadius: "var(--radius-pill)",
          fontSize: "var(--body-sm-size)",
          fontWeight: active ? "var(--weight-bold)" : "var(--weight-semibold)",
          color: active ? "var(--rose-700)" : "var(--text-body)",
          background: active ? "var(--rose-100)" : hot ? "var(--plum-100)" : "transparent",
          textDecoration: "none",
          whiteSpace: "nowrap",
          transition: "var(--transition-control)",
        }}
      >
        {item.label}
      </a>
    );
  };

  return (
    <header
      style={{
        position: sticky ? "sticky" : "relative",
        top: 0,
        zIndex: 50,
        background: "var(--surface-glass)",
        backdropFilter: "var(--blur-glass)",
        WebkitBackdropFilter: "var(--blur-glass)",
        boxShadow: "0 1px 0 var(--line-hairline)",
        ...style,
      }}
    >
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "14px var(--container-pad)", display: "flex", alignItems: "center", gap: "var(--space-6)" }}>
        <Wordmark href={items.length ? items[0].href : "#/"} assetBase={assetBase} style={{ flex: "0 0 auto" }} />
        <nav style={{ display: "flex", gap: "4px", marginLeft: "auto" }} className="kp-nav-desktop">
          {items.map(link)}
        </nav>
        <div className="kp-nav-desktop">
          {ctaHref ? <Button size="sm" href={ctaHref}>{ctaLabel}</Button> : null}
        </div>
        <div className="kp-nav-mobile" style={{ marginLeft: "auto" }}>
          <IconButton icon={open ? "fa-solid fa-xmark" : "fa-solid fa-bars"} ariaLabel="menü" variant="soft" onClick={() => setOpen(!open)} />
        </div>
      </div>
      {open ? (
        <div className="kp-nav-mobile" style={{ padding: "0 var(--container-pad) 18px", display: "flex", flexDirection: "column", gap: "6px" }}>
          {items.map(link)}
          {ctaHref ? <Button size="md" href={ctaHref} fullWidth style={{ marginTop: "8px" }}>{ctaLabel}</Button> : null}
        </div>
      ) : null}
      <style>{`.kp-nav-mobile{display:none}@media(max-width:1040px){.kp-nav-desktop{display:none!important}.kp-nav-mobile{display:block}}`}</style>
    </header>
  );
}
```

### WeeklyMessage

**Prop contract** (`WeeklyMessage.d.ts`)

```ts
import * as React from "react";

export interface WeeklyTopic {
  /** Editorial name of the topic — not rendered, it only labels the row. */
  label: string;
  /** Font Awesome class, e.g. "fa-solid fa-moon". */
  icon: string;
}

export interface WeeklyEntry {
  /** 1–52. */
  week: number;
  /** Key into the topics map. */
  topic: string;
  /** Hungarian message. Empty string renders the placeholder slot. */
  text: string;
}

/** The eight topics with their glyphs. */
export declare const WEEKLY_TOPICS: Record<string, WeeklyTopic>;
/** 52 entries, topics rotating; texts are empty until the practice supplies them. */
export declare const WEEKLY_MESSAGES: WeeklyEntry[];
/** ISO-8601 week number for a date (defaults to today). */
export declare function isoWeek(date?: Date): number;

/**
 * A short positive message that changes every week, sitting as one column inside the footer.
 * The week number picks the entry, so it advances on its own and needs no scheduling.
 * The topic only chooses the icon — its name is never shown.
 */
export interface WeeklyMessageProps {
  /** Eyebrow prefix before the topic name. */
  label?: string;
  messages?: WeeklyEntry[];
  topics?: Record<string, WeeklyTopic>;
  /** Force a week (1–52) instead of today's — for previews. */
  week?: number;
  style?: React.CSSProperties;
}

export declare function WeeklyMessage(props: WeeklyMessageProps): JSX.Element;
```

**Design intent**

A short positive message that changes every week, sitting as one column inside the footer next to the address and the social row — no band, no separate surface. Nothing schedules it: the ISO week number indexes into a 52-entry list, so it advances by itself and loops each year.

```jsx
<WeeklyMessage />                    /* this week's entry */
<WeeklyMessage week={12} />          /* force a week, for previews */
<Footer weekly={false} />            /* footer without the band */
```

The list lives in `WEEKLY_MESSAGES` (`WeeklyMessage.jsx`) — 52 rows of `{ week, topic, text }`, all written, topics rotating through the eight in `WEEKLY_TOPICS`. The topic name is never rendered — it only picks the icon that sits beside the message: motiváció, önszeretet, mentális egészség, testpozitivitás, mozgás öröme, pihenés és regeneráció, türelem a gyógyulásban, testtudatosság.

Every `text` is written in the practice's voice: warm, second person, one or two sentences, never a medical promise. An empty row falls back to a dashed monospace slot naming the week rather than inventing copy. Keep replacements in the same register — speaking to a patient, not motivating a crowd.

**Implementation** (`WeeklyMessage.jsx`)

```jsx
import React from "react";

/** The eight topics, each with its Font Awesome glyph. */
export const WEEKLY_TOPICS = {
  motivacio: { label: "Motiváció", icon: "fa-solid fa-bolt" },
  onszeretet: { label: "Önszeretet", icon: "fa-solid fa-heart" },
  mentalis: { label: "Mentális egészség", icon: "fa-solid fa-brain" },
  testpozitivitas: { label: "Testpozitivitás", icon: "fa-solid fa-person-rays" },
  mozgas: { label: "Mozgás öröme", icon: "fa-solid fa-person-running" },
  pihenes: { label: "Pihenés és regeneráció", icon: "fa-solid fa-moon" },
  turelem: { label: "Türelem a gyógyulásban", icon: "fa-solid fa-hourglass-half" },
  testtudatossag: { label: "Testtudatosság", icon: "fa-solid fa-spa" },
};

/**
 * 52 weeks, one message each, topics rotating through WEEKLY_TOPICS.
 * Fill in `text` — an empty string renders the placeholder slot.
 */
export const WEEKLY_MESSAGES = [
  { week: 1, topic: "motivacio", text: "A haladás nem mindig látványos. Néha az a győzelem, hogy ma is elvégezted a gyakorlataidat." },
  { week: 2, topic: "onszeretet", text: "Ma is megérdemelsz tíz percet magadra. Ez nem jutalom, hanem szükséglet." },
  { week: 3, topic: "mentalis", text: "A feszes váll gyakran a fejben kezdődik. Ha megállsz és lassan kifújod a levegőt, a tested is követi." },
  { week: 4, topic: "testpozitivitas", text: "A tested nem projekt, amit be kell fejezni. Veled van minden nap, és mindent megtesz érted." },
  { week: 5, topic: "mozgas", text: "A mozgásnak nem kell tökéletesnek lennie ahhoz, hogy jót tegyen. Elég, ha jólesik." },
  { week: 6, topic: "pihenes", text: "A pihenés is a gyógyulás része. A tested akkor épül, amikor megengeded neki." },
  { week: 7, topic: "turelem", text: "A gyógyulás ritkán egyenes út. Egy rosszabb nap nem törli el azt, amit eddig felépítettél." },
  { week: 8, topic: "testtudatossag", text: "Figyeld meg ma egyszer, hogyan ülsz. A tested apró jelekkel szól, jóval a fájdalom előtt." },
  { week: 9, topic: "motivacio", text: "Nem kell nagy lépés. Egy tízperces séta ma többet ér, mint egy tökéletes terv holnapra." },
  { week: 10, topic: "onszeretet", text: "Beszélj magaddal úgy, ahogy a barátodhoz szólnál egy nehéz nap után." },
  { week: 11, topic: "mentalis", text: "A stressz a testben is lakik. Ha a válladat leengeded, a fejed is könnyebb lesz." },
  { week: 12, topic: "testpozitivitas", text: "A tested minden nap dolgozik érted, akkor is, amikor nem vagy elégedett vele." },
  { week: 13, topic: "mozgas", text: "Keresd meg azt a mozgásformát, amit szívesen csinálsz. Az fog megmaradni." },
  { week: 14, topic: "pihenes", text: "Az izom nem az edzés alatt erősödik, hanem utána, amikor pihen." },
  { week: 15, topic: "turelem", text: "A szövetek a saját tempójukban gyógyulnak, nem a naptár szerint." },
  { week: 16, topic: "testtudatossag", text: "Vedd észre, hogyan tartod a válladat, amikor a telefonodat nézed." },
  { week: 17, topic: "motivacio", text: "A rendszeresség erősebb, mint a lelkesedés. A rossz napokon is működik." },
  { week: 18, topic: "onszeretet", text: "A tested nem hibázott, amikor megfájdult. Jelzett." },
  { week: 19, topic: "mentalis", text: "Három lassú kilégzés. Ennyi kell ahhoz, hogy az idegrendszered váltson." },
  { week: 20, topic: "testpozitivitas", text: "Nem az a kérdés, hogyan néz ki. Az, hogy hogyan érzed magad benne." },
  { week: 21, topic: "mozgas", text: "A mozgás nem büntetés. Ajándék a testednek." },
  { week: 22, topic: "pihenes", text: "Az alvás a legolcsóbb regeneráció, ami létezik." },
  { week: 23, topic: "turelem", text: "Ami évek alatt alakult ki, az nem egy kezelés alatt oldódik." },
  { week: 24, topic: "testtudatossag", text: "A test előbb suttog, mint kiabál. Érdemes a suttogásra figyelni." },
  { week: 25, topic: "motivacio", text: "Amit ma megmozgatsz, azt a tested holnap megköszöni." },
  { week: 26, topic: "onszeretet", text: "Nem kell kiérdemelned a pihenést." },
  { week: 27, topic: "mentalis", text: "Nem kell mindent egyszerre megoldanod. Csak a következő lépést." },
  { week: 28, topic: "testpozitivitas", text: "Hasonlítsd magad a tegnapi önmagadhoz, ne máshoz." },
  { week: 29, topic: "mozgas", text: "Nem kell edzésnek hívni. A tánc a konyhában is számít." },
  { week: 30, topic: "pihenes", text: "A szünet nem kiesés a folyamatból. Része a folyamatnak." },
  { week: 31, topic: "turelem", text: "A javulás gyakran csendes: kevesebb fájdalom, jobb alvás, könnyebb mozdulat." },
  { week: 32, topic: "testtudatossag", text: "Állj fel óránként egyszer. A legjobb testtartás a következő." },
  { week: 33, topic: "motivacio", text: "Ha kimaradt egy hét, nem kezdted elölről. Csak folytatod ott, ahol abbahagytad." },
  { week: 34, topic: "onszeretet", text: "Ma engedd el egy elvárásodat magaddal szemben. Csak egyet." },
  { week: 35, topic: "mentalis", text: "A rossz alvás a legjobb terápiát is visszafogja. Kezdd ott." },
  { week: 36, topic: "testpozitivitas", text: "A hegek, a változások, az évek mind arról szólnak, hogy éltél." },
  { week: 37, topic: "mozgas", text: "A legjobb gyakorlat az, amit tényleg elvégzel." },
  { week: 38, topic: "pihenes", text: "Ha fáradtan feszítesz tovább, a tested nem fejlődik, csak kopik." },
  { week: 39, topic: "turelem", text: "Ha ma nem érzed a változást, attól még történik." },
  { week: 40, topic: "testtudatossag", text: "Figyeld a légzésedet egy percig. Hasból vagy mellkasból veszed a levegőt?" },
  { week: 41, topic: "motivacio", text: "A cél nem az, hogy kibírd. Az, hogy jól legyél közben." },
  { week: 42, topic: "onszeretet", text: "Az önmagadra fordított idő nem önzés, hanem karbantartás." },
  { week: 43, topic: "mentalis", text: "Ha kimondod, mi nyomaszt, a tested is könnyebben enged." },
  { week: 44, topic: "testpozitivitas", text: "A tested nem ellenfél, akit le kell győzni. Partner, akivel együtt dolgozol." },
  { week: 45, topic: "mozgas", text: "Ha ma nincs erőd az egészhez, csinálj belőle ötöt. Az is mozgás." },
  { week: 46, topic: "pihenes", text: "Egy nyugodt este többet segít a hátadon, mint egy újabb gyakorlat." },
  { week: 47, topic: "turelem", text: "Ne csak a fájdalom eltűnését várd. Figyeld azt is, mennyit bírsz már." },
  { week: 48, topic: "testtudatossag", text: "Amikor emelsz, előbb a lábad dolgozzon, csak utána a hátad." },
  { week: 49, topic: "motivacio", text: "Kezdd a legkisebb gyakorlattal, amit biztosan meg tudsz csinálni. A többi jön magától." },
  { week: 50, topic: "onszeretet", text: "Elég vagy úgy, ahogy most vagy — a gyógyulás közepén is." },
  { week: 51, topic: "mentalis", text: "A pihent fej könnyebben viseli a fájdalmat is. Ez nem gyengeség, hanem élettan." },
  { week: 52, topic: "testpozitivitas", text: "Köszönj meg ma a testednek egy dolgot, amit magától tud." },
];

export function isoWeek(date = new Date()) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const jan1 = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - jan1) / 86400000 + 1) / 7);
}

export function WeeklyMessage({ label = "A hét üzenete", messages = WEEKLY_MESSAGES, topics = WEEKLY_TOPICS, week, style }) {
  const list = messages && messages.length ? messages : WEEKLY_MESSAGES;
  const w = week || isoWeek();
  const entry = list[(w - 1 + list.length * 100) % list.length] || {};
  const topic = topics[entry.topic] || { icon: "fa-solid fa-heart" };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--gap-stack)", minWidth: "240px", maxWidth: "340px", ...style }}>
      <span style={{ fontSize: "var(--body-sm-size)", color: "var(--text-on-accent-muted)" }}>{label}</span>
      {entry.text ? (
        <p style={{ margin: 0, display: "flex", gap: "var(--gap-inline)", alignItems: "flex-start", fontSize: "var(--body-md-size)", lineHeight: "var(--body-md-line)", fontWeight: "var(--weight-medium)", letterSpacing: "-.1px", textWrap: "pretty" }}>
          <i className={topic.icon} aria-hidden="true" style={{ marginTop: "5px", fontSize: "0.9em", color: "var(--text-on-accent-muted)" }} />
          <span>{entry.text}</span>
        </p>
      ) : (
        <span style={{ display: "inline-flex", alignItems: "center", gap: "var(--gap-inline)", minHeight: "34px", padding: "6px 14px", borderRadius: "var(--radius-sm)", border: "1px dashed rgba(255,255,255,.34)", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: "12.5px", letterSpacing: ".2px", color: "var(--text-on-accent-muted)" }}>
          <i className={topic.icon} aria-hidden="true" />
          heti üzenet · {w}. hét
        </span>
      )}
    </div>
  );
}
```
