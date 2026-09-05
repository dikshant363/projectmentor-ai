# Vercel Deployment Checklist (PromptWars Production Release)

## Pre-Deployment Verification
- [x] Run `npm run type-check` (Exit code 0, 0 type errors)
- [x] Run `npm run lint` (Exit code 0, 0 warnings/errors)
- [x] Run `npm run build` locally to verify Turbopack compiles without prerendering failures.
- [x] Ensure `.env.local` is ignored in `.gitignore`.
- [x] Ensure `.env.example` is committed with non-secret variable templates (`GEMINI_API_KEY=`).

## Deployment via Vercel CLI
```bash
# 1. Login to Vercel
vercel login

# 2. Link Project
vercel link

# 3. Add Environment Variable (Optional for live Gemini mode)
vercel env add GEMINI_API_KEY production

# 4. Deploy to Production
vercel --prod
```

## Post-Deployment Live Smoke Test
1. Visit the deployed `.vercel.app` URL.
2. Open Chrome DevTools Console (`Cmd + Option + J`) to verify 0 console errors and 0 hydration warnings.
3. Submit a project profile and verify recommendations render with high-fidelity project data.
4. Open the Viva Defense Simulator on `/mentor` and test oral response evaluation.
5. Click **Download Review Pack** to verify client-side markdown export triggers smoothly.
