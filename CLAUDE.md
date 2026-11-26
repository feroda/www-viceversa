# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repository is

A generator workspace for simple, static, single-page commercial websites for local businesses. Each site is built from a "place details" input (business data with fields such as `place_id` and `category`), plus information found on the web. Licensed under AGPL-3.0.

There is no build system, package manager, linter, or test suite. Sites are plain HTML/CSS/JS meant to work offline. To check a site, open its `index.html` in a browser, or serve the folder (e.g. `python3 -m http.server -d shared/sites/<serial>`).

## Workflow

Sites are generated with the project skill `.claude/skills/crea-sito/SKILL.md` (invoke as `/crea-sito` with the place details). That file is the authoritative spec, so read it before generating or changing a site. The key constraints, which are easy to get wrong:

- **Never invent data.** Use only real, positive reviews found online, and omit the reviews section ("Recensioni" / "Dicono di noi") if there are none. Never make up the Partita IVA: look it up on ufficiocamerale.it or visura.pro/trova-azienda. Do not scrape google.com/search or Google Maps.
- **Content:** the full company name is never truncated. The footer holds ragione sociale, P.IVA, address, phone, email, and a Privacy Policy link. The top menu has a "Vieni a trovarci" entry. Use an "Apri su Google Maps" button (opens in a new tab, below the address and phone) and no embedded map. Leave out the ATECO code and turnover. On mobile the phone number is a `tel:` link.
- **Design:** responsive layout, a fixed top menu with a mobile toggle, and a theme palette taken from the logo (or from the business category when there is no logo), different for each site. Write SEO keywords in the language of the place's country.
- **Offline:** download fonts locally (free fonts only) and remove remote font links.

## Layout

```
_templates/              # at the repo root, NOT under shared/
  privacy.html           # privacy policy body to copy into each site as privacy_policy.html, restyled
  <uuid>/                # an unpacked example site (index.html + assets/)
  *-master.zip           # more example sites, zipped
shared/
  sites/<serial>/        # one generated site per folder; delete and recreate if it already exists
    index.html           # HTML in the root
    privacy_policy.html
    assets/{css,js,images}/
    .date                # creation date, YYYY-MM-DD
    .category            # `category` attribute from the place details
    .place_id            # the business place_id
    .website             # company homepage URL (only if one was found)
```

`_templates/privacy.html` is only the body (h1, sections, lists) with the template author's data. Wrap it in a full page using the site's own navbar, footer and CSS, and replace the Titolare del trattamento details (name, address, P.IVA, email) with the business's own.
