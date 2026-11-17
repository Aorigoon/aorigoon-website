# Aorigoon website — FROZEN VISUAL SPEC v1 (2026-11-17, Zain approved build)

## Frozen spec (one line — build only this in v1)
Single-page Next.js site, warm off-white #FAFAF9 ground with warm-black #1C1917 sections, gold #A16207 accent used sparingly (numbers, rules, small highlights only), Cormorant serif display headlines + Montserrat body, thin orbital-ring motif (glass-translucent circles, hero top-right, rotating slowly with scroll) as the signature graphic instead of any gradient arc, liquid-glass sticky nav pill, scroll-triggered chapter storytelling (Hero hook → Studio → Models → Apps → Services → Process → Contact climax), masked line-by-line headline reveals, no app names anywhere, Lucide icons only, no emoji, mobile-first responsive.

## Source of truth
- Design system: `design-system/aorigoon/MASTER.md` (ui-ux-pro-max, generated 2026-11-17; pattern Scroll-Triggered Storytelling, style Liquid Glass, palette premium black + gold, Cormorant/Montserrat).
- Reference feel (NOT to copy): notiune.xyz analysis is in the parent chat context — premium single-page agency site, pinned scroll scenes, masked reveals, curved work carousel. Ours differs in every visible decision: serif display (not grotesque), gold accent (not orange→purple gradient), orbital rings (not gradient horizon arcs), glass (not flat), different sections and copy.

## Sections (in order)
1. Nav — glass pill, logo "Aorigoon" left; links Studio, Models, Apps, Services, Process; black pill CTA "Let's talk".
2. Hero — huge Cormorant headline (our own line about apps + from-scratch small AI models), subtext, CTA + "See the work ↓"; orbital rings top-right, slow rotation; intro reveal is an orbital-ring draw + wordmark reveal (NOT a black panel lift — that is notiune's).
3. Studio — who we are: an agency that builds apps and small AI models from scratch. No invented stats.
4. Models — flagship hotel vision model, described generically (NO codename "TS1"): detects tables and chairs, BOOKED/FREE per table, seated-table privacy rule, counter-attendance alert. No accuracy numbers we cannot prove.
5. Apps — "Apps we ship": generic placeholder cards, NO app names (Zain adds names later after finishing work on them).
6. Services — rows: App development, Custom AI models (vision), Product design. Short one-line descriptions each.
7. Process — 4 steps in our own words (NOT Talk/Design/Build/Launch — write distinct step names and copy).
8. Contact — big Cormorant question headline (our own line, NOT "So what are you making?"), email hello@aorigoon.com (placeholder until Zain confirms), "We reply within hours", live local-time clock (nice touch, keep it — clocks are a generic pattern, not a copy).
9. Footer — © 2026 Aorigoon, nav links, no social icons until Zain gives handles.

## Copy rules
- Site copy in English (global launch, same as Mousify UI).
- No app names, no model codenames, no invented stats, no fake testimonials, no fake client logos.
- Never copy notiune's sentences or headlines. Every headline and line is written fresh.

## Tech
- Next.js App Router + Tailwind, in this repo root (`~/workspace/aorigoon-website`).
- Animation: Framer Motion and/or GSAP. Orbital rings via SVG/CSS/GSAP (no WebGL in v1 — keep it fast). Components isolated so Zain's own animation source code (coming later) can drop in.
- Icons: Lucide only (lucide.dev), stroke 2.0. No emoji anywhere.
- Accessibility: contrast 4.5:1, keyboard nav, visible focus, `prefers-reduced-motion` respected (final readable state, no scroll-scrub), mobile animations simplified.
- Responsive: 375px, 768px, 1024px, 1440px verified with real screenshots.

## SEO (must be perfect — Zain's explicit requirement)
- next/metadata: title, description, canonical, Open Graph + Twitter cards, robots.
- JSON-LD Organization schema. sitemap.xml + robots.txt. Semantic HTML (one h1, proper heading order). next/font (no render-blocking font CSS). Images via next/image, AVIF/WebP. No layout shift (CLS < 0.1). Follow claude-seo skill checklist where it applies to a new build.

## Repo + deploy
- GitHub repo `Aorigoon/aorigoon-website` (public), main branch. Never `git add -A` blindly; standard Next.js .gitignore.
- Deploy: Cloudflare Workers via OpenNext (`@opennextjs/cloudflare`) on ZAIN'S OWN Cloudflare account (custom.cloudflare-zain connector). Public workers.dev preview URL. NOT Cloudflare Pages — `*.aorigoon.pages.dev` is behind a Cloudflare Access app (aorigoon@gmail.com only). Never change Access policies.
- HomePy lessons (AGENTS.md): fresh build immediately before deploy (OpenNext deploy does not rebuild); only one build at a time (check `ps` first); Turbopack build failure → temporary webpack fallback, then restore the script byte-identical.

## Verification before delivery
- `next build` passes. Real screenshots (desktop + mobile) of the running site, compared against this frozen spec item by item; name any item that still differs before rebuilding. Live preview URL checked in a browser.
- Deliver: repo URL + live preview URL + screenshots.
