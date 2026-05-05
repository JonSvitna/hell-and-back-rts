/* Rotating soldier silhouette over a destroyed battlefield.
   Pure CSS/SVG — no external assets. Helmeted figure on a slow turntable. */

const Battlefield = () => (
  <svg className="battlefield" viewBox="0 0 1600 700" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="oklch(0.18 0.03 40)"/>
        <stop offset="55%" stopColor="oklch(0.22 0.06 50)"/>
        <stop offset="100%" stopColor="oklch(0.10 0.02 30)"/>
      </linearGradient>
      <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="oklch(0.16 0.02 40)"/>
        <stop offset="100%" stopColor="oklch(0.08 0.01 30)"/>
      </linearGradient>
      <radialGradient id="sun" cx="0.72" cy="0.55" r="0.35">
        <stop offset="0%" stopColor="oklch(0.85 0.18 70)" stopOpacity="0.9"/>
        <stop offset="60%" stopColor="oklch(0.55 0.14 50)" stopOpacity="0.3"/>
        <stop offset="100%" stopColor="oklch(0.20 0.05 40)" stopOpacity="0"/>
      </radialGradient>
      <pattern id="scan" width="3" height="3" patternUnits="userSpaceOnUse">
        <rect width="3" height="1" fill="oklch(0 0 0)" opacity="0.18"/>
      </pattern>
    </defs>

    {/* sky */}
    <rect width="1600" height="700" fill="url(#sky)"/>
    <rect width="1600" height="700" fill="url(#sun)"/>

    {/* distant smoke plumes */}
    <g opacity="0.45" fill="oklch(0.12 0.02 30)">
      <ellipse cx="220" cy="380" rx="180" ry="40"/>
      <ellipse cx="240" cy="340" rx="120" ry="30"/>
      <ellipse cx="260" cy="305" rx="80" ry="22"/>
      <ellipse cx="1180" cy="370" rx="220" ry="48"/>
      <ellipse cx="1200" cy="320" rx="160" ry="36"/>
      <ellipse cx="1220" cy="280" rx="100" ry="26"/>
    </g>

    {/* far ridge */}
    <path d="M0,440 L80,420 L180,430 L260,400 L340,415 L440,395 L560,410 L660,390 L780,405 L900,385 L1020,400 L1140,395 L1260,385 L1380,395 L1500,380 L1600,390 L1600,700 L0,700 Z"
          fill="oklch(0.13 0.02 35)"/>

    {/* mid ridge with broken silhouettes (towers, wreckage) */}
    <g fill="oklch(0.10 0.015 30)">
      <path d="M0,490 L120,470 L160,475 L180,440 L210,475 L260,470 L320,460 L380,465 L420,430 L450,465 L520,460 L600,470 L640,440 L680,470 L740,465 L820,475 L900,460 L960,430 L1000,465 L1080,470 L1160,460 L1220,470 L1280,455 L1360,470 L1440,460 L1520,470 L1600,465 L1600,700 L0,700 Z"/>
      {/* tilted antenna */}
      <rect x="416" y="350" width="3" height="120" transform="rotate(-12 417 410)"/>
      <rect x="958" y="340" width="3" height="130" transform="rotate(8 959 405)"/>
      {/* broken wall */}
      <path d="M700,470 L700,420 L720,420 L720,440 L740,440 L740,425 L760,430 L760,470 Z"/>
    </g>

    {/* foreground rubble */}
    <g fill="url(#ground)">
      <path d="M0,560 L1600,560 L1600,700 L0,700 Z"/>
    </g>
    <g fill="oklch(0.12 0.015 30)" opacity="0.9">
      <polygon points="60,580 180,580 200,610 40,610"/>
      <polygon points="240,595 360,595 380,625 220,625"/>
      <polygon points="1100,585 1240,585 1260,615 1080,615"/>
      <polygon points="1320,600 1480,600 1500,630 1300,630"/>
      <polygon points="540,610 700,610 720,640 520,640"/>
    </g>
    {/* twisted rebar */}
    <g stroke="oklch(0.18 0.02 35)" strokeWidth="2" fill="none">
      <path d="M120,580 Q140,540 130,500"/>
      <path d="M150,580 Q170,550 200,540"/>
      <path d="M1340,600 Q1360,560 1380,550"/>
      <path d="M620,610 Q640,580 660,570"/>
    </g>

    {/* embers */}
    <g fill="oklch(0.78 0.17 75)">
      <circle cx="320" cy="360" r="1.5" opacity="0.8"/>
      <circle cx="450" cy="300" r="1" opacity="0.6"/>
      <circle cx="780" cy="340" r="1.2" opacity="0.7"/>
      <circle cx="1100" cy="280" r="1" opacity="0.5"/>
      <circle cx="1280" cy="330" r="1.4" opacity="0.7"/>
    </g>

    {/* scanlines */}
    <rect width="1600" height="700" fill="url(#scan)"/>
  </svg>
);

