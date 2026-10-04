# Cinematic CV & Portfolio

A scroll-driven personal CV website. As visitors scroll, the letters of your name gather into a
graduation scene, and each chapter's image hands over to the next in the style of Apple's product pages: the
current image zooms towards the viewer, blurs and dissolves while the next rises from the depth
and sharpens into focus, with smaller images drifting around it for depth. Graduation cap →
storefront → handshake → bank → phone → laptop → chart → team → shopping cart → truck → open book → sunrise.
It is followed by selected projects, a skills summary, your aim and future goal, and contact details.

Built with **React + TypeScript + Vite**. No animation library: the page scrolls natively, the stage is
`position: sticky`, and a small engine drives transform, opacity and blur from the scroll position.

Career chapters combine organisation logos and real photography, with supporting
[Phosphor Icons](https://phosphoricons.com) illustrations (MIT licence, see
`public/images/journey/LICENSE`). The visual system uses deep green and warm ivory.
Downloaded asset sources are recorded in `public/images/SOURCES.md`; illustrative
photography is identified in captions and alt text.

Colours live as tokens at the top of `src/styles/global.css` (`--bg`, `--accent`, …) — change them
there to re-theme the whole site.

---

## Quick start

```bash
npm install
npm run dev        # local preview with hot reload → http://localhost:5173
npm run build      # production build into dist/ (type-check + prerender)
npm run preview    # serve the production build → http://localhost:4173
npm run check      # lint + tests + build — run before deploying
```

Node 20 or newer is recommended.

---

## Updating your content

**Everything you would want to edit lives in one file: [`src/data/resume.ts`](src/data/resume.ts).**
You never need to touch the animation code to change text, dates, roles or projects.

| Section in the file | What it controls |
| --- | --- |
| `personalDetails` | Name, initials, current title, location, positioning statement, summary, CV file, photo |
| `contactLinks` | Email, LinkedIn, optional phone, optional contact-form endpoint |
| `education` | Banking & Finance degree and MSc Project Management |
| `experience` | Every job, oldest first |
| `futureGoal` | Aim, long-term goal, impact, opportunities, closing line |
| `journeyOrder` | The order of the journey chapters |
| `currentFocus` | The “Now” strip under the journey |
| `projects` | Selected projects |
| `businessImpact` | Career-wide outcomes, keeping approximate metrics qualified |
| `skillGroups` | Skill groups and the roles where each was developed |
| `technology` | Data, business systems, productivity and AI tools |
| `certifications` | Certifications and professional development; unknown issuers remain empty |
| `languages` | Language proficiency as stated in the CV |
| `photographs` | Shared local photos used by career chapters and projects |
| `site` | Public URL (for social sharing) and placeholder highlighting |

### Placeholders

The current content is based on `Files/Ali_CV_Photo.pdf`, including nine roles,
two degrees and eight project areas. Early employment dates overlap as recorded
in the CV. The supplied PDF is served from `public/cv/Ali_CV_Photo.pdf`, and its
portrait is extracted to `public/images/ali-isa-mohsen.png`. Career direction and
project challenges are editorial summaries of the CV; no additional metrics,
certification dates or target roles are inferred. The public site URL remains
empty until a deployment address is chosen.

Anything in `[square brackets]` is a placeholder — e.g. `[Company name]`, `[Add team size]`,
`[Add a measurable result]`. Replace the brackets and their contents with your own words.

While `site.highlightPlaceholders` is `true`, every remaining placeholder is shown on the page with a
dashed blue underline so you can spot any you missed. Set it to `false` before launch (or simply
replace all of them). Tip: search the file for `[` to find them all.

Keep each stage to **two to four achievements** and don’t nest brackets inside brackets. The tests
(`npm test`) check both.
For detailed roles, `details` holds the complete responsibility list for the
printable résumé, while `achievements` provides short highlights for the journey.

### Journey stage fields

```ts
{
  id: 'store-manager',          // unique, URL-safe
  kind: 'experience',           // 'education' | 'experience' | 'goal'
  visual: {                     // the stage's image (see "Images" below)
    src: 'images/journey/storefront.svg',
    alt: 'A retail store',
    extras: ['images/journey/shopping-bag.svg'], // optional, up to 4 floating images
  },
  title: 'Store Manager',       // role or qualification
  shortTitle: 'Store Manager',  // optional: shorter label for the progress indicator
  organization: '[Company name]',
  location: '[City, Country]',
  start: '[Start month year]',
  end: '[End month year]',      // or 'Present'
  ongoing: false,               // true shows an “Ongoing” badge
  description: '…',
  achievements: ['…', '…'],     // 2–4 items, revealed one by one while scrolling
  skills: ['…'],
  results: [{ value: '+18%', label: 'Sales vs. target' }], // optional
  media: { src: 'images/…', alt: '…', kind: 'certificate', width: 1200, height: 850 }, // optional
}
```

---

## Adding a future job

1. Add a new entry to the `experience` array in `src/data/resume.ts`.
2. Give it a `visual`: drop an SVG (or PNG/WebP) into `public/images/journey/` and point `src`
   at it, with a short `alt`. Add up to four `extras` for the floating images. Reusing images
   already in the folder is fine.
3. Add its `id` to `journeyOrder`, before `'aim'`.
4. If the previous role has ended, change its `end` from `'Present'` and remove `ongoing: true`.
5. Update `currentFocus.stageIds` and any `skillGroups[].developedIn` lists.
6. Run `npm run check`.

