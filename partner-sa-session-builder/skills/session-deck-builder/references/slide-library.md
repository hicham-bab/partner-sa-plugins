# Slide library: blocks mapped to template layouts

## Template

**Presentation ID:** `1gonVZJu4-Xa6hhx0RmODaztwxLoh_D50y45XrDfIc6Y` (`branding deck template`)

**Access is a prerequisite.** The template is owned by `hicham.babahmed@fivetran.com`. Step 1 duplicates it, so
whoever runs this skill needs at least view access to that presentation and a connected Google account. If the
duplicate fails with a permission error, that's the cause: **stop and tell the user to request access**, and do
not fall back to building from a blank presentation, which silently produces an off-brand deck.

Teams can either have the template shared with them, or replace the ID above with their own copy. If they use
their own copy, the layout names must still match the table below; re-run `list_layouts` and diff before
trusting the mapping.

Build process:

1. `duplicate` the template into `PARTNER, SESSION TYPE, YYYY-MM-DD`
2. `list_layouts` on the **new copy** and resolve layouts by name against the table below, never reuse the IDs
   as hardcoded values, since a template edit can move them
3. `delete_slide` on the template's example slides
4. `add_slide` against the resolved layout IDs, then `add_text` / `update_text` into placeholders
5. `set_speaker_notes` on every slide

Never use markdown-to-slides generation, never build from a blank presentation, and never use Google's
predefined layouts; all three bypass the brand template.

**Every slide must come from one of the eleven template layouts below.** If a block seems to need something the
template doesn't have, don't improvise a layout: either compose it on `Blank` / `Simple` using the template's own
placeholders for text, or tell the user the template lacks it. Silently reaching for a generic Google layout is
how a deck stops being on-brand.

**The word budgets below are a planning aid for the outline. `layout-and-fit.md` holds the budgets that
actually govern the build**, per placeholder and in characters, plus the Stage 4.5 fit check. Read it before
writing any slide text. Where the two disagree, `layout-and-fit.md` wins.

Both scale by language: roughly ×0.85 for French, Spanish, and Italian, **×0.7 for German**, ×0.5 for
Japanese. German headings and Japanese fonts are where layouts break, so check a rendered slide before
building the rest of the deck.

## Layouts available

**These eleven are the only layouts you may use.** Verified against the template; always re-resolve at run
time.

| Layout name | ID (verify at run time) | Placeholders |
|---|---|---|
| Title slide | `g3a5fdd809fb_1_151` | TITLE, SUBTITLE |
| Content slide | `g3a5fdd809fb_1_158` | TITLE, SUBTITLE ×2, BODY |
| Text heavy slide | `g3a60393d61f_2_12` | TITLE, SUBTITLE ×3, BODY ×2 |
| Text heavy slide reversed | `g3a60393d61f_2_40` | TITLE, SUBTITLE ×3, BODY ×2 |
| Simple | `g3dc02915dd3_0_19` | TITLE, BODY |
| Simple - Dark | `g3dc02915dd3_0_862` | TITLE, BODY |
| Photo slide | `g3a60393d61f_5_31` | TITLE, SUBTITLE ×2, BODY |
| Photo slide *(second layout, same name)* | `g3a60393d61f_5_70` | TITLE, SUBTITLE ×2, BODY |
| Simple branded | `g3e549598480_0_7` | TITLE |
| Blank | `g3dc02915dd3_0_1064` | none |
| Blank - Dark | `g3e549598480_0_5` | none |

### Two rules that keep the deck purely on-template

**1. Never use Google's predefined layouts.** `list_layouts` also returns a `predefinedLayouts` list: `BLANK`,
`TITLE_AND_BODY`, `SECTION_HEADER`, `BIG_NUMBER` and so on. Those are Google's generic layouts; they are **not**
attached to the brand master, and a slide built on one will look off-brand. Only ever pass an `objectId` from
the table above.

**2. "Photo slide" is ambiguous: there are two layouts with that exact name.** Matching purely by name will
pick one arbitrarily. Resolve by name *and* check the returned `objectId` against this table; if the deck needs
both variants, address them by ID after confirming the IDs still exist in the duplicated copy. If an expected
layout name resolves to nothing, **stop and tell the user** rather than falling back to a predefined layout.

