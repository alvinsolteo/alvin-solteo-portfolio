# Alvin Solteo — Virtual Assistant Portfolio

A responsive, single-page portfolio website for Alvin Solteo, a virtual assistant based in Davao City, Philippines (executive assistance, HR & recruitment support, and administrative operations).

Plain HTML, CSS and JavaScript. There is **no build step and no dependencies**. Open `index.html` in a browser, or host the folder as-is.

## Features

- Loading screen on the first visit of each browser session (animated monogram, progress ring and a curtain reveal)
- Chat assistant ("Alvin's Assistant") with suggested questions — works out of the box, with an optional upgrade to a real AI model
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
├── index.html              Page content and structure
├── css/
│   └── styles.css          All styling (design tokens + dark mode at the top)
├── js/
│   ├── main.js             Loading screen, tools data, tabs, lightbox, video, carousel, animations
│   └── chat.js             Chat assistant widget + built-in answers
├── functions/
│   └── api/
│       └── chat.js         OPTIONAL Cloudflare Pages Function that powers AI replies
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

### GitHub Pages
1. Create a repository and upload the **contents** of this folder (so `index.html` is at the repository root).
2. **Settings → Pages → Build and deployment → Deploy from a branch**, choose `main` and `/ (root)`, then **Save**.

GitHub Pages serves static files only, so the chat runs in **built-in mode** there (see below).

### Cloudflare Pages
1. Create a **Pages** project and connect the GitHub repository.
2. Leave the **build command empty** and set the **output directory** to `/` (the root).
3. Deploy. Every push to `main` redeploys automatically.

Cloudflare Pages also runs the files in `functions/` automatically, which is what enables the optional AI mode.

## The loading screen

- Shows once per browser session (it is skipped when the visitor reloads or navigates within the same tab session).
- Finishes as soon as the page has loaded, with a short minimum time so it doesn't flash. A failsafe always removes it.
- Edit the timings (`MIN`, `MAX`) at the top of `js/main.js`; the look is in the `/* loading screen */` block of `css/styles.css`.
- To show it on every load, delete the `sessionStorage.setItem('as-visited', '1')` line in `js/main.js`.

## The chat assistant

The widget (`js/chat.js`) has two modes and picks the right one automatically.

**1. Built-in mode (default — nothing to set up).** The assistant answers from a small knowledge base written inside `js/chat.js`: services, experience, tools (including "Do you use Asana?"-style questions), education, certificates, testimonials, location, contact and so on. It matches keywords in the visitor's question, so it is **not** an AI model: it can't answer questions outside what is written there, and it says so politely and points to the contact section. It works on GitHub Pages, Cloudflare, or any static host, and costs nothing.

**2. AI mode (optional — Cloudflare Pages).** If `/api/chat` exists, replies come from a real AI model instead, so visitors can ask free-form questions. The function in `functions/api/chat.js` keeps your API key on the server and never sends it to the browser. If the endpoint is missing or errors, the widget falls back to built-in mode on its own.

### Turn on AI mode
1. Deploy to **Cloudflare Pages** (see above).
2. Get an API key from the [Anthropic Console](https://console.anthropic.com/). **Set a monthly spend limit there** — the chat is public.
3. In Cloudflare: your Pages project → **Settings → Variables and Secrets** (use the *Production* environment). Add:
   - `ANTHROPIC_API_KEY` — your key (add it as a **Secret**)
   - `ALLOWED_ORIGINS` — your site address(es), comma-separated, e.g. `https://yourname.pages.dev,https://yourdomain.com` (blocks other websites from using your endpoint)
   - `ANTHROPIC_MODEL` — optional. The default is set at the top of `functions/api/chat.js`; check the [Claude docs](https://docs.claude.com) for current model names and pricing.
4. **Redeploy** (variables apply to new deployments). Open the site and ask the chat a free-form question — the footer under the input changes to "AI assistant".

### Safety notes for AI mode
- The function only accepts short chat messages (last 10 messages, 600 characters each) and limits reply length.
- The assistant is told to use only the facts in its prompt and to send anything else (rates, availability, phone, etc.) to the contact section.
- For extra protection against abuse, add a **Cloudflare rate-limiting rule** for `/api/chat` (Security → WAF → Rate limiting rules).
- If you change the site's content (new job, new tool, new certificate), update the facts in `SYSTEM_PROMPT` in `functions/api/chat.js` and the answers in `js/chat.js`.
- If you deploy with Cloudflare **Workers** instead of **Pages**, the `functions/` folder is not used; the same code needs a small wrapper, or host the endpoint separately and set `endpoint` in `CHAT_CONFIG` at the top of `js/chat.js`.

### Edit the built-in answers
Open `js/chat.js` and look for the `KB` array. Each entry has keywords (`k`), the answer (`a`, supports `**bold**`, `- ` bullet lines and `[link text](#section-id)`) and follow-up suggestion chips (`next`). Set `aiEnabled: false` in `CHAT_CONFIG` to force built-in mode.

## Contact details

Alvin's email and phone number appear in the closing call-to-action button and the chat assistant's answers; the footer shows only the LinkedIn link and location. To change them, search the project for `alvinsolteo.va@gmail.com`, `+63 981 095 2003` / `+639810952003` and `alvin-solteo-897347292` and update these places:

- `index.html` (the "Get in touch" button; the footer LinkedIn link)
- `js/chat.js` (the `contact` answer in the `KB` array, plus the pricing and availability answers)
- `functions/api/chat.js` (the `CONTACT DETAILS` block of `SYSTEM_PROMPT`, used by AI mode)

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
| Chat answers | the `KB` array in `js/chat.js` |
| Footer (links, contact details, disclaimer) | the `<footer>` at the bottom of `index.html` |
| Colors and fonts | the `:root` block at the top of `css/styles.css` |

## Credits and notes

- Fonts: [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) and [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts (loaded from the web, so the page needs an internet connection to show them).
- Some tool logos come from the open-source icon sets [Iconify Logos](https://icon-sets.iconify.design/logos/), [Simple Icons](https://simpleicons.org/) and [Lucide](https://lucide.dev/); the rest were supplied by Alvin Solteo.
- All product, company and organisation names and logos are trademarks of their respective owners and are shown only to identify the tools used and organisations worked with.
- The photo, video, certificates and testimonials belong to Alvin Solteo and the people who provided them.
