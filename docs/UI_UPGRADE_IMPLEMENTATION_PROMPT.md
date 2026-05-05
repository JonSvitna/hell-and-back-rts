# Hell & Back RTS — UI Upgrade Implementation Prompt

## Mission

Upgrade the current Hell & Back RTS landing page into a sharper, mobile-first, early-access conversion page.

The live site is deployed at:

https://hell-and-back-rts.vercel.app/

Use the existing visual direction as the foundation. Do not rebuild the brand from scratch.

## Source of Truth

Before changing code, review and follow:

- `docs/WEBSITE_UPDATE_PLAN.md`
- `docs/FACTION_REFINEMENT.md`

## Locked Creative Decisions

Do not rename the factions:

- Vanguard
- Ascendancy
- Hive

Do not change the core tone:

- Dark cinematic RTS
- Military/sci-fi HUD
- Glowing faction cards
- Premium mobile strategy feel

## Main Problem To Fix

The current site has strong faction energy, but it needs to feel more like a real mobile iOS RTS that users can play soon.

The upgraded UI must answer this within 7 seconds:

> What is this game, why is it cool, and how do I get early access?

## Upgrade Goals

1. Strengthen the hero section.
2. Make the game feel clearly mobile-first.
3. Keep the faction cards as a core selling point.
4. Add stronger conversion hooks.
5. Make the page more social-shareable.
6. Improve spacing and hierarchy without losing the gritty HUD style.

## Required Page Flow

The landing page should follow this structure:

1. Hero / Early Access
2. Factions
3. Mobile Gameplay Promise
4. Strategy Without Waiting
5. Final CTA

Do not add more than these 5 major sections.

---

# Section 1 — Hero / Early Access

## Goal

Make the game instantly understandable and exciting.

## Recommended Headline

Command Your Army. Go Through Hell. Come Back Victorious.

## Subheadline

Hell & Back is a faction-based mobile RTS for iOS, built around fast battles, readable units, and real-time tactical decisions.

## CTAs

Primary:

Get Early Access

Secondary:

Choose Your Faction

## Visual Direction

Create a large mobile gameplay mockup inside the hero section.

The mockup should look like an iPhone battlefield screen, using CSS/HTML if no final image exists.

Include:

- Top-down battlefield panel
- Small readable unit groups
- Faction color dots or markers
- Ability buttons at the bottom
- Health bars
- Mini HUD elements
- Glow accents

This visual is critical. The site must feel mobile-first immediately.

---

# Section 2 — Factions

## Goal

Make users emotionally choose a side.

## Section Headline

Choose Your Command Style.

## Section Subtext

Three factions. No mirror matches. No safe choices. Every army changes how you fight.

## Keep Existing Faction Card Format

Each card should include:

- Faction number
- Icon
- Name
- Subtitle
- Description
- Stat bars
- Tags

## Updated Faction Copy

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

## Faction CTA

Under the cards, add:

Which faction would you command?

Buttons:

- I command Vanguard
- I command Ascendancy
- I command Hive

For now, each button can scroll to the final early access form.

Later, these can pass faction interest into the waitlist.

---

# Section 3 — Mobile Gameplay Promise

## Goal

Prove this is designed for iOS, not a PC RTS squeezed onto a phone.

## Headline

Built for Your Thumb, Not a Keyboard.

## Copy

Tap to command. Drag to reposition. Trigger abilities in real time. Every decision is built for fast mobile battles without losing the RTS feeling.

## Cards

Create 5 compact cards:

1. 3–5 Minute Battles
2. Clean Unit Readability
3. Tap-and-Drag Control
4. Tactical Abilities
5. Faction-Based Counters

Use compact HUD-style cards with small icons or simple geometric glyphs.

---

# Section 4 — Strategy Without Waiting

## Goal

Position Hell & Back against boring mobile strategy mechanics without naming competitors.

## Headline

Strategy Without the Waiting Game.

## Copy

Hell & Back is designed for players who want tactical decisions now — not timers, clutter, or endless base menus.

## Bullet Grid

- Fast matches
- No bloated economy screens
- No passive waiting loops
- Readable battlefield design
- Every faction has a clear identity

## Visual Direction

Use a split-panel comparison style:

Left:
Old mobile strategy pain points

Right:
Hell & Back approach

Keep it short and punchy.

---

# Section 5 — Final CTA

## Goal

Convert the visitor.

## Headline

Be First to Go to Hell & Back.

## Subtext

Join the early access list for faction reveals, development updates, and iOS playtest opportunities.

## Form

Include:

- Email input
- Get Early Access button

Optional:

- Faction choice dropdown or hidden field later

For now, the form can remain frontend-only if no backend is connected.

Add a TODO comment for connecting Klaviyo, Supabase, ConvertKit, or Vercel serverless handling later.

---

# Design Rules

## Keep

- Dark background
- Grain/noise texture if already present
- HUD borders
- Sharp faction colors
- Glowing card treatments
- Military terminal typography if already present

## Improve

- More whitespace around major sections
- More obvious CTA buttons
- Better mobile responsiveness
- Clearer hero hierarchy
- Stronger visual path from hero to waitlist

## Avoid

- Generic SaaS cards
- Too much paragraph text
- Overly busy backgrounds
- More than 5 major sections
- Full gameplay mechanics
- Login/account features
- Multiplayer systems

---

# Mobile Responsiveness

The site must look strong on:

- iPhone width
- Tablet width
- Desktop width

On mobile:

- Faction cards should stack vertically
- CTA should stay easy to tap
- Text should not feel cramped
- Hero mockup should remain readable
- Avoid horizontal overflow

---

# Acceptance Criteria

The UI upgrade is complete when:

- The hero clearly says this is a mobile iOS RTS
- The hero has a mobile gameplay-style visual
- The factions remain Vanguard, Ascendancy, and Hive
- The faction section has a decision CTA
- The page has a strong final early access section
- The website feels premium and focused
- There are no more than 5 main sections
- The site builds successfully
- The site remains deployable to Vercel

---

# Implementation Notes

Use the current project structure. Do not introduce a new framework unless the repo is empty.

If using Next.js/Tailwind:

- Keep components simple
- Prefer reusable arrays/data objects for faction cards
- Keep faction copy in one place
- Avoid unnecessary dependencies

If the current project is plain React/Vite:

- Keep the same framework
- Do not migrate unless absolutely necessary

If the project is static HTML/CSS:

- Update the existing structure directly
- Keep all styling maintainable

---

# Final Output Required

After implementation, report:

1. Files changed
2. Sections updated
3. How to run locally
4. What is still frontend-only
5. What needs to be connected for real early access capture
