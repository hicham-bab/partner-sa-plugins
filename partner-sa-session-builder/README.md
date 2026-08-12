# Partner SA session builder

**Two audiences, one branded template.** `/session-deck` builds technical session decks and demo flows for
solutions architects. `/partner-value` builds business-value decks for partner managers, driven by real Partner
BVA runs. They share the template, the layout discipline, the brand rules, the six languages, and the
verification gate; they differ in audience, argument, and depth.

If you are a partner manager, the section at the end is the only one you need.


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
- For technical sessions: a `demo-flow.md` with chapter timings, exact click paths, the value line to say,
  the failure mode to watch, and a named fallback per chapter
- For hackathons and workshops: a facilitator run-of-show with wall-clock timings, checkpoint gates, and
  fallbacks for a broken environment
- A handover that reports what was checked: slides whose text was rewritten to fit, diagrams reused versus
  reserved for you to paste, and for non-English decks, how much came from existing material versus translation

## Demo-led sessions are the default

Most partner sessions are context slides then a live demo, so **Technical session** is the first session type
and it changes the deliverables rather than just the slide count. Context slides compress to 6 to 12, the demo
carries the middle of the arc, and each chapter is bookended: a setup slide saying what you are about to see,
the demo with no slide on screen, then a payoff slide carrying the value line in one sentence.

Two tracks, picked from the fluency answer or asked directly:

**Foundations**, for rooms new to either product: create a Fivetran connector against their real source
category, land it through Managed Data Lake Service into their own storage in an open table format, then dbt
basics scaled to the audience (a model, `ref()`, a `.yml` with tests, `dbt build`, lineage and docs).

**Platform and AI**, for partners already on both: dbt Wizard authoring a model with its tests and docs, a
semantic layer metric queried from two places, the change opened as a PR with CI, orchestration and jobs, dbt
State skipping and cloning what didn't really change, Cost Insights, and the dbt MCP server exposing governed
metadata to an agent. Each chapter hands to the next, so authoring leads to governance leads to orchestration
leads to cost.

Release phases get stated out loud, since dbt State is in Preview and Wizard has Beta and Preview surfaces.
Chapters 5 to 7 are each strong enough to carry a session on their own, so a 90-minute slot runs the first four
and mentions the rest, rather than demoing seven things badly.

The demo environment is settled before building: which repo to demo from (yours, an existing hands-on-lab repo,
or a fresh minimal project, never an invented URL), what is actually live, and which platform the demo runs on.
Plus the discipline that decides whether a demo lands: pre-seed anything slow, a named fallback per chapter,
live-type almost nothing, scratch schemas only, and the platform-specific timing traps.

## It picks the best existing slides first

The main job is curation, not generation. For every block in the outline, the skill assembles a corpus of
candidate decks (your own registry first, then Slides and Drive search, plus anything you attach), scores the
candidates per block on currency, argument fit, platform and audience match, language, visual value, and
provenance, and then reuses the winner. Writing a slide from scratch is what happens when nothing good exists.

Stale facts are a gate rather than a penalty: a slide naming a retired product, a superseded price, or a passed
end-of-life date is disqualified as-is, though its diagram or structure can still be reused once the fact is
re-resolved from the docs.

Reuse means rebuilding the slide on the current branded template, keeping its wording and its diagram. Source
decks are often off-template or carry older branding, so the rebuild is an upgrade. There is no cross-deck slide
copy in the Slides API, which is the mechanical reason it works this way.

The outline you approve shows provenance per slide (`reuse`, `diagram`, `reserve`, or `new`) with the source
deck and slide number, so you approve what gets reused as well as what gets said, and the handover reports the
tally. Every reused slide carries its source in the speaker notes.

Assembled decks read as a patchwork unless the narrative layer is rewritten, so reused slides get a new title
and a fresh bridge line, and are normalised to one running example, one platform vocabulary, and one house
style. If unifying a slide is more work than writing it, it gets written.

**The corpus registry** holds internal presentation IDs, so it is never committed to this public repo. It takes
whichever form suits your install: a gitignored `references/deck-corpus.local.md` for Claude Code, or, since a
zip install has no writable plugin directory, **a Google Doc, Sheet, or Notion page you point the skill at** on
Claude Desktop and Cowork. Pasting the table into the conversation works too. One row per deck: ID, date,
language, and what it's best for. Without a registry the skill falls back to search, says so, and offers to
build you one from what it found.

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
| Vertical + Fivetran source | The running example, the metrics on the slides, the source systems in the demo, the pain the opening names, and which governance angle act 5 leads with |
| Audience | Code density and whether labs or demo cues are used |
| Duration | Slide count and number of labs |

Supported platform profiles: Snowflake, Databricks, BigQuery, Microsoft Fabric (Warehouse and Lakehouse).
Any other platform gets a profile built at run time from the adapter and destination docs.

## Verticalization

Six industries carry a full profile: retail and e-commerce, financial services and insurance, healthcare and
life sciences, manufacturing and supply chain, public sector, and media, telco, and subscription. Each one
supplies the running example, the metrics that matter, the typical source systems, the pain narrative for the
opening slide, the governance angle act 5 should lead with, and a demo hook for the Fivetran chapter.

Anything else is built at run time from the same shape, so an industry that isn't in the list is supported just
as well as one that is. The question shows four options because the tool caps at four, and the four shown are
picked for the partner rather than fixed; support does not live in the option list.

Everything in a vertical profile is a starting point stated for you to correct, not an assertion. Metrics and
source systems vary by company, exact Fivetran connector names are resolved from the docs at build time, and
named customers still come from internal sources only.

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

---

## For partner managers: `/partner-value`

Sales enablement for a partner, in business terms. No adapters, no materializations, no live demo.

It asks four questions: what the session is for, how big the partner's delivery team is, what their clients
usually look like, and the language. Then it runs the
[Partner BVA](https://hicham-bab.github.io/partner-bva/) for three scenarios, so the partner sees a spread
rather than one number they will distrust, and shows you those scenarios and their assumptions before building
anything.

**The numbers come from the model, never from the assistant.** A bundled script fetches the published BVA page
and calls the app's own calculation, so the figures cannot drift from what a partner sees in the browser. If no
shell is available, which is common in the desktop app, it prints the inputs for you to enter and asks you to
paste the result back, rather than guessing. Ranges stay ranges, a midpoint is never presented as the number,
and every deck carries the model's own caveat that this is not a quote and not a forecast.

**Every assumption is named.** The model's inputs are starting points, and four partnership levers, the reinvest
share, the Wizard share, and the software margin all default to zero or to the partner's own estimate because no
sourced benchmark exists for them. The deck lists what was supplied, so the partner can argue with the
assumption instead of distrusting the number.

The arc runs: why their clients are buying now, what the partner earns by workstream, what their client gets
back, **whether they can actually deliver it**, how to sell it, and what happens next. That fourth part is the
one that earns the rest: the model reports how many of these engagements the partner can support a year and
which role runs out first, so a partner whose feasible revenue is a quarter of their nominal revenue has a
hiring and certification conversation rather than a demand problem. If the model says over capacity, the slide
says over capacity.

You also get a share link per scenario, so the partner can reopen their own numbers, change a day rate, and
watch it move.