The progress indicator, résumé view, skills strips and scroll length all adjust automatically.

*(The transition itself — zoom, blur, fade and the depth of the extras — is tuned in
`src/lib/appleTransition.ts`.)*

---

## Images, photo and logos

**Journey images.** `public/images/brands/` holds the organisation logos,
`public/images/photos/` holds photography, and `public/images/journey/` holds
supporting SVG illustrations. Each stage's `visual.src` is its logo or primary photo;
`visual.kind` is `logo`, `photo` or `icon`. `visual.backdrop` can hold a photo with
intrinsic dimensions; `visual.caption` describes the location or identifies
illustrative photography. Replacing a shared entry in `photographs` updates its
career and project uses together.
More icons in the same style: <https://phosphoricons.com> (download the *Thin* or *Duotone* SVG;
to match the gradient colouring, copy the `<defs>` block and `fill="url(#g)"` from one of the
existing files).

**Other images:**

1. Put images in `public/images/` (SVG, WebP or AVIF, ideally under ~200 KB each).
2. Reference them without a leading slash, e.g. `'images/certificate.webp'`.
3. Always give `alt` text and the image’s real `width` and `height` (prevents layout shift).

Where images can go:

- `personalDetails.photo` — optional profile photo, shown in the contact section and the résumé view.
- `stage.media` — a logo, certificate or photo for a journey chapter (lazy-loaded).
- `project.image` — replaces the project’s image (which otherwise reuses its stage's images).

Social-sharing image: replace `public/og-image.png` (1200 × 630). Favicon: the compass from the
journey set (`index.html`) — point it at any SVG you like.

---

## Attaching your CV

1. Save your CV as a PDF in `public/cv/`, e.g. `public/cv/your-name-cv.pdf`.
2. Set `personalDetails.cvFile: 'cv/your-name-cv.pdf'`.

Until a file is set, every **Download CV** button opens the printable résumé view instead (with a
note that the PDF is coming), so there is never a broken link. Visitors can always use
**Print / Save as PDF** there.

---

## Contact form

The form works with no backend: by default it opens the visitor’s email app with the message
pre-filled (once `contactLinks.email` is set).

To receive messages directly, create a form with a service such as Formspree, Basin or Getform and
set `contactLinks.formEndpoint` to its URL. The form posts `name`, `email` and `message`.

**Privacy:** everything in `resume.ts` is published with the site. Leave `phone` empty (`''`) to
hide it everywhere.

---

## Motion, accessibility and fallbacks

- **Cinematic mode** — scroll-linked transformations. The page is never scroll-jacked; keyboard,
  touch and trackpad scrolling all work natively, and “Skip the journey” is always available.
- **Static mode** — every chapter shown as a still illustration beside its text. Used automatically
  for visitors with *reduce motion* enabled, and whenever the header’s **Animations** switch is off
  (the choice is remembered).
- **Résumé view** (`#resume`, “Skip animations — view résumé”, “View résumé”) — a traditional,
  reverse-chronological, printable résumé with all the same information.
- The production HTML is **prerendered**, so all content is readable without JavaScript and if the
  animation fails for any reason the page falls back to static mode.
- Phones (up to 820px wide) and short landscape screens (up to 600px high) use
  the complete native-scroll journey, with photography above each chapter and no
  hidden achievements. The cinematic mode and its toggle are available on larger
  screens. Resizing preserves the stored animation preference.
- The phone action bar provides access to work, contact and the PDF, with safe-area
  padding for iPhone screen cutouts and the home indicator. Inputs use a 16px font
  to avoid iOS focus zoom. Project details use native keyboard-accessible disclosures.
- Low-powered devices and data-saver mode skip the film grain and fixed backgrounds.
- The progress indicator’s chapter buttons are keyboard-accessible and move focus to the chapter.

---

## Deploying

`npm run build` produces a static site in `dist/`. Asset paths are relative, so it works on a custom
domain or a sub-path.

- **Netlify / Vercel / Cloudflare Pages:** build command `npm run build`, output directory `dist`.
- **GitHub Pages:** run `npm run build` and publish `dist/` (e.g. with the
  `actions/upload-pages-artifact` + `actions/deploy-pages` workflow).
- **Any static host:** upload the contents of `dist/`.

After deploying, set `site.siteUrl` (e.g. `'https://yourname.com/'`) and rebuild so the canonical
link and social-sharing tags use absolute URLs.

---

## Project structure

```
src/
  data/resume.ts            ← all content (edit this)
  data/types.ts             ← content types
  components/
    Hero.tsx                  opening scene (name letters)
    JourneyScene.tsx          sticky stage + scroll engine
    TransformationStage.tsx   one chapter (text + still image)
    StageVisual.tsx           a stage's main image + floating extras
    ProgressIndicator.tsx     chapter number, title, progress, jump buttons
    AchievementList.tsx, SkillsDisplay.tsx
    CurrentFocus.tsx, ProjectShowcase.tsx, SkillsSummary.tsx
    AimAndGoal.tsx            final sunrise scene
    ContactSection.tsx        contact links, form, footer
    AccessibleResumeView.tsx  printable résumé
    SiteHeader.tsx
  lib/
    appleTransition.ts        the image hand-over curve (zoom, blur, fade, depth)
    timeline.ts               scroll position → chapter maths
  styles/global.css           visual system and layouts
public/images/journey/        journey SVG icons (Phosphor Icons, MIT)
scripts/prerender.mjs         injects prerendered HTML + SEO tags at build time
tests/                        content, timeline and transition tests
```
