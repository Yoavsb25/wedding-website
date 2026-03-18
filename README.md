# Wedding Website

![React](https://img.shields.io/badge/React-A78BFA?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7C3AED?style=for-the-badge&logo=vite&logoColor=white)
![Status](https://img.shields.io/badge/Status-In_Progress-7C3AED?style=for-the-badge)

> A single-page wedding website with RSVP via Google Form — invitations, schedule, and event details.

---

## Overview

A single-page wedding website built with React (Vite) and Tailwind CSS. RSVP is handled via an embedded Google Form; submissions go to Google Sheets as the admin dashboard.

## Features

- Event details, schedule, and venue information
- RSVP via embedded Google Form → Google Sheets admin dashboard
- Countdown to the wedding day
- Mobile-first responsive design
- GitHub Pages deployment via GitHub Actions

## Tech Stack

![React](https://img.shields.io/badge/React-7C3AED?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7C3AED?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-A78BFA?style=for-the-badge&logo=tailwindcss&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-6B7280?style=for-the-badge&logo=github&logoColor=white)

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build & Deploy

```bash
npm run build
```

Deploys to GitHub Pages via `.github/workflows/deploy.yml` on push to `main`. In repo settings, set **Pages → Source → GitHub Actions**.

## Customization

- **Site copy & venue:** `src/data/site.js`
- **Schedule:** `src/data/schedule.js`
- **Countdown phrases:** `src/data/countdownCopy.js`
- **Base path:** set `base` in `vite.config.js` (`'/wedding-website/'` for project page, `'/'` for user site)

## Docs

- [ARCHITECTURE.MD](ARCHITECTURE.MD)
- [DESIGN.md](DESIGN.md)
- [PRD.MD](PRD.MD)

---

[![LinkedIn](https://img.shields.io/badge/Yoav_Sborovsky-LinkedIn-7C3AED?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/yoav-sborovsky/)
&nbsp;
Part of [Yoav Sborovsky's GitHub portfolio](https://github.com/Yoavsb25)
