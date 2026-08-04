import { cpSync, existsSync, mkdirSync, readFileSync, renameSync, rmSync } from 'node:fs';
import { basename, resolve } from 'node:path';
import { defineConfig } from 'vite';

const root = import.meta.dirname;
const pages = {
  'index.html': { title: 'CPG AI Hub | Home', bodyClass: 'page-home', hero: 'hero-home', homeActive: ' active' },
  'learn.html': { title: 'CPG AI Hub | Learn AI', bodyClass: 'page-learn', hero: 'hero-standard' },
  'tools.html': { title: 'CPG AI Hub | AI Tools', bodyClass: 'page-tools', hero: 'hero-standard', toolsActive: ' active' },
  'insights.html': { title: 'CPG AI Hub | News', bodyClass: 'page-insights', hero: 'hero-standard', newsActive: ' active' },
  'submit-idea.html': {
    title: 'CPG AI Hub | Submit Idea', bodyClass: 'page-ideas', hero: 'hero-standard', submitActive: ' active',
    navCta: '<a class="btn-primary-sm active" href="submit-idea.html#share-ideas">Submit Idea</a>',
  },
  'manager.html': {
    title: 'CPG AI Hub | Manager View', bodyClass: 'page-manager', hero: 'hero-standard',
    managerLink: '<a class="nav-link active" href="manager.html#dashboard">Manager View</a>',
  },
};

const partial = name => readFileSync(resolve(root, 'src', 'partials', `${name}.html`), 'utf8');
function renderPage(page) {
  const data = { homeActive: '', toolsActive: '', submitActive: '', newsActive: '', managerLink: '', navCta: '', ...page };
  let html = partial('page').replace(/\{\{>\s*([\w-]+)\s*\}\}/g, (_, name) => partial(name === 'hero' ? data.hero : name));
  return html.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, key) => data[key] ?? '');
}

function cpgHtmlPartials() {
  return {
    name: 'cpg-html-partials',
    transformIndexHtml: {
      order: 'pre',
      handler(html, context) {
        const page = pages[basename(context.filename)];
        return page ? renderPage(page) : html;
      },
    },
    configureServer(server) {
      server.middlewares.use((request, _response, next) => {
        const pathname = (request.url ?? '/').split('?')[0];
        if (pathname === '/') request.url = '/src/pages/index.html';
        else if (pages[pathname.slice(1)]) request.url = `/src/pages${pathname}`;
        next();
      });
    },
    writeBundle() {
      const output = resolve(root, 'dist');
      for (const directory of ['src/core', 'src/components', 'src/modules', 'src/utils']) {
        const from = resolve(root, directory);
        const to = resolve(output, directory);
        if (!existsSync(from)) continue;
        mkdirSync(to, { recursive: true });
        cpSync(from, to, { recursive: true });
      }
      mkdirSync(resolve(output, 'src'), { recursive: true });
      cpSync(resolve(root, 'src/app.js'), resolve(output, 'src/app.js'));
      const generatedPages = resolve(output, 'src', 'pages');
      for (const file of Object.keys(pages)) renameSync(resolve(generatedPages, file), resolve(output, file));
      rmSync(generatedPages, { recursive: true, force: true });
    },
  };
}

export default defineConfig({
  root,
  publicDir: resolve(root, 'public'),
  plugins: [cpgHtmlPartials()],
  build: {
    rollupOptions: {
      input: Object.fromEntries(Object.keys(pages).map(file => [file.replace('.html', ''), resolve(root, 'src', 'pages', file)])),
    },
  },
});
