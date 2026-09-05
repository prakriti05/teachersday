# Teacher's Day — digital greeting card

Static site, no build step. One codebase, one experience per `?subject=` value.

## Deploy on GitHub Pages

1. Create a new GitHub repo, e.g. `teachers-day`.
2. Upload `index.html`, `styles.css`, `script.js` (and `assets/` if you add images later) to the root of the repo.
3. Go to **Settings → Pages**, set source to the `main` branch, root folder.
4. Your site is live at:
   `https://<your-username>.github.io/teachers-day/`

## Sending links to teachers

All six subjects are written. Send each teacher their own link:

```
https://<your-username>.github.io/teachers-day/?subject=computer
https://<your-username>.github.io/teachers-day/?subject=maths
https://<your-username>.github.io/teachers-day/?subject=science
https://<your-username>.github.io/teachers-day/?subject=hindi
https://<your-username>.github.io/teachers-day/?subject=english
https://<your-username>.github.io/teachers-day/?subject=sst
```

Any unrecognised `?subject=` value (or none) falls back to Computer Science.

## How the six subjects differ

All six share the same three-phase state machine (closed card → subject's
"world" → warm paper greeting) and the same paper-world styling, so they
read as one project. What changes per subject, all in `script.js`'s
`SUBJECTS` object:

- a small hand-drawn icon (compass, flask, pen nib, book, compass rose)
- a color theme (set via CSS variables in `styles.css`, keyed off
  `data-subject` on the `<main>` element)
- 4 short "loading" lines and 5 floating symbols in the opening world
- the eyebrow, title, message, and closing text

The Hindi title and message are the exact text from the original brief —
don't run them through a rewrite/paraphrase pass, since small wording
changes are easy to get subtly wrong in a language you're not editing
directly yourself.

## Adding a 7th subject later

Copy any existing entry in `SUBJECTS` as a template, swap in new copy, and
(optionally) add a new icon to the `ICONS` object and a new
`.stage[data-subject="..."]` color block in `styles.css`. If you skip the
color block it'll just use the default (Computer Science) theme.
