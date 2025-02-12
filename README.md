This is a test task for an interview

Node version: `v22.13.1`

Installation:
1) `npm i`
2) Create file `src/environments/environment.dev.ts` and copy all contents from `src/environments/environment.ts`
3) Replace API_KEY placeholder value in `environment.dev.ts`: refer to https://openweathermap.org/guide on how to register and get an one.

Static checks:
- `npm run lint`
- `npm run build` to check asset budgets
- `npm run test` to run karma server; `npm run test:ci` headless
- `npm run e2e` to open cypress; `npm run e2e:ci` headless

Serve locally:
`ng serve`