const { useState, useEffect, useRef } = React;
const CinematicHero = window.CinematicHero;

/* ---------- Tiny inline icons ---------- */
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
};

/* ---------- Top nav ---------- */
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

/* ---------- Marquee ---------- */
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

/* ---------- Factions ---------- */
const FactionsSection = () => (
  <section className="factions" id="factions">
    <header className="section-head">
      <div className="section-eyebrow">// SECTION 02 — CHOOSE YOUR SIDE</div>
      <h2 className="section-title">Choose Your<br/>Command Style.</h2>
      <p className="section-lede">
        Three factions. No mirror matches. No safe choices. Every army changes
        how you fight.
      </p>
    </header>

    <div className="faction-grid">
      {FACTIONS.map((f, i) => <FactionCard key={f.key} f={f} idx={i}/>)}
    </div>

    <div className="faction-decision">
      <p className="faction-decision-q">Which faction would you command?</p>
      <div className="faction-decision-btns">
        {FACTIONS.map(f => (
          <a key={f.key} href="#early-access"
             className="btn btn-ghost faction-decision-btn"
             style={{ '--accent': f.color }}
             data-faction={f.key}>
            I command {f.name}
          </a>
        ))}
      </div>
    </div>
  </section>
);

/* ---------- Mobile Gameplay Promise ---------- */
const MOBILE_CARDS = [
  { n: '01', t: '3–5 Minute Battles', d: 'Tight matches that respect your time. Open, fight, win, rematch.', I: Glyph.clock },
  { n: '02', t: 'Clean Unit Readability', d: 'Faction colors, silhouettes, and HUD built for a phone screen — not a 27" monitor.', I: Glyph.signal },
  { n: '03', t: 'Tap & Drag Control', d: 'Tap to command. Drag to reposition. Trigger abilities with your thumb.', I: Glyph.bolt },
  { n: '04', t: 'Tactical Abilities', d: 'Real-time abilities with meaningful cooldowns. Outplay, don’t outclick.', I: Glyph.cross },
  { n: '05', t: 'Faction-Based Counters', d: 'Every army has a clear identity. Reads matter more than reflex.', I: Glyph.device },
];

const MobileGameplaySection = () => (
  <section className="mobile-promise" id="mobile">
    <header className="section-head">
      <div className="section-eyebrow">// SECTION 03 — BUILT FOR iOS</div>
      <h2 className="section-title">Built for Your Thumb,<br/>Not a Keyboard.</h2>
      <p className="section-lede">
        Tap to command. Drag to reposition. Trigger abilities in real time.
        Every decision is built for fast mobile battles without losing the RTS
        feeling.
      </p>
    </header>

    <div className="mp-grid">
      {MOBILE_CARDS.map(c => (
        <article key={c.n} className="mp-card">
          <div className="mp-num mono">M · {c.n}</div>
          <c.I className="mp-icon" width="28" height="28"/>
          <h3>{c.t}</h3>
          <p>{c.d}</p>
        </article>
      ))}
    </div>
  </section>
);

/* ---------- Strategy Without Waiting ---------- */
const StrategySection = () => (
  <section className="strategy" id="strategy">
    <header className="section-head">
      <div className="section-eyebrow">// SECTION 04 — REAL STRATEGY</div>
      <h2 className="section-title">Strategy Without<br/>the Waiting Game.</h2>
      <p className="section-lede">
        Hell &amp; Back is designed for players who want tactical decisions
        now — not timers, clutter, or endless base menus.
      </p>
    </header>

    <div className="vs-wrap">
      <div className="vs-panel vs-old">
        <div className="vs-label mono">// LEGACY MOBILE STRATEGY</div>
        <ul>
          <li><Glyph.cross className="vs-x" width="18" height="18"/> Build timers that punish closing the app</li>
          <li><Glyph.cross className="vs-x" width="18" height="18"/> Bloated economy &amp; resource menus</li>
          <li><Glyph.cross className="vs-x" width="18" height="18"/> Passive waiting loops disguised as gameplay</li>
          <li><Glyph.cross className="vs-x" width="18" height="18"/> Cluttered HUD optimized for tablets only</li>
          <li><Glyph.cross className="vs-x" width="18" height="18"/> Faction “identity” that’s really just stat tweaks</li>
        </ul>
      </div>
      <div className="vs-divider" aria-hidden="true"><span>VS</span></div>
      <div className="vs-panel vs-new">
        <div className="vs-label mono">// HELL &amp; BACK</div>
        <ul>
          <li><span className="vs-check">◆</span> Fast 3–5 minute matches</li>
          <li><span className="vs-check">◆</span> No bloated economy screens</li>
          <li><span className="vs-check">◆</span> No passive waiting loops</li>
          <li><span className="vs-check">◆</span> Readable battlefield design</li>
          <li><span className="vs-check">◆</span> Every faction has a clear identity</li>
        </ul>
      </div>
    </div>
  </section>
);

