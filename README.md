# RAGUL-OS — Gamified Portfolio

A single-page **Cyber-Luxe Command Center** portfolio for **Ragul Vasudevan** (AI & Blockchain Product Leader). Built with React, Tailwind CSS, Framer Motion, and GSAP.

## Features

- **Loading sequence**: Typing effect with split-screen reveal
- **HUD**: Fixed header with Trust Level bar (increases on scroll + clicks)
- **Hero**: Particle network (mouse-reactive) + Bio-Scanner holographic card
- **Experience nodes**: Yap Market (AI), BQ Labs (DeFi), CBA Tech (Growth) with metrics, code block, trophy, and chart
- **Tech Arsenal**: Skills grid (AI Core, Vibe Coding, Blockchain)
- **Agent Ragul**: Floating chatbot with pre-set prompts (Hackathon story, Vibe coding, Projects)
- **Unlock**: At 100% Trust Level — resume download, email contact, QR vCard

## Design

- **Theme**: Dark glassmorphism, neon cyan (#00F0FF) and acid lime (#B6FF00)
- **Fonts**: Space Grotesk (headings), JetBrains Mono (data), Inter (body)
- **Accessibility**: Skip link, focus states, Trust Level announced for screen readers, tab-navigable experience nodes

## Setup

```bash
npm install
npm run dev
```

- **Resume**: Add your `resume.pdf` to the `public/` folder so **DOWNLOAD_RESUME.PDF** works.

## Build

```bash
npm run build
npm run preview
```

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS 4
- Framer Motion (layout/UI animations)
- GSAP + ScrollTrigger (timeline scroll reveal)
- qrcode.react (vCard QR in unlock overlay)
