# Release QA Checklist

## Scope
- Admin dashboard and appointments-by-date flows
- Doctor and patient edit/delete flows
- Appointment booking flow
- Authenticated admin API routes

## Automated Validation
- [x] Client unit/integration tests: `npm test` (in `/Users/cal/Hospital-management/client`)
- [x] Client production build: `npm run build` (in `/Users/cal/Hospital-management/client`)
- [x] Server unit/http tests: `npm test` (in `/Users/cal/Hospital-management/server`)
- [x] Server TypeScript build: `npm run build` (in `/Users/cal/Hospital-management/server`)

## Manual Smoke Checks
- [ ] Admin login handles invalid credentials with visible error
- [ ] Open `/admin/appointments`, pick date, verify list/filter states
- [ ] Dashboard right panel updates appointments count/list for selected date
- [ ] Edit doctor modal saves, updates UI, and handles API errors
- [ ] Delete doctor modal requires confirm click and shows API errors
- [ ] Edit patient modal saves, updates UI, and handles API errors
- [ ] Delete patient modal requires confirm click and shows API errors
- [ ] Book appointment modal validates fields and refreshes doctor appointments

## Deployment Readiness
- [ ] Confirm API base URLs and env vars for target environment
- [ ] Confirm JWT secret/session settings in production config
- [ ] Verify Cloudflare static hosting config for client (`client/wrangler.toml`)
- [ ] Verify server deployment target and CORS `CLIENT_URI`
