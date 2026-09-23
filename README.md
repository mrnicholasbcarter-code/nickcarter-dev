# nickcarter.dev

Production portfolio and technical profile for Nicholas Carter. The site is a static-first Next.js application with public claims bounded to repository evidence.

## Local development

Use Node 22 (`.nvmrc`).

```bash
npm ci
npm run dev
```

Quality gate:

```bash
npm run check
npm audit --omit=dev --audit-level=high
```

The gate runs ESLint, TypeScript, content/link tests, and a production build. CI runs the same commands for pushes to `main` and pull requests.

## Deployment

The repository is designed for Vercel Git integration:

- production branch: `main`
- install command: `npm ci`
- build command: `npm run build`
- framework preset: Next.js
- Node.js: 22.x

The existing public Vercel URL is `https://nickcarter-dev.vercel.app`. Durable project linkage, preview-deployment evidence, and the `nickcarter.dev` custom domain require authenticated Vercel/Cloudflare access and are tracked separately.

## Contact and resume boundaries

- `nick@nickcarter.dev` is intentionally not published until inbound Cloudflare Email Routing passes independent tests.
- The role-focused web resumes are print-friendly and use stable routes.
- General, Data & AI, and Full-Stack resumes are available as stable web views and generated PDF downloads.
- Employment history remains withheld until a verified source is available.
- Verdict claims distinguish credential-free fixture proof from live-provider or production claims.
