# Partner SA session builder

Generate branded Google Slides decks for partner enablement sessions, hackathons, and workshops, adapted
to the partner in the room and grounded in internal content plus official docs.

## What it does

Describe a session you're about to run. The plugin asks a short set of discovery questions, researches the
topic internal-content-first, shows you an outline to approve, then builds a deck in the dbt Labs branding
template with speaker notes on every slide.

## How to use it

Type `/session-deck`, with or without a brief:

```
/session-deck 90-min enablement for Acme, Databricks shop, their AE team, retail clients
```

Or just `/session-deck` and answer the questions. Anything you put in the brief is one less question asked.

You can also simply say what you need: "build me a deck for my Snowflake partner workshop next Tuesday",
and the skill triggers on its own.

## What you get

- A Google Slides deck in the branding template, with speaker notes and sources per slide
- For hackathons and workshops: a facilitator run-of-show with wall-clock timings, checkpoint gates, and
  fallbacks for a broken environment
- A handover that reports what was checked: slides whose text was rewritten to fit, diagrams reused versus
  reserved for you to paste, and for non-English decks, how much came from existing material versus translation

## Layout, fit, and diagrams

These decks go in front of the partner's customers, so two things are enforced rather than hoped for.

**Text fits the placeholder.** Budgets are per placeholder and counted in characters, scaled by language, and
the build ends with a fit check that reads back what actually landed in each element and rewrites the
overflows. Fonts are never shrunk and text is never truncated to fit; long content moves to the speaker notes,
which is what they are for. There are also rhythm rules: no two text-heavy slides adjacent, a visual or
section break at least every fourth slide, and section breaks at act boundaries.

**Diagrams get reused, not redrawn.** For the architecture anchor and any conceptual diagram, the skill
searches existing internal decks first, and embeds the image when it is reachable. When it isn't, it reserves
the slide and tells you exactly which source slide to paste, rather than quietly turning the diagram into a
bullet list. Hand-drawn shape diagrams are the last resort and are held to strict geometry.

## How it adapts

| Input | Effect |
|---|---|
| Data platform | Narrative spine, architecture diagram, vocabulary, adapter specifics, pitfalls |
| dbt vs Fivetran fluency | Which act the story opens on |
| Vertical + Fivetran source | The running example carried across every slide |
| Audience | Code density and whether labs or demo cues are used |
| Duration | Slide count and number of labs |

Supported platform profiles: Snowflake, Databricks, BigQuery, Microsoft Fabric (Warehouse and Lakehouse).
Any other platform gets a profile built at run time from the adapter and destination docs.

## Languages

Decks can be produced in **English, French, Spanish, Italian, German, or Japanese**, written in the target
language from the start rather than translated afterwards. Product names, code, config keys, and official exam
names stay in English, and dbt stays lowercase in every language, German included.

Word budgets scale per language (German runs ~30% longer and is where layouts break; Japanese is counted in
characters), and speaker notes can be a different language from the slides when a local co-presenter delivers.

**The language question is asked in the first round, always.** For a non-English deck the research changes too,
not just the writing: the skill looks for approved internal material already in that language, block by block,
uses localised docs where they exist and are current, and only translates the genuine gaps. It reports that
split so you know how much native review the deck actually needs, and reuses approved diagrams with translated
labels rather than redrawing them.

Exam language availability is tracked and verified rather than assumed: the Analytics Engineering exam is
localised in Japanese, the Architect exam is available in French. Older study guides claiming "English only" are
out of date.

## Multi-platform partners

The platform question is multi-select; plenty of partners run practices across several. One platform is
designated **primary** and carries the running example; the others appear as contrast, because telling the
story on two platforms at once doubles the deck and halves the clarity.

Only three things genuinely need per-platform treatment, and the plugin carries verified tables for each:
**incremental strategies** (BigQuery supports neither `append` nor `delete+insert`; `microbatch` works
everywhere, so it's the safest thing to teach a mixed room), **constraint enforcement** (effectively only
`not_null` is enforced anywhere, so model contracts still need dbt tests behind them), and the
**catalog/Iceberg** story. Everything else in dbt is portable, and saying so is part of the value.

