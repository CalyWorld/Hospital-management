# Cloudflare Hosting (Hospital Management)

This repo is split into:
- `client` (Vite React app) -> host on **Cloudflare Pages**
- `server` (Express + MongoDB API) -> keep on your API host (Render/Railway/VM) unless you migrate Express to Workers

## 1) Deploy frontend to Cloudflare Pages

From `client`:

```bash
npm run build
npx wrangler pages project create hospital-management-client
npx wrangler pages deploy dist --project-name hospital-management-client
```

Or connect the Git repo in Cloudflare Pages dashboard with:
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: `client`

## 2) Set frontend environment variable in Cloudflare Pages

In Pages project settings, add:
- `VITE_API_BASE_URL` = your deployed backend URL (example: `https://hospital-api.example.com`)

This is required because the app now builds API URLs from `VITE_API_BASE_URL`.

## 3) Backend CORS setting

In your backend environment variables, set:
- `CLIENT_URI` = your Cloudflare Pages site URL (example: `https://hospital-management-client.pages.dev`)

This matches `server/index.ts` CORS config.

## 4) SPA route fallback

`client/public/_redirects` is included:

```txt
/* /index.html 200
```

This keeps React Router routes working on refresh/direct load.

## Local development

Use `client/.env.example` as a template:

```bash
cp client/.env.example client/.env
```

Default local value:
- `VITE_API_BASE_URL=http://localhost:3000`
