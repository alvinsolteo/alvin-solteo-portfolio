# Alvin Solteo — Virtual Assistant Portfolio

A responsive, single-page portfolio website for Alvin Solteo, a virtual assistant based in Davao City, Philippines (executive assistance, HR & recruitment support, and administrative operations).

Plain HTML, CSS and JavaScript. There is **no build step and no dependencies**. Open `index.html` in a browser, or host the folder as-is.

## Features

- Loading screen on every visit (animated monogram, progress ring and a curtain reveal)
- Warm, editorial design with light and dark themes (follows the visitor's system setting)
- Hero with portrait, floating service cards and scroll indicator
- "Worked with teams" logo marquee
- About section with animated counters, services, and an experience timeline that fills as you scroll
- Tools section with category tabs and 59 tool logos
- Education, certificates gallery with lightbox, and a video recording
- Compact testimonials carousel (arrows, name tabs, swipe, keyboard, auto-advance); long quotes collapse behind a "Read more" button, so the card stays small on phones
- Scroll progress bar, reveal-on-scroll animations, mobile menu
- Respects `prefers-reduced-motion`

## Project structure

```
.
├── index.html              Page content and structure
├── css/
│   └── styles.css          All styling (design tokens + dark mode at the top)
├── js/
│   └── main.js             Loading screen, tools data, tabs, lightbox, video, carousel, animations
├── assets/
│   ├── images/             Portrait and video poster
│   ├── video/              EVS video recording (mp4)
│   ├── certificates/       Certificate images (shown in the lightbox)
│   ├── logos/
│   │   ├── orgs/           Logos in the "worked with teams" marquee
│   │   └── tools/          One logo file per tool (SVG or PNG)
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

## Deploy

The site is fully static, so any static host works.

### GitHub Pages
1. Create a repository and upload the **contents** of this folder (so `index.html` is at the repository root).
2. **Settings → Pages → Build and deployment → Deploy from a branch**, choose `main` and `/ (root)`, then **Save**.

### Cloudflare Pages
1. Create a **Pages** project and connect the GitHub repository.
2. Leave the **build command empty** and set the **output directory** to `/` (the root).
3. Deploy. Every push to `main` redeploys automatically.

## The loading screen

- Shows on **every visit and every refresh**.
- Finishes as soon as the page has loaded, with a short minimum time so it doesn't flash. A failsafe always removes it.
- Edit the timings (`MIN`, `MAX`) at the top of `js/main.js`; the look is in the `/* loading screen */` block of `css/styles.css`.

## Contact details

This version of the site **does not publish any contact details or links** (no email, phone, LinkedIn, booking link or chat assistant).

- The hero button **Let's work together** scrolls down to the closing section ("Ready for a more organized way forward?"), which currently has only a **Back to top** button.

To add a contact option later, add a normal link button next to **Back to top** in the `#connect` section of `index.html`, for example `<a class="btn primary" href="mailto:you@example.com">Get in touch</a>`.

## Optional extras

- **Open Graph preview image** — add an `og:image` meta tag with the full URL of an image once the site is live, so links shared on LinkedIn, Facebook or WhatsApp show a picture.

## Editing content

| To change… | Edit… |
| --- | --- |
| Headline, about text, services, experience, education | `index.html` |
| Testimonials | the `#testimonials` section in `index.html` (one `<figure class="tm-slide">` per quote) |
| Tools and their categories | the `data` array in `js/main.js` |
| A tool logo | replace the file in `assets/logos/tools/` (names are listed in the `ICONS` map in `js/main.js`) |
| Marquee logos | `LOGOS` in `js/main.js` and the files in `assets/logos/orgs/` |
| Certificates | the `certs` array in `js/main.js` and the files in `assets/certificates/` |
| Footer (links, disclaimer) | the `<footer>` at the bottom of `index.html` |
| Colors and fonts | the `:root` block at the top of `css/styles.css` |

## Credits and notes

- Fonts: [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) and [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts (loaded from the web, so the page needs an internet connection to show them).
- Some tool logos come from the open-source icon sets [Iconify Logos](https://icon-sets.iconify.design/logos/), [Simple Icons](https://simpleicons.org/) and [Lucide](https://lucide.dev/); the rest were supplied by Alvin Solteo.
- All product, company and organisation names and logos are trademarks of their respective owners and are shown only to identify the tools used and organisations worked with.
- The photo, video, certificates and testimonials belong to Alvin Solteo and the people who provided them.
