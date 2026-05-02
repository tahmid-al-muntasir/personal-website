# Tahmid Al Muntasir — Personal Site

A Next.js 14 personal website with editorial design. Built to replace the v0.app version with full content ownership.

## Stack
- **Framework**: Next.js 14 (App Router, static export)
- **Styling**: Tailwind CSS + custom CSS variables
- **Fonts**: Playfair Display (headings), Source Serif 4 (body), JetBrains Mono (labels/code)
- **Deployment**: Vercel (free tier)

## Quick Start

```bash
npm install
npm run dev
```

Site runs at `http://localhost:3000`

## Deployment to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Framework: Next.js (auto-detected)
4. Deploy

That's it. Every push to main auto-deploys.

## Customizing Content

**All content lives in one file**: `src/data/site.js`

### Update your links
```js
links: {
  github: "https://github.com/YOUR_USERNAME",
  linkedin: "https://linkedin.com/in/YOUR_PROFILE",
  kaggle: "https://www.kaggle.com/YOUR_USERNAME",
  leetcode: "https://leetcode.com/YOUR_USERNAME",
  cv: "/cv.pdf",   // put cv.pdf in the public/ folder
}
```

### Add a blog post
Add an object to the `posts` array in `src/data/site.js`:
```js
{
  slug: "my-post-slug",           // URL: /blog/my-post-slug
  title: "My Post Title",
  date: "2026-05-01",
  category: "research",           // research | devlog | language | math | note | linkedin
  pillar: "P1",                   // optional: P1, P2, P3
  tags: ["Tag1", "Tag2"],
  readTime: "5 min",
  excerpt: "Short description shown in listing.",
  content: `
## Section heading

Your content in Markdown-like syntax.

Supports **bold**, *italic*, \`inline code\`, code blocks, tables, blockquotes, and bullet lists.
  `,
}
```

### Add media
1. Put photo files in `public/media/`
2. Update the `mediaItems` array in `src/app/media/page.jsx`
3. Replace the placeholder `<div>` with `<img src="/media/your-photo.jpg" alt="..." />`

For videos: embed YouTube/Vimeo iframes.

### Set up the contact form
1. Go to [formspree.io](https://formspree.io) → Create free account → New Form
2. Copy your form ID (looks like `xpzgwkab`)
3. In `src/app/contact/page.jsx`, replace `YOUR_FORM_ID`:
```js
const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', ...
```

### Upload your CV
Put `cv.pdf` in the `public/` folder. The download link already points to `/cv.pdf`.

## Site Structure

```
src/
  app/
    page.jsx          ← Home
    research/         ← Research pillars + timeline
    projects/         ← Project cards with GitHub links
    papers/           ← Academic papers page
    blog/
      page.jsx        ← Blog index with category filter
      [slug]/         ← Individual post
    media/            ← Photos and videos
    now/              ← /now page
    contact/          ← Contact form
  components/
    Nav.jsx           ← Sidebar + mobile nav
  data/
    site.js           ← ALL CONTENT LIVES HERE
  styles/
    globals.css       ← Design system
```

## Blog Categories

| Category | Description |
|---|---|
| `research` | Technical deep-dives into the 3 pillars |
| `devlog` | Error logs, debugging sessions, raw progress |
| `math` | Intuition-first explanations of RL/ML/math |
| `language` | German/Japanese/Arabic learning logs |
| `note` | Short reflections and thoughts |
| `linkedin` | LinkedIn posts archived here |

## Design System

Color palette (edit in `globals.css` and `tailwind.config.js`):
- `--ink`: #0d0d0d — primary text
- `--paper`: #f5f0e8 — background
- `--cream`: #ede8dc — card backgrounds
- `--rust`: #b84a2f — primary accent (P1, actions)
- `--amber`: #c97b2a — secondary accent (P2)
- `--sage`: #4a6741 — tertiary accent (P3)
- `--muted`: #8a8070 — labels and metadata

## Replacing Placeholders

- [ ] Update all `siteConfig.links` in `src/data/site.js`
- [ ] Add real `cv.pdf` to `public/`
- [ ] Set Formspree ID in `src/app/contact/page.jsx`
- [ ] Add your photo to `public/media/` and update `media/page.jsx`
- [ ] Replace placeholder GitHub repo URLs in `src/data/site.js` projects array
- [ ] Write real blog posts (or keep the starters — they're real enough)
- [ ] Update LinkedIn URL
