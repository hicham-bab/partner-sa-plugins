# Slide library — blocks mapped to template layouts

## Template

**Presentation ID:** `1gonVZJu4-Xa6hhx0RmODaztwxLoh_D50y45XrDfIc6Y` (`branding deck template`)

Build process:

1. `duplicate` the template into `<Partner> — <Session type> — <YYYY-MM-DD>`
2. `list_layouts` on the **new copy** and match layouts **by name** — never reuse the IDs below as
   hardcoded values, since a template edit can move them
3. `delete_slide` on the template's example slides
4. `add_slide` against the matched layout IDs, then `add_text` / `update_text` into placeholders
5. `set_speaker_notes` on every slide

Never use markdown-to-slides generation and never build from a blank presentation — both bypass the brand
template.

**Word budgets below are calibrated for English.** For other languages scale them per `languages.md` —
roughly ×0.85 for French, Spanish, and Italian, **×0.7 for German**, and count characters rather than words
for Japanese. Then check a rendered slide visually before building the rest of the deck; German headings and
Japanese fonts are where layouts break.

## Layouts available

IDs recorded as of template inspection; always re-resolve by name at run time.

| Layout name | ID (verify at run time) | Placeholders |
|---|---|---|
| Title slide | `g3a5fdd809fb_1_151` | TITLE, SUBTITLE |
| Content slide | `g3a5fdd809fb_1_158` | TITLE, SUBTITLE ×2, BODY |
| Text heavy slide | `g3a60393d61f_2_12` | TITLE, SUBTITLE ×3, BODY ×2 |
| Text heavy slide reversed | `g3a60393d61f_2_40` | TITLE, SUBTITLE ×3, BODY ×2 |
| Simple | `g3dc02915dd3_0_19` | TITLE, BODY |
| Simple – Dark | `g3dc02915dd3_0_862` | TITLE, BODY |
| Photo slide | `g3a60393d61f_5_31` | TITLE, SUBTITLE ×2, BODY |
| Photo slide (alt) | `g3a60393d61f_5_70` | TITLE, SUBTITLE ×2, BODY |
| Simple branded | `g3e549598480_0_7` | TITLE |
| Blank | `g3dc02915dd3_0_1064` | — |
| Blank – Dark | `g3e549598480_0_5` | — |

## Block → layout mapping

| Block | Act | Layout | Word budget |
|---|---|---|---|
| Title | — | Title slide | title ≤ 10, subtitle ≤ 15 |
| Agenda with timings | — | Content slide | ≤ 60 |
| Section break | any | Simple – Dark | ≤ 8 |
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
| BYOK provider matrix (Wizard CLI) | 3 | Table slide | ≤ 70 |
| skip / clone / build (dbt State) | 3 | Table slide | ≤ 70 |
| `state:modified` vs dbt State | 3 | Table slide | ≤ 70 |
| Security and data handling Q&A backup | any | Text heavy slide | ≤ 90 |
| What's moving and when (lifecycle / EOL) | 5 or appendix | Table slide | ≤ 70 |
| Migration as an engagement | 5 | Content slide | ≤ 50 |
| Pricing tiers (optional — see `pricing.md`) | 5 or appendix | Table slide | ≤ 70 |
| Cost drivers: seats vs consumption | 5 or appendix | Content slide | ≤ 50 |
| Resources available in your language | 5 | Content slide | ≤ 45 |
| Platform divergence: incremental strategies | 3 or 4 | Table slide | ≤ 70 |
| Platform divergence: constraint enforcement | 4 | Table slide | ≤ 70 |
| Contracts still need tests (multi-platform) | 4 | Content slide | ≤ 50 |
| dbt Mesh / governance | 5 | Text heavy slide | ≤ 85 |

| Cross-platform Mesh | 5 | Blank or Photo slide | ≤ 30 labels |
| Certification ladder | 5 | Content slide | ≤ 55 |
| Partner portal / next steps for upskilling | 5 | Content slide | ≤ 50 |
| Recap | 5 | Content slide | ≤ 50 |
| Resources | 5 | Content slide | ≤ 50 |
| Next steps | 5 | Content slide | ≤ 45 |
| Q&A / close | 5 | Simple branded | ≤ 6 |

Word budgets are tuned to the template's placeholder sizes. **If content exceeds the budget, split the
slide — never shrink text and never truncate mid-thought.** Flag overflow rather than silently cutting.

## The anchor slide

The **whole-picture architecture** block is the anchor of every deck. It appears in act 2, drawn in the
partner's platform vocabulary, and every later slide references back to it:

```
sources → Fivetran ingestion → raw/landing → dbt transform, test, document
        → marts + semantic layer → BI / apps / AI consumption
        ↳ governance, lineage, orchestration, CI/CD spanning the middle
```

Its job is to show the seams that *don't* exist. Partners plan around integration work between ingestion,
transformation, and governance — the point is that most of that seam is already closed.

For hackathons, repeat this slide at each checkpoint; it's the map participants navigate all day.

## Diagram construction

Build architecture diagrams with `add_shape` and `add_line` on a Blank layout, or `add_image` if an
approved diagram exists internally. Prefer an existing internal diagram when one is found — it's already
on-brand and already familiar to the team.

Label boxes in the partner's platform vocabulary, from the active platform profile. Never label a box
with a term the partner's platform doesn't use.
