import fs from 'node:fs/promises';
import { IS_PROD, BASE } from '../app/env.js';
import { vite } from '../app/appExpress.js';

export async function renderMiddleware(req, res) {
  try {
    const templateHtml = IS_PROD
      ? await fs.readFile('./dist/client/index.html', 'utf-8')
      : '';

    const ssrManifest = IS_PROD
      ? await fs.readFile('./dist/client/.vite/ssr-manifest.json', 'utf-8')
      : undefined;

    const url = req.originalUrl.replace(BASE, '');

    let template;
    let render;

    if (!IS_PROD) {
      template = await fs.readFile('./index.html', 'utf-8');
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render;
    } else {
      template = templateHtml;
      render = (await import('../dist/server/entry-server.js')).render;
    }

    const rendered = await render(url, ssrManifest);

    const html = template
      .replace('<!--app-head-->', rendered.head ?? '')
      .replace('<!--app-html-->', rendered.html ?? '');

    res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
  } catch (error) {
    vite?.ssrFixStacktrace(error);
    console.log(error);
    res.status(500).end(error.stack);
  }
}

