// @ts-check
import { defineConfig } from 'astro/config';

// Static output (the default). No server adapter is needed, so this builds to
// plain HTML/CSS files that drop straight onto Cloudflare Pages.
export default defineConfig({
  site: 'https://shameladdas.net',
  output: 'static',
  trailingSlash: 'ignore',
});
