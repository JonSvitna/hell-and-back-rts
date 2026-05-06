const { useState, useEffect, useRef } = React;
const CinematicHero = window.CinematicHero;

/* ── Inline SVG glyphs ───────────────────────────────── */
const Glyph = {
  clock: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>
    </svg>
  ),
  bolt: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M13 3 4 14h6l-1 7 9-11h-6l1-7z"/>
    </svg>
  ),
  signal: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M3 20h18M6 20v-4M11 20V11M16 20V6M21 20V3"/>
    </svg>
  ),
  device: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <rect x="6" y="2" width="12" height="20" rx="2"/><path d="M10 18h4"/>
    </svg>
  ),
  cross: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M4 4l16 16M20 4 4 20"/>
    </svg>
  ),
  arrow: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M5 12h14M13 6l6 6-6 6"/>
    </svg>
  ),
  target: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2"/>
    </svg>
  ),
};

/* ── Nav ──────────────────────────────────────────────── */
const Nav = () => (
  <nav className="nav">
    <div className="nav-inner">
      <a className="brand" href="#top">
        <span className="brand-mark">
          <svg viewBox="0 0 32 32" aria-hidden="true">
            <path d="M4 26 L16 4 L28 26 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
            <path d="M10 26 L16 14 L22 26" fill="none" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </span>
        <span className="brand-word">HELL <em>&amp;</em> BACK</span>
        <span className="brand-tag">RTS</span>
      </a>
      <ul className="nav-links">
        <li><a href="#factions">Factions</a></li>
        <li><a href="#mobile">Mobile</a></li>
        <li><a href="#strategy">Strategy</a></li>
        <li><a href="#early-access">Early Access</a></li>
      </ul>
      <a href="#early-access" className="nav-cta">
        Get Early Access <Glyph.arrow width="16" height="16"/>
      </a>
    </div>
  </nav>
);

/* ── Marquee ──────────────────────────────────────────── */
const Marquee = () => {
  const items = [
    '20-MINUTE MATCHES', '◆', 'CROSS-PLATFORM', '◆',
    'NO PAY-TO-WIN', '◆', 'DAILY LADDER', '◆',
    '3 ASYMMETRIC FACTIONS', '◆', 'PLAYTEST 0.7', '◆',
  ];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className={t === '◆' ? 'm-dot' : 'm-item'}>{t}</span>
        ))}
      </div>
    </div>
  );
};

