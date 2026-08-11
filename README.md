# dbt partner SA plugins

Internal plugins for partner solutions architects. Maintained by Hicham Babahmed.

> **Internal only.** This repository must stay private. It contains product direction ahead of the public docs,
> internal certification programme data, and internal template IDs. Do not publish it, fork it to a public
> namespace, or share the contents outside dbt Labs.

## What's in here

| Plugin | What it does |
|---|---|
| `partner-sa-session-builder` | Builds branded Google Slides decks for partner enablement sessions, hackathons, and workshops. Adapts to the partner's data platforms, Fivetran sources, vertical, and fluency. Produces decks in English, French, Spanish, Italian, German, or Japanese. Includes a monthly currency check for naming, pricing, and end-of-life changes. |

---

## Install: Claude Code (terminal)

Add the marketplace once, then install:

```
/plugin marketplace add https://github.com/ORG/partner-sa-plugins.git
/plugin install partner-sa-session-builder
```

Because this repo is private, you need working git credentials. **HTTPS with `gh auth login` is the most
reliable route**; SSH also works if your keys are set up:

```
gh auth login
```

Rule of thumb: if `git clone` of this repo works in your terminal, the marketplace will work too.

### Team-wide auto-install

To give a whole team the plugin without each person running commands, commit this to the project's
`.claude/settings.json`:

```json
{
  "extraKnownMarketplaces": {
    "dbt-partner-sa-plugins": {
      "source": {
        "source": "github",
        "repo": "ORG/partner-sa-plugins"
      }
    }
  },
  "enabledPlugins": {
    "partner-sa-session-builder@dbt-partner-sa-plugins": true
  },
  "autoInstallEnabledPlugins": true
}
```

On their next session the marketplace registers and the plugin installs itself.

### Getting updates

```
/plugin marketplace update
```

Updates apply from your **next** session, not the running one. The plugin is rebuilt and pushed here on the
first of each month after its currency check, so refreshing monthly is enough.

---

## Install: Cowork / desktop app

Claude Code installs plugins from a directory; the desktop app installs from a `.plugin` zip. Grab
**`partner-sa-session-builder.plugin`** from the repo root (or from the release Hicham circulates) and open it;
the desktop app will offer to install it.

Desktop installs don't auto-update, so replace the file when a new version ships. Check the version in
`.claude-plugin/plugin.json` against your installed copy if you're unsure.

---

## Before your first deck: template access

Decks are built by **duplicating the branded Google Slides template** (`branding deck template`) and filling its
layouts. Nothing is generated from scratch, so you need:

1. **Access to the template**: it's owned by Hicham. Ask him to share it, or point the plugin at your own copy
   by editing the presentation ID in
   `skills/session-deck-builder/references/slide-library.md`.
2. **A connected Google account** with Slides and Drive access.

If the duplicate step fails with a permission error, that's why. The plugin is built to stop and tell you rather
than fall back to a blank presentation, because a blank deck bypasses the brand master and comes out off-brand.

Using your own copy is fine, but keep the layout names identical; the plugin maps every slide type to a layout
**by name**, and it verifies them at run time.

## Using it

Ask for a deck in plain language, or run the command:

```
/session-deck
```

It asks a short round of questions (session type, data platforms, audience, duration, vertical, Fivetran
sources, language), then researches, **stops at an outline for your approval**, and only then builds the deck.

To re-verify the facts it relies on:

```
/session-currency
```

---

## Reporting problems and contributing

Tell Hicham, or open an issue. Two things worth flagging quickly:

- **A stale or wrong fact in a deck.** These are grounded in docs at build time, but naming and availability
  move fast. If something's wrong, it likely needs the source registry updating.
- **Editorial calls you disagree with.** Some features are deliberately out of scope for session content. That's
  a decision, not an oversight. But if it's wrong, say so.

If you want to change the plugin itself, the reference files under
`partner-sa-session-builder/skills/session-deck-builder/references/` are where the substance lives. Bump the
version in both `.claude-plugin/plugin.json` and this marketplace's `marketplace.json`, then repackage the
`.plugin` file for desktop users.
