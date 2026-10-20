# Alvin Solteo — Virtual Assistant Portfolio

A responsive, single-page portfolio website for Alvin Solteo, a virtual assistant based in Davao City, Philippines (executive assistance, HR & recruitment support, and administrative operations).

Plain HTML, CSS and JavaScript. There is **no build step and no dependencies**. Open `index.html` in a browser, or host the folder as-is.

## Features

- Warm, editorial design with light and dark themes (follows the visitor's system setting)
- Hero with portrait, floating service cards and scroll indicator
- "Worked with teams" logo marquee
- About section with animated counters, services, and an experience timeline that fills as you scroll
- Tools section with category tabs and 59 tool logos
- Education, certificates gallery with lightbox, and a video recording
- Testimonials carousel (arrows, name tabs, swipe, keyboard, auto-advance)
- Scroll progress bar, reveal-on-scroll animations, mobile menu
- Respects `prefers-reduced-motion`

## Project structure

```
.
├── index.html            Page content and structure
├── css/
│   └── styles.css        All styling (design tokens + dark mode at the top)
├── js/
│   └── main.js           Tools data, tabs, lightbox, video, carousel, animations
├── assets/
│   ├── images/           Portrait and video poster
│   ├── video/            EVS video recording (mp4)
│   ├── certificates/     Certificate images (shown in the lightbox)
│   ├── logos/
│   │   ├── orgs/         Logos in the "worked with teams" marquee
│   │   └── tools/        One logo file per tool (SVG or PNG)
│   └── favicon.svg
├── .nojekyll
├── .gitignore
└── README.md
```

## Run locally

Opening `index.html` directly works. To preview the way a host would serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy with GitHub Pages

1. Create a new repository on GitHub and upload the **contents** of this folder (so `index.html` is at the repository root).
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select the `main` branch and the `/ (root)` folder, then **Save**.
4. After a minute or two the site is live at `https://<your-username>.github.io/<repository-name>/`.

The `.nojekyll` file tells GitHub Pages to serve the files exactly as they are.

## Things to update before you publish

- **Contact email** — the "Get in touch" button in `index.html` (search for `hello@example.com`) is a placeholder. Replace it with a real address.
- **Open Graph preview image** (optional) — add an `og:image` meta tag with the full URL of an image once the site is live.

## Editing content

| To change… | Edit… |
| --- | --- |
| Headline, about text, services, experience, education | `index.html` |
| Testimonials | the `#testimonials` section in `index.html` (one `<figure class="tm-slide">` per quote) |
| Tools and their categories | the `data` array in `js/main.js` |
| A tool logo | replace the file in `assets/logos/tools/` (names are listed in the `ICONS` map in `js/main.js`) |
| Marquee logos | `LOGOS` in `js/main.js` and the files in `assets/logos/orgs/` |
| Certificates | the `certs` array in `js/main.js` and the files in `assets/certificates/` |
| Colors and fonts | the `:root` block at the top of `css/styles.css` |

## Credits and notes

- Fonts: [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) and [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts (loaded from the web, so the page needs an internet connection to show them).
- Some tool logos come from the open-source icon sets [Iconify Logos](https://icon-sets.iconify.design/logos/), [Simple Icons](https://simpleicons.org/) and [Lucide](https://lucide.dev/); the rest were supplied by Alvin Solteo.
- All product, company and organisation names and logos are trademarks of their respective owners and are shown only to identify the tools used and organisations worked with.
- The photo, video, certificates and testimonials belong to Alvin Solteo and the people who provided them.