/* ── Factions — interactive asymmetric selector ───────── */
const FactionsSection = () => {
  const [active, setActive] = useState(0);
  const f = FACTIONS[active];

  return (
    <section className="factions" id="factions">
      <header className="section-head">
        <div className="section-eyebrow" data-reveal>// SECTION 02 — CHOOSE YOUR SIDE</div>
        <h2 className="section-title" data-reveal data-delay="1">
          Choose Your<br/>Command Style.
        </h2>
        <p className="section-lede" data-reveal data-delay="2">
          Three factions. No mirror matches. No safe choices.
          Every army changes how you fight.
        </p>
      </header>

      <div className="faction-selector">
        {/* Left: expanded faction card */}
        <div className="faction-main">
          <FactionCard key={active} f={f} idx={active}/>
        </div>

        {/* Right: compact selector tabs */}
        <div className="faction-tabs">
          {FACTIONS.map((ft, i) => (
            <button
              key={ft.key}
              className={`faction-tab${i === active ? ' is-active' : ''}`}
              onClick={() => setActive(i)}
              style={{ '--accent': ft.color }}
              aria-pressed={i === active}
            >
              <div className="ft-code mono">{ft.code}</div>
              <div className="ft-name">{ft.name}</div>
              <div className="ft-role mono">{ft.role}</div>
              <Glyph.arrow
                className="ft-arrow"
                width="14" height="14"
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="faction-decision" data-reveal>
        <p className="faction-decision-q">Which faction would you command?</p>
        <div className="faction-decision-btns">
          {FACTIONS.map(ft => (
            <a
              key={ft.key}
              href="#early-access"
              className="btn btn-ghost faction-decision-btn"
              style={{ '--accent': ft.color }}
              data-faction={ft.key}
            >
              {ft.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── Mobile Gameplay — Bento grid ─────────────────────── */
const MobileGameplaySection = () => (
  <section className="mobile-promise" id="mobile">
    <header className="section-head">
      <div className="section-eyebrow" data-reveal>// SECTION 03 — BUILT FOR iOS</div>
      <h2 className="section-title" data-reveal data-delay="1">
        Built for Your Thumb,<br/>Not a Keyboard.
      </h2>
      <p className="section-lede" data-reveal data-delay="2">
        Command, reposition, and trigger abilities with one hand.
        Every control decision was made for fast mobile battles
        without losing the RTS soul.
      </p>
    </header>

    <div className="bento-grid">

      {/* Cell A — wide left (2 cols) */}
      <article className="bento-cell-a bento-card lg" data-reveal>
        <Glyph.clock className="bento-icon" width="34" height="34"/>
        <div className="bento-text">
          <div className="bento-num mono">M · 01</div>
          <h3>3–5 Minute Battles</h3>
          <p>Matches built to respect your time. Open, fight, decide, rematch — no cooldown timers punishing you for closing the app.</p>
        </div>
      </article>

      {/* Cell B — tall right (1 col) */}
      <article className="bento-cell-b bento-card" data-reveal data-delay="1">
        <div className="bento-num mono">M · 02</div>
        <Glyph.signal className="bento-icon" width="28" height="28"/>
        <h3>Readable Units</h3>
        <p>Faction colors, silhouettes, and HUD built for a phone screen — not a 27" monitor.</p>
      </article>

      {/* Cell C — short left (1 col) */}
      <article className="bento-cell-c bento-card" data-reveal data-delay="1">
        <div className="bento-num mono">M · 03</div>
        <Glyph.device className="bento-icon" width="28" height="28"/>
        <h3>Tap &amp; Drag</h3>
        <p>Tap to command. Drag to reposition. No floating menus.</p>
      </article>

      {/* Cell D — wide right (2 cols) */}
      <article className="bento-cell-d bento-card lg" data-reveal data-delay="2">
        <Glyph.bolt className="bento-icon" width="34" height="34"/>
        <div className="bento-text">
          <div className="bento-num mono">M · 04</div>
          <h3>Real Abilities</h3>
          <p>Meaningful cooldowns. Outplay, don't outclick. Every ability changes the math of the next ten seconds.</p>
        </div>
      </article>

      {/* Cell E — full width (3 cols) */}
      <article className="bento-cell-e bento-card" data-reveal>
        <Glyph.target className="bento-icon" width="36" height="36"/>
        <div className="bento-text">
          <div className="bento-num mono">M · 05</div>
          <h3>Faction-Based Counters</h3>
          <p>
            Every army has a clear identity. Reads matter more than reaction time.
            Vanguard holds. Ascendancy outranges. Hive overwhelms.
          </p>
        </div>
        <div className="bento-ticker" aria-hidden="true">
          <div className="bento-ticker-fill"/>
        </div>
      </article>

    </div>
  </section>
);

/* ── Strategy ─────────────────────────────────────────── */
const StrategySection = () => (
  <section className="strategy" id="strategy">
    <header className="section-head">
      <div className="section-eyebrow" data-reveal>// SECTION 04 — REAL STRATEGY</div>
      <h2 className="section-title" data-reveal data-delay="1">
        Strategy Without<br/>the Waiting Game.
      </h2>
      <p className="section-lede" data-reveal data-delay="2">
        Hell &amp; Back is designed for players who want tactical decisions
        now — not timers, clutter, or endless base menus between fights.
      </p>
    </header>

    <div className="vs-wrap">
      <div className="vs-panel vs-old" data-reveal>
        <div className="vs-label mono">// LEGACY MOBILE STRATEGY</div>
        <ul>
          <li><Glyph.cross className="vs-x" width="16" height="16"/>Build timers that punish closing the app</li>
          <li><Glyph.cross className="vs-x" width="16" height="16"/>Bloated economy &amp; resource menus</li>
          <li><Glyph.cross className="vs-x" width="16" height="16"/>Passive waiting loops disguised as gameplay</li>
          <li><Glyph.cross className="vs-x" width="16" height="16"/>Cluttered HUD optimized for tablets only</li>
          <li><Glyph.cross className="vs-x" width="16" height="16"/>Faction "identity" that's really just stat tweaks</li>
        </ul>
      </div>
      <div className="vs-divider" aria-hidden="true"><span>VS</span></div>
      <div className="vs-panel vs-new" data-reveal data-delay="2">
        <div className="vs-label mono">// HELL &amp; BACK</div>
        <ul>
          <li><span className="vs-check">◆</span> Fast 3–5 minute matches, every time</li>
          <li><span className="vs-check">◆</span> No bloated economy or resource screens</li>
          <li><span className="vs-check">◆</span> No passive waiting loops</li>
          <li><span className="vs-check">◆</span> Readable battlefield design for phones</li>
          <li><span className="vs-check">◆</span> Every faction has a genuine identity</li>
        </ul>
      </div>
    </div>
  </section>
);

/* ── CTA / Mailing list ───────────────────────────────── */
const CTASection = () => {
  const [email,     setEmail]     = useState('');
  const [platform,  setPlatform]  = useState('ios');
  const [faction,   setFaction]   = useState('vanguard');
  const [submitted, setSubmitted] = useState(false);
  const [error,     setError]     = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Bad signal. Check the address and re-transmit.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <section className="cta" id="early-access">
      <div className="cta-frame" data-reveal>
        <div className="cta-corner tl"/><div className="cta-corner tr"/>
        <div className="cta-corner bl"/><div className="cta-corner br"/>

        <div className="cta-eyebrow mono">▣ EARLY ACCESS · ENLISTMENT FORM 0-7</div>

        <h2 className="cta-title">
          Be First to Go to<br/>
          <span className="cta-hl">Hell &amp; Back.</span>
        </h2>
        <p className="cta-sub">
          Join the early access list for faction reveals, dev updates,
          and iOS playtest opportunities.
        </p>

        {!submitted ? (
          <form className="cta-form" onSubmit={submit} noValidate>
            <label className="cta-field cta-field-email">
              <span className="cta-label">EMAIL</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="commander@station.net"
                aria-label="Email address"
              />
            </label>

            <fieldset className="cta-field">
              <legend className="cta-label">PLATFORM</legend>
              <div className="seg">
                {['ios','android','both'].map(p => (
                  <button
                    type="button" key={p}
                    className={`seg-btn${platform === p ? ' on' : ''}`}
                    onClick={() => setPlatform(p)}
                  >
                    {p === 'ios' ? 'iOS' : p === 'android' ? 'Android' : 'Both'}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="cta-field">
              <legend className="cta-label">PREFERRED DOCTRINE</legend>
              <div className="seg">
                {FACTIONS.map(ft => (
                  <button
                    type="button" key={ft.key}
                    className={`seg-btn${faction === ft.key ? ' on' : ''}`}
                    onClick={() => setFaction(ft.key)}
                  >
                    {ft.name}
                  </button>
                ))}
              </div>
            </fieldset>

            <button className="btn btn-primary cta-submit" type="submit">
              Transmit <Glyph.arrow width="18" height="18"/>
            </button>

            {error && <div className="cta-error">! {error}</div>}
            <p className="cta-fineprint">
              No spam. Unsubscribe in one tap. We will never sell your callsign.
            </p>
          </form>
        ) : (
          <div className="cta-success">
            <div className="cta-success-mark">◉</div>
            <h3>Transmission received.</h3>
            <p>
              Welcome to the wave, <span className="mono">{email}</span>.<br/>
              Beta keys ship in batches — watch your inbox.
            </p>
            <div className="cta-success-meta mono">
              CALLSIGN · CMDR-{Math.floor(Math.random() * 9000 + 1000)} //
              DOCTRINE · {faction.toUpperCase()} //
              PLATFORM · {platform.toUpperCase()}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

/* ── Footer ───────────────────────────────────────────── */
const Footer = () => (
  <footer className="foot">
    <div className="foot-inner">
      <div className="foot-brand">
        <span className="brand-word">HELL <em>&amp;</em> BACK</span>
        <span className="brand-tag">RTS · BUILD 0.7.4-CB</span>
      </div>
      <ul className="foot-links">
        <li><a href="#">Press kit</a></li>
        <li><a href="#">Discord</a></li>
        <li><a href="#">Devlog</a></li>
        <li><a href="#">Careers</a></li>
        <li><a href="#">Privacy</a></li>
      </ul>
      <div className="foot-meta mono">
        © 2147 BLACKROCK STUDIO · NOT AFFILIATED WITH ANY EARTH-BASED FRANCHISE
      </div>
    </div>
  </footer>
);

/* ── Tweaks panel ─────────────────────────────────────── */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent":      "#f0a83a",
  "scanlines":   true,
  "spinSpeed":   18,
  "noise":       true,
  "monoCorners": true
}/*EDITMODE-END*/;

const Tweaks = ({ tweaks, setTweak }) => (
  <TweaksPanel title="TWEAKS" subtitle="Visual & motion controls">
    <TweakSection title="Color">
      <TweakColor label="Accent" value={tweaks.accent} onChange={(v) => setTweak('accent', v)}/>
    </TweakSection>
    <TweakSection title="Atmosphere">
      <TweakToggle label="Scanlines"  value={tweaks.scanlines}    onChange={(v) => setTweak('scanlines', v)}/>
      <TweakToggle label="Film grain" value={tweaks.noise}        onChange={(v) => setTweak('noise', v)}/>
      <TweakToggle label="HUD corners" value={tweaks.monoCorners} onChange={(v) => setTweak('monoCorners', v)}/>
    </TweakSection>
    <TweakSection title="Soldier">
      <TweakSlider label="Rotation period (s)" min={6} max={40} step={1}
        value={tweaks.spinSpeed} onChange={(v) => setTweak('spinSpeed', v)}/>
    </TweakSection>
  </TweaksPanel>
);

/* ── App ──────────────────────────────────────────────── */
const App = () => {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  /* Apply CSS tokens */
  useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty('--accent-user', tweaks.accent);
    r.style.setProperty('--spin-speed',  tweaks.spinSpeed + 's');
    r.classList.toggle('no-scan',    !tweaks.scanlines);
    r.classList.toggle('no-noise',   !tweaks.noise);
    r.classList.toggle('no-corners', !tweaks.monoCorners);
  }, [tweaks]);

  /* Scroll-reveal via IntersectionObserver */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
          io.unobserve(e.target);
        }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -32px 0px' }
    );
    document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <Nav/>
      <CinematicHero/>
      <Marquee/>
      <FactionsSection/>
      <MobileGameplaySection/>
      <StrategySection/>
      <CTASection/>
      <Footer/>
      <Tweaks tweaks={tweaks} setTweak={setTweak}/>
      <div className="grain" aria-hidden="true"/>
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