## Standalone subjects

**dbt Wizard CLI** (Beta) and **dbt State** (Preview) each get treated as a session subject in their own right,
not a feature slide. Both run without a dbt platform account: Wizard CLI locally from any dbt CLI, Fusion, or
dbt Core project; dbt State via a standalone account at `app.state.dbt.com`. For partners whose clients aren't
on the platform yet, that's the wedge, and the plugin leads with it.

Wizard is also the low-code answer, and the AI story generally. Canvas, dbt Insights, and dbt Copilot are out
of scope.

## Staying current

Everything in this plugin that can go stale is listed in `skills/currency-check/references/source-registry.md`
with its source and the value recorded at last verification, ten areas covering naming, release phases,
feature availability, cross-platform Mesh support, certifications, pricing, end-of-life dates, the deck
template, and merger facts.

Run `/session-currency` (or ask for a currency check) to re-verify every entry against live sources, update the
reference files, bump the version, and repackage. A monthly scheduled task does this automatically and writes
`currency-report-YYYY-MM-DD.md` alongside the plugin.

The report leads with anything needing a decision. Facts get updated automatically; editorial decisions, like
Canvas, dbt Insights, and dbt Copilot being out of scope, are preserved and never overruled by a currency run.

## Lifecycle awareness

The plugin checks that nothing in a deck is being retired before finalising it, and tracks in-flight
migrations on both sides, HVR 5.7's end of life on 31 December 2026 (HVR 6 is current; HVR itself isn't going
anywhere), the Census-to-Activations migration, and state-aware orchestration to dbt State. Publicly
documented end-of-life dates are treated as presentable and useful; internal roadmap direction is not.

Migration content is framed as partner services revenue, because that's what it is.

## Pricing (optional)

Available when a partner is sizing a proposal or building a business case. dbt and Fivetran are still priced
separately (seats plus usage limits on one side, consumption on MAR on the other), and the plugin presents them
that way rather than inventing a bundle, since bundled pricing is expected over time but doesn't exist today.
Every pricing figure is re-fetched from the official pricing pages at build time, list price only, with a
"confirm with your account team" footnote. Third-party pricing aggregators are never used.

## Always included

**Both certifications and the partner portal.** Every partner-facing deck ends with the certification ladder
(dbt Fundamentals badge → dbt Analytics Engineering Certification → dbt Architect Certification), plus where
the vouchers, discounts, and content actually live at `partners.getdbt.com`. Internal programme data shows the
drop-off isn't in training completion; it's at exam registration, so the block prompts for an agreed exam-by
date rather than just listing exams.

**dbt Mesh where it fits.** Architect audiences and multi-platform partners get the governance and
cross-platform Mesh story, drawn as one DAG spanning platforms rather than two stacks with an arrow between
them. The plugin keeps data mesh (the organisational concept) and dbt Mesh (the dbt pattern) distinct, names
the Iceberg catalog prerequisites, and won't imply support for undocumented platform combinations.

## Two things it deliberately won't do

**It stops for outline approval.** Structure is cheap to fix in a table and expensive to fix in a built
deck.

**It won't state product behaviour it can't source.** Connector names, materializations, feature
availability, and customer references resolve from docs or internal content at run time, or they're left
out and flagged. A confidently wrong claim in front of a platform specialist costs more than a gap.

## Requirements

Google Slides connector (required; the plugin stops rather than producing an off-template `.pptx`), plus
whichever of these you have: internal search, dbt MCP, Notion, Google Drive, Salesforce, Slack.

Template: `branding deck template`, presentation ID
`1gonVZJu4-Xa6hhx0RmODaztwxLoh_D50y45XrDfIc6Y`. To point at a different template, edit the ID in
`skills/session-deck-builder/references/slide-library.md`.

## Customising

Everything the skill knows lives in `skills/session-deck-builder/references/`. Edit the platform profiles
to sharpen a narrative spine, `session-recipes.md` to change slide sequences, `intake.md` to change the
questions.

The narrative spines in the platform profiles are drafts, not approved positioning; replace them with
internal messaging as you validate it.