There is **no table layout in this template.** See below.

## Block → layout mapping

| Block | Act | Layout | Word budget |
|---|---|---|---|
| Title | opening | Title slide | title ≤ 10, subtitle ≤ 15 |
| Agenda with timings | opening | Content slide | ≤ 60 |
| Section break | any | Simple - Dark | ≤ 8 |
| The world / what hurts today | 1 | Simple | ≤ 40 |
| Audience context | 1 | Content slide | ≤ 50 |
| The data journey (running example intro) | 2 | Photo slide | ≤ 45 |
| Whole-picture architecture | 2 or 5 | Blank or Photo slide | ≤ 30 labels |
| Concept explainer | 3–4 | Content slide | ≤ 55 |
| Deep technical explanation | 3–4 | Text heavy slide | ≤ 90 |
| Comparison / before-after | 3–4 | Text heavy slide reversed | ≤ 80 |
| Live-demo cue | 3–4 | Simple | ≤ 25 |
| Hands-on lab instructions | 3–4 | Text heavy slide | ≤ 100 |
| Exercise + solution | 3–4 | Text heavy slide reversed | ≤ 90 |
| Common pitfalls (platform-specific) | 4 | Content slide | ≤ 60 |
| Checkpoint / quiz | any | Simple | ≤ 35 |
| BYOK provider matrix (Wizard CLI) | 3 | Simple + `add_table` | ≤ 70 |
| skip / clone / build (dbt State) | 3 | Simple + `add_table` | ≤ 70 |
| `state:modified` vs dbt State | 3 | Simple + `add_table` | ≤ 70 |
| Security and data handling Q&A backup | any | Text heavy slide | ≤ 90 |
| What's moving and when (lifecycle / EOL) | 5 or appendix | Simple + `add_table` | ≤ 70 |
| Migration as an engagement | 5 | Content slide | ≤ 50 |
| Pricing tiers (optional, see `pricing.md`) | 5 or appendix | Simple + `add_table` | ≤ 70 |
| Cost drivers: seats vs consumption | 5 or appendix | Content slide | ≤ 50 |
| Resources available in your language | 5 | Content slide | ≤ 45 |
| Platform divergence: incremental strategies | 3 or 4 | Simple + `add_table` | ≤ 70 |
| Platform divergence: constraint enforcement | 4 | Simple + `add_table` | ≤ 70 |
| Contracts still need tests (multi-platform) | 4 | Content slide | ≤ 50 |
| dbt Mesh / governance | 5 | Text heavy slide | ≤ 85 |
| Cross-platform Mesh | 5 | Blank or Photo slide | ≤ 30 labels |
| Certification ladder | 5 | Content slide | ≤ 55 |
| Partner portal / next steps for upskilling | 5 | Content slide | ≤ 50 |
| Recap | 5 | Content slide | ≤ 50 |
| Resources | 5 | Content slide | ≤ 50 |
| Next steps | 5 | Content slide | ≤ 45 |
| Q&A / close | 5 | Simple branded | ≤ 6 |

These per-slide totals are tuned to the template's placeholder sizes. **If content exceeds the budget, split
the slide, never shrink text and never truncate mid-thought.** For which placeholder gets how much, the
overflow remedies in order, and the fit-check arithmetic, see `layout-and-fit.md`.

## The anchor slide

The **whole-picture architecture** block is the anchor of every deck. It appears in act 2, drawn in the
partner's platform vocabulary, and every later slide references back to it:

```
sources → Fivetran ingestion → raw/landing → dbt transform, test, document
        → marts + semantic layer → BI / apps / AI consumption
        ↳ governance, lineage, orchestration, CI/CD spanning the middle
```

Its job is to show the seams that *don't* exist. Partners plan around integration work between ingestion,
transformation, and governance; the point is that most of that seam is already closed.

For hackathons, repeat this slide at each checkpoint; it's the map participants navigate all day.

