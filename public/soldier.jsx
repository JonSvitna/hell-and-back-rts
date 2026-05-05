/* Hero atmospheric backdrop — destroyed battlefield SVG only.
   The 3D marine has been removed; the iPhone gameplay mockup is now the
   hero focal element (rendered separately by <PhoneMockup/>). */

const Battlefield = () => (
  <svg className="battlefield" viewBox="0 0 1600 700" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"  stopColor="oklch(0.16 0.02 30)"/>
        <stop offset="55%" stopColor="oklch(0.20 0.05 45)"/>
        <stop offset="100%" stopColor="oklch(0.08 0.015 30)"/>
      </linearGradient>
      <radialGradient id="sun" cx="0.78" cy="0.5" r="0.42">
        <stop offset="0%"  stopColor="oklch(0.82 0.16 70)" stopOpacity="0.55"/>
        <stop offset="55%" stopColor="oklch(0.50 0.14 50)" stopOpacity="0.18"/>
        <stop offset="100%" stopColor="oklch(0.20 0.05 40)" stopOpacity="0"/>
      </radialGradient>
      <radialGradient id="haze" cx="0.5" cy="0.85" r="0.7">
        <stop offset="0%"  stopColor="oklch(0.30 0.06 50)" stopOpacity="0.4"/>
        <stop offset="100%" stopColor="oklch(0.10 0.02 30)" stopOpacity="0"/>
      </radialGradient>
    </defs>

    <rect width="1600" height="700" fill="url(#sky)"/>
    <rect width="1600" height="700" fill="url(#sun)"/>

    {/* distant smoke */}
    <g opacity="0.4" fill="oklch(0.10 0.02 30)">
      <ellipse cx="220" cy="380" rx="180" ry="40"/>
      <ellipse cx="240" cy="340" rx="120" ry="30"/>
      <ellipse cx="260" cy="305" rx="80"  ry="22"/>
      <ellipse cx="1180" cy="370" rx="220" ry="48"/>
      <ellipse cx="1200" cy="320" rx="160" ry="36"/>
      <ellipse cx="1220" cy="280" rx="100" ry="26"/>
    </g>

    {/* far ridge */}
    <path d="M0,440 L80,420 L180,430 L260,400 L340,415 L440,395 L560,410 L660,390 L780,405 L900,385 L1020,400 L1140,395 L1260,385 L1380,395 L1500,380 L1600,390 L1600,700 L0,700 Z"
          fill="oklch(0.12 0.02 35)"/>

    {/* mid ridge with broken silhouettes */}
    <g fill="oklch(0.09 0.015 30)">
      <path d="M0,490 L120,470 L160,475 L180,440 L210,475 L260,470 L320,460 L380,465 L420,430 L450,465 L520,460 L600,470 L640,440 L680,470 L740,465 L820,475 L900,460 L960,430 L1000,465 L1080,470 L1160,460 L1220,470 L1280,455 L1360,470 L1440,460 L1520,470 L1600,465 L1600,700 L0,700 Z"/>
      <rect x="416" y="350" width="3" height="120" transform="rotate(-12 417 410)"/>
      <rect x="958" y="340" width="3" height="130" transform="rotate(8 959 405)"/>
      <path d="M700,470 L700,420 L720,420 L720,440 L740,440 L740,425 L760,430 L760,470 Z"/>
    </g>

    {/* atmospheric haze near horizon */}
    <rect width="1600" height="700" fill="url(#haze)"/>

    {/* embers */}
    <g fill="oklch(0.78 0.17 75)">
      <circle cx="320" cy="360" r="1.5" opacity="0.7"/>
      <circle cx="450" cy="300" r="1"   opacity="0.5"/>
      <circle cx="780" cy="340" r="1.2" opacity="0.6"/>
      <circle cx="1100" cy="280" r="1"  opacity="0.45"/>
      <circle cx="1280" cy="330" r="1.4" opacity="0.6"/>
    </g>
  </svg>
);

/* Backwards-compatible export: <Soldier/> now renders only the atmospheric
   backdrop. Kept the name to avoid touching every consumer. */
const Soldier = () => (
  <div className="soldier-stage" aria-hidden="true">
    <Battlefield />
    <div className="soldier-vignette" />
  </div>
);

window.Soldier = Soldier;
