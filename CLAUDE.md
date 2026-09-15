# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

선남농협(Seonnam NH Agricultural Cooperative) 사업장 안내 모바일 웹사이트. 각 사업장의 영업시간, 연락처, 위치 정보를 제공하며 실시간 영업 상태를 표시한다.

## Tech Stack

- **Pure static HTML/CSS/JS** — no framework, no bundler, no package.json
- **Tailwind CSS via CDN** (`cdn.tailwindcss.com`) with inline `tailwind.config` per page
- **Pretendard font** via jsDelivr CDN
- **Vanilla JavaScript** — inline `<script>` blocks only

No build step required. Open `.html` files directly in browser or use a local server (`python3 -m http.server`).

## Site Structure

Two-level navigation:

- **`index.html`** — Main hub listing all business locations (본점 + 도흥지점) with real-time open/closed status badges
- **Detail pages** (`headquarters.html`, `doheung.html`, `mart.html`, `doheung_mart.html`, `material.html`, `material_store.html`, `auction.html`, `gas.html`, `apc.html`) — Individual business info with call/navigation buttons
- **Overview pages** (`headquarters_main.html`, `branch_header.html`) — Section landing pages
- **`2026chuseok/index.html`** — 2026 추석 휴무 안내, with dedicated `style.css` and the supplied `notice.png`
- **`2026seol/index.html`** — Retired 설 안내; links to the current 추석 notice
- **`adv/snfarm-warehouse-opening/index.html`** — Retired 확장이전 행사; links to the current 추석 notice

## Key Patterns

### Brand Colors (Tailwind config)
- `nh-green: #009743` — primary brand green
- `nh-light-green: #E8F5E9`
- `nh-blue: #005bac`

### Business Hours Status (index.html)
`businessHours` object defines schedules per business. `getChuseokStatus()` applies the supplied September 24–27, 2026 schedule using Asia/Seoul dates. Confirmed holiday hours are gas 08:00–18:00 and material 09:00–12:00 (closed Sundays). Other holiday operating days display "영업일 · 시간 문의"; September 25–26 are closed for all locations.

`checkBusinessStatus()` runs on load and every 60 seconds, toggling `.business-open-badge` / `.business-closed-badge` on `[data-business]` cards.

### Detail Page Template
All detail pages share the same structure: sticky back-nav header → title/address card → action buttons (`tel:` call + Naver Maps link) → hours card. Layout is `max-w-md mx-auto`.

### Mobile-First
All pages use `max-w-md mx-auto` (≈448px), `user-scalable=no`, tap-highlight suppression. Phone links use `tel:` scheme.

## Conventions

- Tailwind config is defined inline in each page's `<head>` `<script>` block (not a shared config file)
- General business pages are self-contained; the Chuseok page has its own CSS file.
- Card components use `bg-white rounded-2xl shadow-card` with `active:scale-[0.98] transition-transform`
- Back navigation links to `index.html` from all detail/overview pages

## Seasonal notice expiry

`seasonal-notice.js` hides `[data-chuseok-notice]` links from 2026-09-28 00:00 Asia/Seoul, including pages left open. The Chuseok page redirects to the main page after expiry. The main business-status function already returns to normal schedules outside September 24–27. This uses the visitor device clock; no server scheduler is required.
