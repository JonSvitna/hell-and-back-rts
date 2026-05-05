const { useState, useEffect, useRef } = React;

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
        <li><a href="#gameplay">Gameplay</a></li>
        <li><a href="#anywhere">Anytime</a></li>
        <li><a href="#access">Early Access</a></li>
      </ul>
      <a href="#access" className="nav-cta">
        Get Early Access <Glyph.arrow width="16" height="16"/>
      </a>
    </div>
  </nav>
);

/* ---------- Hero ---------- */
const Hero = () => {
  const [time, setTime] = useState(20 * 60);
  useEffect(() => {
    const id = setInterval(() => setTime(t => (t <= 0 ? 20 * 60 : t - 1)), 1000);
    return () => clearInterval(id);
  }, []);
  const mm = String(Math.floor(time / 60)).padStart(2, '0');
  const ss = String(time % 60).padStart(2, '0');

  return (
    <section className="hero" id="top">
      <div className="hero-frame">
        <Soldier />

        <div className="hero-overlay">
          <div className="hero-tag">
            <span className="dot" /> SIGNAL ACQUIRED · BROADCAST 2147.04
          </div>

          <h1 className="hero-title">
            <span className="hero-line-1">FROM HELL.</span>
            <span className="hero-line-2">BACK IN <em>20.</em></span>
          </h1>

          <p className="hero-sub">
            A mobile real-time strategy game built for short, brutal matches.
            Three factions. Twenty minutes. One commander walks off the rock.
          </p>

          <div className="hero-actions">
            <a href="#access" className="btn btn-primary">
              Request Early Access <Glyph.arrow width="18" height="18"/>
            </a>
            <a href="#factions" className="btn btn-ghost">Meet the Factions</a>
          </div>

          <div className="hero-meta">
            <div className="meta-cell">
              <span className="meta-k">MATCH TIMER</span>
              <span className="meta-v mono">{mm}:{ss}</span>
            </div>
            <div className="meta-cell">
              <span className="meta-k">FACTIONS</span>
              <span className="meta-v">03</span>
            </div>
            <div className="meta-cell">
              <span className="meta-k">PLATFORM</span>
              <span className="meta-v">iOS · Android</span>
            </div>
            <div className="meta-cell">
              <span className="meta-k">BUILD</span>
              <span className="meta-v mono">0.7.4-CB</span>
            </div>
          </div>
        </div>

        <div className="hero-scroll">
          <span>SCROLL</span>
          <span className="hero-scroll-line"/>
        </div>
      </div>
    </section>
  );
};

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
      <div className="section-eyebrow">// SECTION 02 — FORCES IN PLAY</div>
      <h2 className="section-title">Three doctrines.<br/>One twenty-minute window.</h2>
      <p className="section-lede">
        Every match is a clean, asymmetric matchup. Pick the doctrine that fits
        the way you think under pressure — then live with it for twenty minutes.
      </p>
    </header>

    <div className="faction-grid">
      {FACTIONS.map((f, i) => <FactionCard key={f.key} f={f} idx={i}/>)}
    </div>

    <div className="faction-note mono">
      ◤ ASYMMETRY · NO MIRROR MATCHES · BALANCE PASS WEEKLY ◥
    </div>
  </section>
);