const SoldierFigure = () => (
  <svg className="soldier" viewBox="0 0 200 360" aria-hidden="true">
    <defs>
      <linearGradient id="armor" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="oklch(0.32 0.02 250)"/>
        <stop offset="50%" stopColor="oklch(0.22 0.015 250)"/>
        <stop offset="100%" stopColor="oklch(0.12 0.01 250)"/>
      </linearGradient>
      <linearGradient id="armorRim" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="oklch(0.55 0.04 250)"/>
        <stop offset="100%" stopColor="oklch(0.20 0.01 250)"/>
      </linearGradient>
      <radialGradient id="visor" cx="0.5" cy="0.4" r="0.7">
        <stop offset="0%" stopColor="oklch(0.85 0.18 70)"/>
        <stop offset="60%" stopColor="oklch(0.55 0.16 60)"/>
        <stop offset="100%" stopColor="oklch(0.25 0.06 40)"/>
      </radialGradient>
    </defs>

    {/* shadow under feet — subtle */}
    <ellipse cx="100" cy="348" rx="50" ry="6" fill="oklch(0 0 0)" opacity="0.55"/>

    {/* legs / boots */}
    <path d="M78,280 L74,348 L98,348 L100,280 Z" fill="url(#armor)"/>
    <path d="M122,280 L126,348 L102,348 L100,280 Z" fill="url(#armor)" opacity="0.85"/>
    <rect x="70" y="344" width="30" height="8" rx="2" fill="oklch(0.10 0.005 250)"/>
    <rect x="100" y="344" width="30" height="8" rx="2" fill="oklch(0.10 0.005 250)"/>

    {/* hip / belt */}
    <rect x="70" y="266" width="60" height="20" rx="3" fill="oklch(0.18 0.01 250)"/>
    <rect x="92" y="270" width="16" height="12" fill="oklch(0.78 0.17 75)" opacity="0.9"/>

    {/* torso — chest plate with ribbed segments */}
    <path d="M62,160 L138,160 L142,266 L58,266 Z" fill="url(#armor)"/>
    <path d="M62,160 L138,160 L140,180 L60,180 Z" fill="url(#armorRim)" opacity="0.6"/>
    <line x1="100" y1="160" x2="100" y2="266" stroke="oklch(0.08 0 0)" strokeWidth="1.5"/>
    <line x1="70" y1="200" x2="130" y2="200" stroke="oklch(0.08 0 0)" strokeWidth="1"/>
    <line x1="68" y1="225" x2="132" y2="225" stroke="oklch(0.08 0 0)" strokeWidth="1"/>

    {/* shoulder pads */}
    <path d="M40,160 Q40,140 62,140 L62,180 Q48,182 40,180 Z" fill="url(#armor)"/>
    <path d="M160,160 Q160,140 138,140 L138,180 Q152,182 160,180 Z" fill="url(#armor)"/>
    <rect x="44" y="148" width="14" height="3" fill="oklch(0.78 0.17 75)" opacity="0.85"/>
    <rect x="142" y="148" width="14" height="3" fill="oklch(0.78 0.17 75)" opacity="0.85"/>

    {/* arms — at rest at sides */}
    <path d="M40,178 L36,260 L52,266 L58,180 Z" fill="url(#armor)"/>
    <path d="M160,178 L164,260 L148,266 L142,180 Z" fill="url(#armor)"/>
    {/* gloves */}
    <rect x="34" y="258" width="20" height="14" rx="3" fill="oklch(0.10 0.005 250)"/>
    <rect x="146" y="258" width="20" height="14" rx="3" fill="oklch(0.10 0.005 250)"/>

    {/* neck */}
    <rect x="88" y="148" width="24" height="16" fill="oklch(0.12 0.005 250)"/>

    {/* HELMET — the focal element */}
    {/* outer shell */}
    <path d="M58,108 Q58,68 100,62 Q142,68 142,108 L142,150 Q140,156 132,156 L68,156 Q60,156 58,150 Z"
          fill="url(#armor)"/>
    {/* top crest */}
    <path d="M58,108 Q58,68 100,62 Q142,68 142,108 L138,108 Q138,76 100,72 Q62,76 62,108 Z"
          fill="url(#armorRim)" opacity="0.8"/>
    <rect x="98" y="62" width="4" height="12" fill="oklch(0.78 0.17 75)"/>

    {/* visor — glowing strip */}
    <path d="M66,108 L134,108 L132,128 L68,128 Z" fill="oklch(0.05 0 0)"/>
    <path d="M70,112 L130,112 L128,124 L72,124 Z" fill="url(#visor)"/>
    <rect x="74" y="115" width="52" height="2" fill="oklch(0.95 0.12 80)" opacity="0.9"/>

    {/* helmet vents / detail */}
    <rect x="62" y="135" width="6" height="14" fill="oklch(0.08 0 0)"/>
    <rect x="132" y="135" width="6" height="14" fill="oklch(0.08 0 0)"/>
    <circle cx="70" cy="100" r="2.5" fill="oklch(0.78 0.17 75)" opacity="0.8"/>

    {/* chin guard separation */}
    <path d="M70,140 L130,140 L128,156 L72,156 Z" fill="oklch(0.10 0.005 250)"/>
  </svg>
);

const Soldier = () => (
  <div className="soldier-stage" aria-label="Rotating space marine silhouette over destroyed battlefield">
    <Battlefield />
    <div className="soldier-grid" />
    <div className="soldier-platform">
      <div className="platform-ring outer" />
      <div className="platform-ring inner" />
      <div className="platform-disc" />
    </div>
    <div className="soldier-turntable">
      <div className="soldier-rotator">
        <SoldierFigure />
      </div>
    </div>
    <div className="soldier-vignette" />
    <div className="soldier-hud">
      <span className="hud-tag tl">◤ UNIT-7741</span>
      <span className="hud-tag tr">CLASS // INFANTRY ◥</span>
      <span className="hud-tag bl">◣ 33.2°N · 117.4°W</span>
      <span className="hud-tag br">SCAN ACTIVE ◢</span>
    </div>
  </div>
);

window.Soldier = Soldier;
