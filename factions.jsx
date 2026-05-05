/* Faction icons + cards. All icons are abstract SVG glyphs (no recreation of any
   real-world or licensed franchise sigil). */

const IconVanguard = () => (
  <svg viewBox="0 0 64 64" className="faction-icon" aria-hidden="true">
    <defs>
      <linearGradient id="vg-g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="oklch(0.85 0.05 75)"/>
        <stop offset="100%" stopColor="oklch(0.55 0.10 60)"/>
      </linearGradient>
    </defs>
    {/* shield */}
    <path d="M32,6 L54,14 L54,32 Q54,48 32,58 Q10,48 10,32 L10,14 Z"
          fill="none" stroke="url(#vg-g)" strokeWidth="2.5"/>
    {/* central chevron */}
    <path d="M22,28 L32,18 L42,28 M22,40 L32,30 L42,40" fill="none" stroke="url(#vg-g)" strokeWidth="2.5" strokeLinecap="square"/>
    <circle cx="32" cy="48" r="2.5" fill="url(#vg-g)"/>
  </svg>
);

const IconAscendancy = () => (
  <svg viewBox="0 0 64 64" className="faction-icon" aria-hidden="true">
    <defs>
      <linearGradient id="as-g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="oklch(0.88 0.10 220)"/>
        <stop offset="100%" stopColor="oklch(0.55 0.14 240)"/>
      </linearGradient>
    </defs>
    {/* hex frame */}
    <polygon points="32,6 54,18 54,42 32,54 10,42 10,18"
             fill="none" stroke="url(#as-g)" strokeWidth="2.5"/>
    {/* inner triangulated core */}
    <polygon points="32,18 44,30 32,42 20,30" fill="none" stroke="url(#as-g)" strokeWidth="2"/>
    <line x1="32" y1="18" x2="32" y2="42" stroke="url(#as-g)" strokeWidth="1.5"/>
    <line x1="20" y1="30" x2="44" y2="30" stroke="url(#as-g)" strokeWidth="1.5"/>
    <circle cx="32" cy="30" r="2.5" fill="url(#as-g)"/>
  </svg>
);

const IconHive = () => (
  <svg viewBox="0 0 64 64" className="faction-icon" aria-hidden="true">
    <defs>
      <linearGradient id="hv-g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="oklch(0.85 0.16 145)"/>
        <stop offset="100%" stopColor="oklch(0.50 0.18 140)"/>
      </linearGradient>
    </defs>
    {/* claw / mandible cluster */}
    <path d="M32,10 Q20,22 14,40 Q24,36 28,46 Q30,38 32,46 Q34,38 36,46 Q40,36 50,40 Q44,22 32,10 Z"
          fill="none" stroke="url(#hv-g)" strokeWidth="2.5" strokeLinejoin="round"/>
    <circle cx="32" cy="32" r="3" fill="url(#hv-g)"/>
    <circle cx="24" cy="28" r="1.5" fill="url(#hv-g)"/>
    <circle cx="40" cy="28" r="1.5" fill="url(#hv-g)"/>
  </svg>
);

const FACTIONS = [
  {
    key: 'vanguard',
    code: 'F-01',
    name: 'VANGUARD',
    role: 'Balanced Infantry',
    Icon: IconVanguard,
    color: 'oklch(0.78 0.17 75)',
    flavor: "Hardened boots on broken ground. Rifle drills, drop pods, the smell of cordite. Vanguard wins by showing up first and refusing to leave.",
    stats: [
      { k: 'ECONOMY', v: 70 },
      { k: 'TEMPO', v: 60 },
      { k: 'DURABILITY', v: 75 },
      { k: 'CEILING', v: 65 },
    ],
    tags: ['Versatile', 'Forgiving', 'Mid-range'],
  },
  {
    key: 'ascendancy',
    code: 'F-02',
    name: 'ASCENDANCY',
    role: 'High-Tech Specialists',
    Icon: IconAscendancy,
    color: 'oklch(0.78 0.14 230)',
    flavor: "Fewer hands on the trigger — every one of them carries a small star. Lattice shields, phase blades, weapons that re-write the next ten seconds.",
    stats: [
      { k: 'ECONOMY', v: 50 },
      { k: 'TEMPO', v: 65 },
      { k: 'DURABILITY', v: 80 },
      { k: 'CEILING', v: 90 },
    ],
    tags: ['Elite', 'Tech-locked', 'High skill'],
  },
  {
    key: 'hive',
    code: 'F-03',
    name: 'HIVE',
    role: 'Swarm · Fast · Fragile',
    Icon: IconHive,
    color: 'oklch(0.78 0.18 145)',
    flavor: "A wave you can hear before you can see. Hive trades bodies for tempo — the second the count drops, your perimeter is already inside their gut.",
    stats: [
      { k: 'ECONOMY', v: 90 },
      { k: 'TEMPO', v: 95 },
      { k: 'DURABILITY', v: 30 },
      { k: 'CEILING', v: 75 },
    ],
    tags: ['Swarm', 'Aggressive', 'Glass cannon'],
  },
];

const FactionCard = ({ f, idx }) => (
  <article className="faction-card" style={{ '--accent': f.color }}>
    <div className="faction-corner tl" />
    <div className="faction-corner tr" />
    <div className="faction-corner bl" />
    <div className="faction-corner br" />

    <header className="faction-head">
      <div className="faction-code">{f.code} / {String(idx+1).padStart(2,'0')}</div>
      <f.Icon />
    </header>

    <div className="faction-title">
      <h3>{f.name}</h3>
      <p className="faction-role">{f.role}</p>
    </div>

    <p className="faction-flavor">{f.flavor}</p>

    <ul className="faction-stats">
      {f.stats.map(s => (
        <li key={s.k}>
          <span className="stat-k">{s.k}</span>
          <span className="stat-bar"><span className="stat-fill" style={{ width: s.v + '%' }} /></span>
          <span className="stat-v">{s.v}</span>
        </li>
      ))}
    </ul>

    <footer className="faction-foot">
      {f.tags.map(t => <span key={t} className="faction-tag">{t}</span>)}
    </footer>
  </article>
);

window.FACTIONS = FACTIONS;
window.FactionCard = FactionCard;
