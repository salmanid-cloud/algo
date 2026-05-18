# Heritage Leather Shoes Website

A premium Next.js website for a family-owned leather shoe brand built around heritage storytelling, handcrafted product presentation, bespoke consultations, WhatsApp ordering, Razorpay checkout readiness, and Sanity-powered content management.

## Stack

- Next.js App Router
- Tailwind CSS
- Framer Motion
- Razorpay API route
- Sanity Content Lake REST helper and CMS schema templates
- Vercel deployment configuration

## Getting Started

```bash
npm install
npm run dev
```

## Environment Variables

Copy `.env.example` to `.env.local` for local development and add the same values in Vercel Project Settings.

```bash
NEXT_PUBLIC_WHATSAPP_NUMBER=919999999999
NEXT_PUBLIC_SITE_URL=https://your-vercel-project.vercel.app
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=xxxxx
```

## Deploy to Vercel

This repository includes `vercel.json`, a `vercel-build` script, sitemap generation, robots metadata, and `.env.example` so it can be imported directly into Vercel as a Next.js project.

See [`DEPLOYMENT.md`](./DEPLOYMENT.md) for the full Vercel checklist.

## Useful Commands

```bash
npm run typecheck
npm run build
npm run deploy
```


## Dependency Noise

The app intentionally avoids bundling Sanity Studio and ESLint into the default Vercel install path. Product/legacy schemas remain in `sanity/`, and `lib/sanity.ts` can read Sanity Content Lake data through the REST API. If you want to run a dedicated Studio, use `sanity.config.example.mjs` as a starting point and install Studio-only packages in that workspace.
