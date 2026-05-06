# Hell & Back RTS — Taste Skill Design Direction

## Purpose

Use the design philosophy from `Leonxlnx/taste-skill` to upgrade the Hell & Back website into a premium, non-generic mobile RTS landing page.

This document adapts the reference approach to Hell & Back. Do not copy Taste Skill branding, content, assets, or layout directly.

## Reference Repo

Reference:

https://github.com/Leonxlnx/taste-skill

Taste Skill is described as an anti-slop frontend framework for AI agents, focused on stronger layout, typography, motion, spacing, and image-generation workflows for premium frontends.

## How To Apply It Here

Hell & Back should use the `redesign-skill` mindset:

1. Scan the current website.
2. Diagnose weak UI patterns.
3. Apply targeted upgrades without rebuilding from scratch.
4. Keep the existing brand direction that already works.
5. Remove AI-looking generic design patterns.

## Core Design Dials For Hell & Back

Use these creative settings:

- DESIGN_VARIANCE: 8
- MOTION_INTENSITY: 6
- VISUAL_DENSITY: 5
- ART_DIRECTION: 8
- SPACING_GENEROSITY: 8
- UI_SIMPLICITY_DISCIPLINE: 8

Interpretation:

The site should feel bold and cinematic, but not cluttered. It should feel premium, dark, tactical, and intentional.

## Visual Direction

Theme paradigm:

Deep dark mode.

Background character:

Subtle technical grid, tactical noise, and controlled ambient glow.

Typography character:

Compressed statement typography for headings, supported by a clean grotesk body font.

Hero architecture:

Asymmetric split hero.

Left side:

- Strong headline
- Short subheadline
- CTA pair
- iOS/mobile positioning

Right side:

- Premium mobile battlefield mockup
- No blocky marine image
- No low-quality character placeholder

Section system:

Poster-like stacked storytelling with tactical HUD rhythm.

Signature components:

1. Product UI panel stack
2. Spotlight borders
3. Tactical stat cards
4. Split comparison panel

Motion-implied language:

1. Staggered float-up energy
2. Cinematic fade-through energy

## What Must Change

The marine/character image should be removed unless it can be replaced with AAA-quality professional faction art.

Current problem:

- The marine feels too blocky.
- It lowers perceived product quality.
- It makes the page feel less premium.
- It competes with the stronger faction-card system.

Replacement:

Use a mobile gameplay mockup instead.

The hero visual should show:

- iPhone-style vertical game frame
- Top-down battlefield
- Unit groups as clean tactical markers
- Health bars
- Ability buttons
- Mini HUD elements
- Vanguard, Ascendancy, and Hive color accents

This makes the product feel playable, not just conceptual.

## Hero Upgrade

Recommended headline:

Command Your Army. Go Through Hell. Come Back Victorious.

Shorter variant if layout needs tighter type:

Command Your Army. Anywhere.

Subheadline:

Hell & Back is a faction-based mobile RTS for iOS, built around fast battles, readable units, and real-time tactical decisions.

Primary CTA:

Get Early Access

Secondary CTA:

Choose Your Faction

Hero design rules:

- Keep headline to 1–3 lines.
- Keep first viewport clean.
- Avoid tiny decorative labels.
- Avoid crowded dashboard chrome.
- Do not add useless microcopy.
- Make the CTA visible without scrolling.

## Faction Section Direction

Keep the existing faction card concept. It is one of the strongest parts of the site.

Locked faction names:

- Vanguard
- Ascendancy
- Hive

Section headline:

Choose Your Command Style.

Section subtext:

Three factions. No mirror matches. No safe choices. Every army changes how you fight.

After the cards, add:

Which faction would you command?

Buttons:

- I command Vanguard
- I command Ascendancy
- I command Hive

Each button should scroll to the early access CTA.

## Faction Copy

### Vanguard

Subtitle:

Frontline Dominance

Description:

Hardened boots on broken ground. Rifle drills, drop pods, the smell of cordite. Vanguard wins by showing up first — and refusing to leave.

Tags:

- Versatile
- Forgiving
- Mid-Range

### Ascendancy

Subtitle:

High-Tech Specialists

Description:

Fewer hands on the trigger — every one of them carries a small star. Lattice shields. Phase blades. Weapons that rewrite the next ten seconds of the fight.

Tags:

- Elite
- Tech-Locked
- High Skill

### Hive

Subtitle:

Swarm Supremacy

Description:

A wave you hear before you see. Hive trades bodies for tempo. By the time you react, they are already inside your base.

Tags:

- Swarm
- Aggressive
- Glass Cannon

## Anti-Slop Rules For This Site

Avoid:

- Generic AI gradients
- Stock sci-fi soldiers
- Blocky low-poly characters
- Cards inside cards inside cards
- Too many tiny labels
- Fake dashboard jargon
- Overfilled hero section
- Repeating identical 3-card rows everywhere
- Generic SaaS layout patterns
- Long lore paragraphs
- Placeholder Latin text
- Dead buttons

Use instead:

- Strong typography
- Controlled cinematic darkness
- Tactical HUD details with restraint
- Generous spacing
- One strong hero visual
- Clear mobile gameplay credibility
- Faction-driven conversion hooks

## Mobile Responsiveness Rules

On mobile:

- Hero should stack cleanly.
- CTA buttons should be thumb-friendly.
- Faction cards should become a vertical stack.
- The mobile gameplay mockup should remain readable.
- Avoid horizontal scroll.
- Keep body copy short.

## Recommended Implementation Approach

Use the existing project stack.

Do not migrate frameworks.

If this is Next.js/Tailwind:

- Use existing components where possible.
- Refactor only enough to make sections cleaner.
- Keep faction data in one array.
- Add a reusable `MobileBattlefieldMockup` component.
- Add a reusable `FactionCard` component if not already present.

If this is static HTML/CSS:

- Keep the current structure.
- Improve CSS and section hierarchy.
- Do not introduce unnecessary dependencies.

## Required Components

Create or update:

- HeroSection
- MobileBattlefieldMockup
- FactionSection
- MobileGameplayPromise
- StrategyWithoutWaiting
- FinalCTA

## Section Flow

Use only five major sections:

1. Hero / Early Access
2. Factions
3. Built for Your Thumb, Not a Keyboard
4. Strategy Without the Waiting Game
5. Final Early Access CTA

## Acceptance Criteria

The UI upgrade is done when:

- The blocky marine is removed or replaced.
- The hero clearly communicates mobile iOS RTS.
- The first viewport feels premium and uncluttered.
- The faction names remain unchanged.
- The faction cards feel like the emotional core of the site.
- The waitlist CTA is obvious.
- The site feels more like a premium game brand than a placeholder concept.
- The page remains deployable on Vercel.