/* ---------- Gameplay (Quick & Strategic) ---------- */
const GameplaySection = () => (
  <section className="gameplay" id="gameplay">
    <header className="section-head">
      <div className="section-eyebrow">// SECTION 03 — DESIGN PILLARS</div>
      <h2 className="section-title">Quick. Strategic.<br/>No 90-minute slogs.</h2>
      <p className="section-lede">
        Every system is tuned around a single rule: you should be able to play
        a real, satisfying RTS match on a lunch break.
      </p>
    </header>

    <div className="pillar-grid">
      <article className="pillar wide">
        <div className="pillar-num mono">P · 01</div>
        <Glyph.clock className="pillar-icon" width="36" height="36"/>
        <h3>20 minutes, hard cap.</h3>
        <p>
          Match clock starts at <span className="mono hl">20:00</span> and never
          stops. At zero, the map collapses to a contested core — whoever holds
          it walks. No turtling. No drawn-out late games.
        </p>
        <div className="pillar-bar">
          <span className="pillar-bar-fill" style={{width: '100%'}}/>
          <span className="pillar-bar-mark" style={{left: '25%'}}>5:00 · scout</span>
          <span className="pillar-bar-mark" style={{left: '55%'}}>11:00 · push</span>
          <span className="pillar-bar-mark" style={{left: '85%'}}>17:00 · core</span>
        </div>
      </article>

      <article className="pillar">
        <div className="pillar-num mono">P · 02</div>
        <Glyph.bolt className="pillar-icon" width="36" height="36"/>
        <h3>One-thumb commands.</h3>
        <p>
          Drag to select. Flick to send. Long-press to give a unit a posture.
          A full battlegroup, controlled with one hand on the train.
        </p>
      </article>

      <article className="pillar">
        <div className="pillar-num mono">P · 03</div>
        <Glyph.signal className="pillar-icon" width="36" height="36"/>
        <h3>Strategy, not APM.</h3>
        <p>
          Decisions matter more than fingers. Macro choices auto-resolve at the
          unit level so you can focus on the read, not the click count.
        </p>
      </article>

      <article className="pillar wide">
        <div className="pillar-num mono">P · 04</div>
        <Glyph.device className="pillar-icon" width="36" height="36"/>
        <h3>Anytime. Anywhere.</h3>
        <p>
          Cross-save between phone and tablet. Resume a match where you left it.
          Spectate from any device — even a browser. Your ladder rank follows
          your account, not your hardware.
        </p>
        <div className="pillar-devices">
          <div className="device phone">
            <div className="device-screen">
              <div className="device-line w70"/><div className="device-line w40"/>
              <div className="device-grid">
                <span/><span/><span/><span className="hot"/><span/><span/>
              </div>
              <div className="device-line w55"/>
            </div>
          </div>
          <div className="device tablet">
            <div className="device-screen">
              <div className="device-line w40"/>
              <div className="device-grid wide">
                <span/><span className="hot"/><span/><span/><span/><span/>
                <span/><span/><span/><span/><span className="hot"/><span/>
              </div>
              <div className="device-line w70"/>
            </div>
          </div>
        </div>
      </article>
    </div>
  </section>
);

/* ---------- Anywhere strip ---------- */
const AnywhereStrip = () => (
  <section className="anywhere" id="anywhere">
    <div className="anywhere-grid">
      <div>
        <div className="section-eyebrow">// SECTION 04 — FIELD CONDITIONS</div>
        <h2 className="section-title">Five minutes free?<br/>That's a war.</h2>
      </div>
      <ul className="anywhere-list">
        <li><span className="mono">07:42</span> Subway commute — ranked 1v1</li>
        <li><span className="mono">12:15</span> Lunch break — 2v2 with the team</li>
        <li><span className="mono">19:08</span> Couch — tablet, casted match</li>
        <li><span className="mono">23:51</span> Last call — one more game, just one</li>
      </ul>
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
    setSubmitted(true);
  };

  return (
    <section className="cta" id="access">
      <div className="cta-frame">
        <div className="cta-corner tl"/>
        <div className="cta-corner tr"/>
        <div className="cta-corner bl"/>
        <div className="cta-corner br"/>

        <div className="cta-eyebrow mono">▣ TRANSMISSION · ENLISTMENT FORM 0-7</div>

        <h2 className="cta-title">
          The first wave deploys soon.<br/>
          <span className="cta-hl">Be on it.</span>
        </h2>
        <p className="cta-sub">
          Get a closed beta key, weekly dev briefings, and a unique commander
          callsign reserved to your account.
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
      <Hero/>
      <Marquee/>
      <FactionsSection/>
      <GameplaySection/>
      <AnywhereStrip/>
      <CTASection/>
      <Footer/>
      <Tweaks tweaks={tweaks} setTweak={setTweak}/>
      <div className="grain" aria-hidden="true"/>
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