## Tables: no template layout exists

Several blocks above are tables. The template has **no table layout**, so build them as:

1. `add_slide` on **Simple** (TITLE + BODY), or **Blank** if the table needs the full canvas
2. Put the heading in the TITLE placeholder so it inherits brand typography
3. `add_table` for the grid, then `style_text` on the header row

Because the table itself isn't template-derived, it won't inherit brand styling automatically. Match it to the
deck manually: pull the accent colour and font from the master rather than accepting Google's defaults, keep the
header row visually distinct, and keep tables to **4 columns and 6 rows maximum** with **≤ 40 characters per
cell**; anything larger stops being readable at the back of a room and should be split or reduced to the two or
three rows that carry the argument.

If a table would need more than that, prefer **Text heavy slide reversed** with the comparison written as prose
pairs. A dense grid nobody can read is worse than three sentences that land.

## Diagrams and images: reuse before you draw

**Hand-drawing an architecture diagram out of shapes is the last resort, not the first move.** An existing
internal diagram is already on-brand, already reviewed, and already familiar to the team who will present it.

This section covers images and diagrams. For choosing whole slides to reuse, and the scoring that decides it,
see `slide-selection.md`; the corpus you build there is the same corpus you search here.
A grid of `add_shape` rectangles is none of those things, and it is the single clearest tell that a deck was
generated rather than built.

Work down this list and stop at the first step that succeeds.

### 1. Find an existing internal diagram

Search before drawing, every time, for the architecture block and any conceptual diagram:

| Source | How |
|---|---|
| Existing decks | Google Slides `search` with the topic plus a platform name, for example "architecture Fivetran dbt Databricks". Full-text, AND logic, so keep it to three or four keywords. |
| Recent decks first | Add `modifiedAfter` for the last 12 months, then widen if nothing lands. Stale architecture diagrams show retired product names. |
| Internal content | The internal search connector, for enablement decks and one-pagers on the same subject. |
| Drive | Google Drive `search_files` for exported diagram images. |

When a candidate turns up, `list_slides` on it, `get_slide` on the likely slide, and check the diagram is
current: no retired product names, no "dbt Cloud" in a Fusion-era diagram, and the platform vocabulary
matches the partner's. A wrong-but-pretty diagram is worse than none.

### 2. Embed it, if the image is reachable

`add_image` needs a **publicly accessible URL**, and an internal Drive file is not one. So:

- If `get_slide` returns the image element's `contentUrl`, pass that straight to `add_image`. These URLs are
  short-lived, so embed within the same build rather than saving one for later.
- dbt docs images are genuinely public, so a product screenshot from `docs.getdbt.com` embeds cleanly. Confirm
  the URL resolves before relying on it, and keep screenshots to the ones that carry an argument.
- Never make an internal file public to get a URL. That is not yours to decide.

### 3. If it can't be embedded, reserve the slide

Do **not** silently substitute bullets for the diagram, and do not improvise shapes to fill the gap. Instead:

1. Create the slide on the intended layout with its title and speaker notes in place.
2. Leave the image area empty.
3. Tell the user exactly what to paste and where: the source deck link, the slide number, and the target slide
   number in the new deck. One line per diagram.

A deck with two reserved slides and a precise paste list is a five-minute job to finish. A deck where the
architecture moment quietly became a bullet list is a rebuild.

### 4. Only then, draw it

If no internal diagram exists and the slide genuinely needs one, build it on **Blank** with `add_shape` and
`add_line`, and keep it disciplined:

- Five boxes maximum in the main flow, left to right, on one horizontal axis
- Uniform box size, uniform gaps, all boxes aligned on the same y position
- One label per box, 3 words maximum, from the active platform profile's vocabulary
- Arrows in one direction only; if the flow needs to double back, the diagram is too complex for a slide
- Master colours only, per `layout-and-fit.md`

Label boxes in the partner's platform vocabulary, from the active platform profile. Never label a box
with a term the partner's platform doesn't use.

Tell the user in the handover which diagrams were reused, which were reserved for pasting, and which you drew,
so they know where to look before presenting.
