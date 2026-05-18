# Deploying to Vercel

This project is ready for Vercel as a Next.js application.

## 1. Push the repository

Push this branch to GitHub, GitLab, or Bitbucket.

## 2. Import in Vercel

1. Open Vercel and choose **Add New → Project**.
2. Import this repository.
3. Vercel should auto-detect **Next.js**. The included `vercel.json` also declares the framework.
4. Keep the default build settings:
   - Install Command: `npm install`
   - Build Command: `npm run build`
   - Output Directory: `.next`

## 3. Add environment variables

Add these in **Project Settings → Environment Variables** before production deployment:

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical production URL used by sitemap and robots metadata. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Required for WhatsApp ordering | WhatsApp number in international format without `+`. |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Required when CMS content is connected | Sanity project ID. |
| `NEXT_PUBLIC_SANITY_DATASET` | Required when CMS content is connected | Sanity dataset, usually `production`. |
| `RAZORPAY_KEY_ID` | Required for checkout API | Razorpay key ID. |
| `RAZORPAY_KEY_SECRET` | Required for checkout API | Razorpay secret; keep server-only. |

Use `.env.example` as the template for local and Vercel configuration.

## 4. Deploy

After saving environment variables, trigger **Deploy** from Vercel. The site can also be deployed with the Vercel CLI:

```bash
npm install
npx vercel
npx vercel --prod
```

## Notes

- The homepage and product pages use local demo data, so the marketing site can build before Sanity content is connected.
- Sanity Content Lake reads use the REST helper in `lib/sanity.ts`, which keeps Vercel installs lean and avoids shipping Studio-only packages with the storefront.
- Use `sanity.config.example.mjs` only if you decide to run a separate Sanity Studio from this repository.
- Razorpay order creation is server-side at `/api/checkout/razorpay` and will return a configuration error until Razorpay credentials are added.
- Remote images are already configured for Unsplash and Sanity CDN in `next.config.mjs`.
