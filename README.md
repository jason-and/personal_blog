# Andrew's Atlas

Personal blog and digital garden built with [Eleventy (11ty)](https://www.11ty.dev/). Content is written in Markdown using Obsidian (`src/` is the Obsidian vault). Wikilinks (`[[page]]`) are supported and backlinks are automatically collected.

## Local development

```bash
npm start
```

Opens at `http://localhost:8080` with live reload on file changes.

To build without serving:

```bash
npm run build
```

Output goes to `_site/`.

---

## Project structure

```
personal_blog/
├── .eleventy.js              # Eleventy config: filters, collections, markdown
├── package.json
├── src/                      # Input directory (also the Obsidian vault)
│   ├── index.md              # Homepage
│   ├── photography.md        # Photo gallery page
│   ├── changelog.md
│   ├── tooling.md
│   ├── posts/                # Blog posts
│   │   └── posts.json        # Default frontmatter for all posts
│   ├── photos/               # Standalone photo entries (no full post)
│   │   └── photos.json       # Default frontmatter for standalone photos
│   ├── assets/
│   │   └── photos/           # Image files referenced by gallery_image
│   ├── css/style.css
│   ├── _includes/
│   │   ├── layouts/
│   │   │   ├── base.njk      # Main HTML shell
│   │   │   └── post.njk      # Post layout
│   │   ├── nav.njk
│   │   └── post-list.njk
│   └── _data/                # Global data files
└── _site/                    # Build output (gitignored)
```

---

## Writing content

### Blog post frontmatter

```yaml
---
title: My Post Title
date: 2026-01-15
modified: 2026-02-10       # optional, tracked by Obsidian plugin
status: published           # or draft (drafts are not built)
tags: [posts]
---
```

### Adding a photo to the gallery

Any page with a `gallery_image` field appears on the `/photography` gallery page.

**Option 1 — Link a post to the gallery:**

Add `gallery_image` to any post's frontmatter. The lightbox will include a "Read post" link.

```yaml
---
title: My Post Title
status: published
tags: [posts]
gallery_image: /assets/photos/my-photo.jpg
gallery_caption: Optional caption shown in the gallery  # falls back to title
---
```

**Option 2 — Standalone photo (no associated post):**

Create a Markdown file in `src/photos/`. It inherits `layout: base`, `type: photo`, `status: published` from `photos.json`.

```yaml
---
title: Chicago Lakefront
date: 2026-02-10
gallery_image: /assets/photos/lakefront.jpg
gallery_caption: Looking east from the shoreline
---
```

Place the image file at `src/assets/photos/<filename>`.

### Gallery behavior

- `/photography` shows all gallery items in a responsive grid (newest first)
- Hovering a tile reveals the caption
- Clicking a tile opens a fullscreen lightbox
- If the item is a post, the lightbox shows a "Read post →" link
- Close with **Esc**, clicking outside the image, or the × button

---

## Eleventy collections

| Collection | Contents |
|---|---|
| `publishedPosts` | Posts tagged `posts` with `status: published`, sorted newest-first |
| `galleryItems` | All content with `gallery_image` set and not `draft`, sorted newest-first |
| `contentByModifiedDate` | All non-draft, non-page content with a `modified` date, sorted by modified |
| `backlinks` | Map of page slug → list of pages that link to it via `[[wikilinks]]` |
