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
| Contact details and form | `src/pages/contact.astro` |
| The CV file people download | `public/cv/Addas_CV_May2026.pdf` |
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

Requires [Node.js](https://nodejs.org) 18 or newer.

```bash
npm install      # first time only
npm run dev      # live preview at http://localhost:4321
npm run build    # produces the static site in dist/
npm run preview  # serves the built dist/ to double-check before deploying
```

## Updating the CV

Replace `Addas_CV_May2026.docx` in the project root with your latest CV, then regenerate the PDF
(LibreOffice must be installed):

```bash
soffice --headless --convert-to pdf --outdir public/cv "Addas_CV_May2026.docx"
```

If the filename changes, update the `cvHref` in `src/layouts/Base.astro` and the link in
`src/pages/index.astro`.

## Contact Form

The form uses [Web3Forms](https://web3forms.com) (free, no backend). Create an access key by entering
your destination email on their site, then paste the key into `WEB3FORMS_ACCESS_KEY` near the top of
`src/pages/contact.astro`.

## Deploying (Cloudflare Pages)

1. Push this repository to GitHub.
2. In the Cloudflare dashboard, go to **Workers & Pages**, then **Create**, then **Pages**, and connect
   the GitHub repository.
3. Build settings: framework preset **Astro**, build command `npm run build`, output directory `dist`.
4. After the first deploy succeeds, add the custom domains (`shameladdas.net` and `shameladdas.com`)
   under the project's **Custom domains** tab, and add a Redirect Rule to send `.com` to `.net`.

Every `git push` to the main branch then rebuilds and redeploys automatically, usually within a minute.

## Notes

- `public/_redirects` sends legacy URLs (for example, `/experiments` and `/clock`) to the new pages.
- The receipts and source `.docx` files in the project root are excluded from git by `.gitignore`, so
  they are never published.
