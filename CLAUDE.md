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
- **`2026seol/index.html`** — Seasonal event page (설맞이 행사)

## Key Patterns

### Brand Colors (Tailwind config)
- `nh-green: #009743` — primary brand green
- `nh-light-green: #E8F5E9`
- `nh-blue: #005bac`

### Business Hours Status (index.html)
`businessHours` object defines schedules per business. `checkBusinessStatus()` runs on load and every 60 seconds, toggling `.business-open-badge` / `.business-closed-badge` on `[data-business]` cards.

### Detail Page Template
All detail pages share the same structure: sticky back-nav header → title/address card → action buttons (`tel:` call + Naver Maps link) → hours card. Layout is `max-w-md mx-auto`.

### Mobile-First
All pages use `max-w-md mx-auto` (≈448px), `user-scalable=no`, tap-highlight suppression. Phone links use `tel:` scheme.

## Conventions

- Tailwind config is defined inline in each page's `<head>` `<script>` block (not a shared config file)
- No shared CSS/JS files — each page is self-contained
- Card components use `bg-white rounded-2xl shadow-card` with `active:scale-[0.98] transition-transform`
- Back navigation links to `index.html` from all detail/overview pages