/* ---------- CTA / Mailing list ---------- */
const CTASection = () => {
  const [email, setEmail] = useState('');
  const [platform, setPlatform] = useState('ios');
  const [faction, setFaction] = useState('vanguard');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Bad signal. Check the address and re-transmit.');
      return;
    }
    setError('');
    // TODO: wire to Klaviyo / Supabase / ConvertKit / Vercel serverless route.
    // For now this is frontend-only and does not persist email anywhere.
    setSubmitted(true);
  };

  return (
    <section className="cta" id="early-access">
      <div className="cta-frame">
        <div className="cta-corner tl"/>
        <div className="cta-corner tr"/>
        <div className="cta-corner bl"/>
        <div className="cta-corner br"/>

        <div className="cta-eyebrow mono">▣ EARLY ACCESS · ENLISTMENT FORM 0-7</div>

        <h2 className="cta-title">
          Be First to Go to<br/>
          <span className="cta-hl">Hell &amp; Back.</span>
        </h2>
        <p className="cta-sub">
          Join the early access list for faction reveals, development updates,
          and iOS playtest opportunities.
        </p>

        {!submitted ? (
          <form className="cta-form" onSubmit={submit} noValidate>
            <label className="cta-field cta-field-email">
              <span className="cta-label mono">EMAIL</span>
              <input
                type="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="commander@station.net"
                aria-label="Email address"
              />
            </label>

            <fieldset className="cta-field">
              <legend className="cta-label mono">PLATFORM</legend>
              <div className="seg">
                {['ios','android','both'].map(p => (
                  <button type="button" key={p}
                    className={'seg-btn ' + (platform === p ? 'on' : '')}
                    onClick={()=>setPlatform(p)}>
                    {p === 'ios' ? 'iOS' : p === 'android' ? 'Android' : 'Both'}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="cta-field">
              <legend className="cta-label mono">PREFERRED DOCTRINE</legend>
              <div className="seg">
                {FACTIONS.map(f => (
                  <button type="button" key={f.key}
                    className={'seg-btn ' + (faction === f.key ? 'on' : '')}
                    onClick={()=>setFaction(f.key)}>
                    {f.name}
                  </button>
                ))}
              </div>
            </fieldset>

            <button className="btn btn-primary cta-submit" type="submit">
              Transmit <Glyph.arrow width="18" height="18"/>
            </button>

            {error && <div className="cta-error mono">! {error}</div>}
            <p className="cta-fineprint mono">
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
              CALLSIGN · CMDR-{Math.floor(Math.random()*9000+1000)} //
              DOCTRINE · {faction.toUpperCase()} //
              PLATFORM · {platform.toUpperCase()}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

/* ---------- Footer ---------- */
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

/* ---------- Tweaks ---------- */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#f0a83a",
  "scanlines": true,
  "spinSpeed": 18,
  "noise": true,
  "monoCorners": true
}/*EDITMODE-END*/;

const Tweaks = ({ tweaks, setTweak }) => (
  <TweaksPanel title="TWEAKS" subtitle="Visual & motion controls">
    <TweakSection title="Color">
      <TweakColor label="Accent" value={tweaks.accent} onChange={(v)=>setTweak('accent', v)}/>
    </TweakSection>
    <TweakSection title="Atmosphere">
      <TweakToggle label="Scanlines" value={tweaks.scanlines} onChange={(v)=>setTweak('scanlines', v)}/>
      <TweakToggle label="Film grain" value={tweaks.noise} onChange={(v)=>setTweak('noise', v)}/>
      <TweakToggle label="HUD corners" value={tweaks.monoCorners} onChange={(v)=>setTweak('monoCorners', v)}/>
    </TweakSection>
    <TweakSection title="Soldier">
      <TweakSlider label="Rotation period (s)" min={6} max={40} step={1} value={tweaks.spinSpeed} onChange={(v)=>setTweak('spinSpeed', v)}/>
    </TweakSection>
  </TweaksPanel>
);

/* ---------- App ---------- */
const App = () => {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty('--accent-user', tweaks.accent);
    r.style.setProperty('--spin-speed', tweaks.spinSpeed + 's');
    r.classList.toggle('no-scan', !tweaks.scanlines);
    r.classList.toggle('no-noise', !tweaks.noise);
    r.classList.toggle('no-corners', !tweaks.monoCorners);
  }, [tweaks]);

  return (
    <>
      <Nav/>
      <CinematicHero/>
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
