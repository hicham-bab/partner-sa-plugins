# Brand and voice rules

Apply to all slide text, speaker notes, and the run-of-show. These are prose rules; they do **not** apply
to code, repo names, file names, config keys, API or field names, CLI commands, or package names. Matching
the real identifier is always correct in those places; never "correct" `dbt-cloud` or
`dbt_cloud.config_api` to match brand style.

## Naming

- **dbt** is always lowercase, even at the start of a sentence. Never DBT or Dbt.
- **dbt Labs** is the company (capital L, lowercase d).
- The managed product is the **dbt platform** (lowercase p) in external-facing copy, not "dbt Cloud."
  This is an active naming transition. If a source or an internal deck says "dbt Cloud" in
  platform-related content, flag it to the user as a potential naming error rather than copying it
  through, and suggest confirming with PMM.
- Branded proper nouns are capitalized: **dbt Core, Fusion, dbt Mesh, dbt Copilot, dbt Canvas, dbt Studio,
  dbt Catalog, dbt Summit**.
- Job titles and team names are lowercase: data engineer, analytics engineer, data team, chief data officer.
- "Coalesce" is retired as of 31 January 2026; flag any use of it found in source material. Current event
  naming is **dbt Summit**. Older internal material still says Coalesce; don't copy it through.

## Product naming currency

Product names and emphasis are moving. Verify against the docs at run time and prefer current naming.

| Say this | Not this | Status |
|---|---|---|
| **dbt State** | state-aware orchestration | Confirmed in docs, dbt State is in Preview, and state-aware orchestration is no longer available to new customers. A migration guide exists at `/docs/deploy/dbt-state-migration`, and `/faqs/Runs/what-happened-to-sao` explains the change. |
| **dbt Wizard** | n/a | Confirmed in docs at `/docs/platform/wizard-overview`. An AI agent for governed data development, in the dbt platform and the terminal. Several surfaces are Beta or Preview, state the release phase. |
| **dbt platform** | dbt Cloud | Active transition. Flag any "dbt Cloud" in platform or Fusion content and suggest confirming with PMM. |

## Out of scope: do not build content on these

Per the plugin owner's standing instruction, **do not create session content on dbt Canvas, dbt Insights, or
dbt Copilot.** Use dbt Wizard for the AI story and Cost Insights for the cost story.

| Excluded | Docs status | Use instead |
|---|---|---|
| dbt Canvas | Still fully documented at `/docs/platform/canvas` | n/a |
| dbt Insights | Beta, `/docs/explore/dbt-insights` | **Cost Insights** for anything cost-related |
| dbt Copilot, all surfaces | `/docs/dbt-ai/*`, including the Analyst agent at `/docs/dbt-ai/analyst-agent` | **dbt Wizard** |

No slides, no labs, no demos, no speaker-notes asides for any of the above.

**The AI story is dbt Wizard.** When a session needs an AI angle, and partners ask for one, build it on
Wizard (`/docs/platform/wizard-overview`), not Copilot. State the release phase, since several Wizard
surfaces are Beta or Preview.

These features are all still in the public docs, so this is internal direction ahead of the docs; unlike the
publicly documented end-of-life dates in `lifecycle-and-migrations.md`, which are safe and helpful to present.
Two consequences:

1. If a session genuinely seems to need one of them, don't silently include it. Raise it with the user and
   note that status should be confirmed with PMM first.
2. Do not tell a partner these features are being sunsetted. That's a roadmap statement, it carries weight
   coming from dbt Labs, and it isn't yours to make without PMM confirmation. Simply build the session
   around something else.

**In scope, and easy to exclude by mistake: Cost Insights.** `/docs/explore/cost-insights` is a separate
feature (warehouse compute cost tracking and realised savings), despite sharing a word with dbt Insights.
It is explicitly approved and is strong partner material for a FinOps or cost-optimisation angle. Do not drop
it by name association. (Its docs still reference state-aware orchestration; apply the naming table above and
say dbt State.)

## Quick check before building any AI or analysis block

| If the session needs… | Build on | Not |
|---|---|---|
| An AI / agent story | dbt Wizard | dbt Copilot |
| Cost visibility, warehouse spend, optimisation ROI | Cost Insights | dbt Insights |
| Low-code / lower-barrier development | dbt Wizard | dbt Canvas |

dbt Wizard covers the low-code angle: the developer describes intent, Wizard produces and validates dbt
changes. Frame it as lowering the barrier to authoring dbt without lowering the engineering bar; the output
is still version-controlled code that goes through review. See `wizard-and-state.md`.

**General rule for anything in Preview or Beta:** name the release phase on the slide. Presenting a preview
capability as generally available creates a commitment nobody agreed to, and partners plan client work
against what they hear in these sessions.

## Style

- Headlines and slide titles use **sentence case**, not title case. "How data gets done", not "How Data
  Gets Done."
- No emoji on slides.
- Prefer concrete nouns over abstractions: "one day of Shopify orders" beats "a representative dataset."
- Active voice. "Fivetran lands the data" not "the data is landed by Fivetran."
- No superlatives that can't be sourced. Drop "seamless," "effortless," "best-in-class" unless quoting
  approved messaging verbatim.

## Slide text discipline

- Slide text carries the point; speaker notes carry the explanation. Never duplicate the talk track on the
  slide.
- One idea per slide. If a slide needs "and," consider splitting it.
- Respect the word budgets in `slide-library.md`. Split rather than shrink.
- Bullets are fragments, not sentences; no terminal periods on bullet fragments.

## Platform vocabulary

Use the partner's own platform terms, from the active platform profile. Never label a diagram box or use a
term the partner's platform doesn't have, calling a BigQuery dataset a "schema," or referring to
"warehouses" to a Databricks audience, signals that the session was built for someone else.
