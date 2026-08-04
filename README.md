# CPG AI Hub

Static multi-page website for the CPG Vietnam Digital Office. This version keeps the existing interface and behavior while organizing the source by responsibility and feature.

## Run locally

From the project directory:

```bash
python -m http.server 7890
```

Open `http://localhost:7890/`. No package installation or build step is required.

## Project structure

```text
CPG.AI.Hub-refactored/
├── index.html
├── learn.html
├── tools.html
├── insights.html
├── submit-idea.html
├── manager.html
├── assets/
│   ├── images/                 # Logos and content images
│   └── styles/
│       ├── core.css            # Tokens, reset, layout, typography
│       ├── components.css      # Shared UI components
│       ├── theme.css           # Editorial theme and refinements
│       ├── features.css        # Workflow, dashboard, and hero features
│       └── pages.css           # Page visibility and final overrides
└── src/
    ├── app.js                  # Application bootstrap only
    ├── core/i18n.js            # EN/VI translations
    ├── components/             # Navigation, safety reader, footer
    ├── modules/                # Home, tools, learn, insights, ideas, auth
    └── utils/scroll-reveal.js
```

## Architecture rules

- Keep shared interface behavior in `src/components`.
- Keep page or business features in `src/modules/<feature>`.
- Keep translations in `src/core/i18n.js`.
- Keep initialization calls in `src/app.js`.
- Preserve the stylesheet link order; later files contain intentional overrides from the original cascade.
- Add new images under `assets/images`.

## Current behavior preserved

- Six static HTML destinations and their existing anchors.
- English/Vietnamese switching.
- Navigation, dropdowns, responsive behavior, and scroll effects.
- Quick Start tabs and the connected design workflow.
- Videos, global firms map, AIOS, timeline, idea form/feed, and Manager View.
- Data-safety reader, Microsoft 365 demonstration flow, and footer reveal.

## Future backend handoff

Authentication, forum, CMS, API, and PostgreSQL are not implemented in this refactor. Add them later as separate `frontend/`, `backend/`, `database/`, and `docs/` surfaces instead of placing backend logic inside the current static modules.