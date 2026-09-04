# Valley Pure deals calendar

Interactive monthly deals calendar for valleypure.net/deals/. Hosted free on GitHub Pages, loaded into WordPress with two lines.

## Files

- `embed.js` — the whole calendar (styles + logic). Renders into `<div id="vp-deals">` and loads `deals.json` from the same folder.
- `deals.json` — the month's deals. **This is the only file you edit month to month.**
- `index.html` — a preview page so you can see it at `https://aaron-TGM.github.io/vp-deals/` before it goes on the site.
- `wordpress-snippet.html` — the two lines that go on the WordPress page.

## One-time setup (about 5 minutes)

1. Create a new **public** repo on github.com called `vp-deals` (any name works — just match it in the snippet).
2. Upload these four files to the repo (drag and drop on github.com is fine).
3. Repo **Settings → Pages → Build and deployment**: Source = *Deploy from a branch*, Branch = `main`, folder = `/ (root)`. Save.
4. Wait about a minute, then open `https://aaron-TGM.github.io/vp-deals/` — you should see the calendar.
5. In WordPress, edit the /deals/ page, add a **Custom HTML** block, paste the contents of `wordpress-snippet.html` with your username filled in. Publish.

Optional: if you'd rather it live on `deals.valleypure.net`, add that as a custom domain under Settings → Pages and create a CNAME record pointing to `aaron-TGM.github.io`. The snippet then uses `https://deals.valleypure.net/embed.js`.

## Updating deals each month

Edit `deals.json` on github.com (pencil icon → edit → commit). It's live within about a minute. Things you'll touch:

- `month` — `"2026-10"` for October. Day-of-week math and the grid are computed from this.
- `title` / `lede` — headline and intro sentence.
- `week` — the seven recurring weekday deal lists. The first deal in each list is that day's headline on the calendar tile (`"top": true` gives it the highlighted row in the day view).
- `sales` — limited-time windows like the Labor Day Sale. Leave the array empty (`[]`) for a month with none. A deal with `"only": 7` shows on that date only.
- `everyday` — the always-on module (currently PUSHA Pod BOGO). `{price}` and `{store}` fill in per store.
- `featureDays` — dates where the everyday deal takes the headline slot on the tile.
- `stores` — store list and per-store PUSHA price.
- `finePrint` / `modalFinePrint` — legal lines.

## Links

Right now every "Shop" link is store-prefixed: `https://valleypure.net/menu/{store}/brands/{brand-slug}`. That's controlled by the `links` block in `deals.json`:

```json
"links": {
  "base": "https://valleypure.net",
  "storePrefix": true,
  "brandPath": "/brands/{slug}",
  "offersPath": "/offers",
  "overrides": { "Cowgirl": "/products/cowgirl-3-5g-flower" }
}
```

- Brand slugs are generated from the name (`Alien Labs` → `alien-labs`, `Not Your Father's` → `not-your-fathers`). Check a couple against the live menu; if one differs, put the exact path in `overrides`.
- When direct brand/product links go live, set `"storePrefix": false` and adjust `brandPath`.

## Embedding options

- Force a store on a page: `<div id="vp-deals" data-store="woodlake"></div>` (handy on each location page).
- Deep link a store: `valleypure.net/deals/?store=tulare`.
- Point at a different data file: `<div id="vp-deals" data-src="https://.../october.json"></div>`.

The visitor's store choice is remembered in their browser.
