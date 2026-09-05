# Teacher's Day — digital greeting card

Static site, no build step. One codebase, one experience per `?subject=` value.

## Deploy on GitHub Pages

1. Create a new GitHub repo, e.g. `teachers-day`.
2. Upload `index.html`, `styles.css`, `script.js` (and `assets/` if you add images later) to the root of the repo.
3. Go to **Settings → Pages**, set source to the `main` branch, root folder.
4. Your site is live at:
   `https://<your-username>.github.io/teachers-day/`

## Sending links to teachers

Right now only the Computer Science experience is written. Send:

```
https://<your-username>.github.io/teachers-day/?subject=computer
```

Any other `?subject=` value (or none) currently falls back to the Computer
Science experience, so it's safe to test the link as-is before the other
five subjects are filled in.

## Adding the next subject (e.g. Maths)

Open `script.js` and replace the `maths: null` stub in `SUBJECTS` with an
object shaped exactly like `computer`:

```js
maths: {
  eyebrow: "for the teacher who taught maths",
  terminal: [ ... ],   // reused as the "opening world" lines — for Maths
                        // this section of script.js/CSS can be swapped for
                        // a blackboard visual instead of a terminal, see notes below
  floaters: [ ... ],
  title: "Happy Teacher's Day",
  message: "X may be unknown,\nbut one thing is certain—\nyour guidance has always made a difference.",
  closing: "With gratitude,\nfrom one of your students. ❤",
},
```

Then link to `?subject=maths`.

**Note:** the current build reuses the literal "terminal window" visual for
every subject, since only Computer Science was in scope for this pass. The
Maths/Science/Hindi/English/SST briefs each call for a *different* opening
world (blackboard, lab bench, notebook, etc.) — that means phase 1's markup
in `index.html`/`styles.css` will need a per-subject variant, not just new
text. Worth designing one subject at a time rather than templating all five
opening-world visuals off the terminal look.
