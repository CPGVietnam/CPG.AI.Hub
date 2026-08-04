# CPG AI Hub

Clean Vite multi-page source for the CPG Vietnam Digital Office. Shared HTML is maintained once through partials; the build outputs six independent static pages.

## Development

```bash
npm install
npm run dev
```

## Build and deploy

```bash
npm run build
```

Deploy the generated `dist/` directory. For Cloudflare Pages, use `npm run build` and output directory `dist`.

## Structure

```text
CPG.AI.Hub/
├── public/             # Images and static hosting files
├── src/
│   ├── pages/          # Six minimal HTML entries
│   ├── partials/       # Shared head, navbar, hero and main content
│   ├── styles/         # Existing ordered stylesheet layers
│   ├── components/     # Shared interface behavior
│   ├── modules/        # Feature behavior
│   ├── core/           # EN/VI translations
│   ├── utils/
│   └── app.js          # Application bootstrap
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

Do not edit `dist/` directly. Edit `src/` or `public/`, then rebuild.
