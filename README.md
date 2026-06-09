# TruEye — AI Video Analytics Website

Production-ready Next.js 14 website for TruEye by VertexPlus Technologies Limited.

## Tech Stack

- **Framework**: Next.js 14 (App Router, TypeScript)
- **Styling**: Tailwind CSS + CSS custom properties
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **Fonts**: next/font/google (Space Grotesk, Inter, JetBrains Mono)
- **Blog**: MDX via next-mdx-remote
- **OG Images**: @vercel/og
- **Deployment**: Vercel

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

No environment variables are required for the base build. Add the following for production integrations:

```env
# Google Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Form endpoint (optional - replace stub handlers in DemoForm.tsx, ContactForm.tsx)
NEXT_PUBLIC_FORM_ENDPOINT=https://your-form-handler.com
```

## Project Structure

```
app/           — Next.js App Router pages
components/    — Reusable UI and section components
content/blog/  — MDX blog posts
lib/           — Utilities, data, animations
public/        — Static assets, llms.txt
styles/        — Global CSS
```

## Adding Blog Posts

Create a new `.mdx` file in `content/blog/` with the following frontmatter:

```mdx
---
title: "Your Post Title"
description: "SEO description"
date: "2025-01-01"
author: "TruEye Team"
category: "Technology"
---
```

The blog system automatically picks up new posts and generates pages.

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repository in Vercel
3. Deploy — zero configuration required

### Manual Build

```bash
npm run build
npm start
```

## SEO & GEO

- Sitemap: `/sitemap.xml`
- Robots: `/robots.txt` (allows all AI crawlers)
- AI manifest: `/llms.txt`
- All pages include JSON-LD structured data
- Search Console verification: update in `app/layout.tsx`

## Contact

- Sales: sales@trueye.io
- General: contact@trueye.io
- Phone: +91 966 032 6000
- Website: https://www.trueye.io
