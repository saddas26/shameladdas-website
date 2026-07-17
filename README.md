# shameladdas.net

The personal academic website of Shamel Addas, built as a static [Astro](https://astro.build)
site and hosted free on [Cloudflare Pages](https://pages.cloudflare.com). No WordPress, no database,
no server. Editing is just editing text files and pushing to git.

## What Lives Where

| You want to change... | Edit this file |
|---|---|
| Publications | `src/data/publications.yaml` |
| Teaching (courses, supervision) | `src/data/teaching.yaml` |
| Media coverage | `src/data/media.yaml` |
| Home bio, research interests, recognition | `src/pages/index.astro` |
| Contact details | `src/pages/contact.astro` |
| The CV file people download | `public/cv/Addas_CV.pdf` |
| Headshot | `public/images/headshot.jpg` |
| Look and feel (colors, fonts, spacing) | `src/styles/global.css` |
| Header name and navigation | `src/layouts/Base.astro` |

## Adding a Publication

Open `src/data/publications.yaml`, copy one `- authors:` block, paste it at the top of the right list
(`journal_articles`, `conference_papers`, or `case_studies`), and edit the fields:

```yaml
  - authors: "Addas, S., and Coauthor, A."
    year: 2026
    title: "Title of the Paper"
    venue: "MIS Quarterly"
    detail: "50(1), 1-20"      # optional: volume(issue), pages
    tags: ["FT-50", "ABDC A*"]  # optional: quality badges
    url: "https://doi.org/..."  # optional: makes the title a clickable link
```

Save, then commit and push (see Deploying). The same copy-a-block pattern works for `teaching.yaml`
and `media.yaml`.

## Running It Locally

Requires [Node.js](https://nodejs.org) 22, the version pinned in `.nvmrc` and `.node-version` and used by the Cloudflare build.

```bash
npm install      # first time only
npm run dev      # live preview at http://localhost:4321
npm run build    # produces the static site in dist/
npm run preview  # serves the built dist/ to double-check before deploying
```

## Updating the CV

Edit `Addas_CV.docx` in the project root. This is your working copy; it is gitignored and never
published. Bump the `Last updated: <Month> <Year>` line near the top, then regenerate the PDF
(LibreOffice must be installed):

```bash
soffice --headless --convert-to pdf --outdir public/cv "Addas_CV.docx"
```

The published file always keeps the same stable name, `public/cv/Addas_CV.pdf`, so no links ever
need changing and old bookmarks keep working. The only thing to keep current is the human-readable
date, in two places: the `Last updated` line in the CV itself, and the matching note in the
publications page intro (`src/pages/publications.astro`). Then commit and push.

## Contact Page

The contact page has no form or backend. It lists the office and email details and shows an "Email Me"
button that is a plain `mailto:` link. To change the address, edit `src/pages/contact.astro`.

## Deploying (Cloudflare Pages)

Connecting the repository to Cloudflare is a one-time setup. Do these steps only once, when first
creating the site:

1. Push this repository to GitHub.
2. In the Cloudflare dashboard, go to **Workers & Pages**, then **Create**, then **Pages**, and connect
   the GitHub repository.
3. Build settings: framework preset **Astro**, build command `npm run build`, output directory `dist`.
4. After the first deploy succeeds, add the custom domains (`shameladdas.net` and `shameladdas.com`)
   under the project's **Custom domains** tab, and add a Redirect Rule to send `.com` to `.net`.

After that, deployment is automatic. You do not need to open the Cloudflare dashboard again for routine
updates: every `git push` to the `main` branch triggers Cloudflare to rebuild and redeploy the site by
itself, usually within a minute. Editing files and pushing to GitHub is the entire deploy.

## Notes

- `public/_redirects` sends legacy URLs (for example, `/experiments` and `/clock`) to the new pages.
- The receipts and source `.docx` files in the project root are excluded from git by `.gitignore`, so
  they are never published.
