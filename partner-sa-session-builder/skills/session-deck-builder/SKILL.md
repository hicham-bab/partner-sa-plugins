---
name: session-deck-builder
description: >
  Generate a branded Google Slides deck for a partner enablement session, hackathon, or workshop,
  adapted to the partner's data platforms, Fivetran sources, vertical, and relative dbt/Fivetran fluency.
  Supports partners running several data platforms, with a primary platform carrying the story and the rest
  appearing as contrast. Can produce decks in English, French, Spanish, Italian, German, or Japanese.
  Use when the user wants to build, prepare, or generate a session deck, enablement deck, workshop deck,
  hackathon deck, partner training, or partner presentation; when they describe an upcoming partner
  session and want materials for it; or when they say things like "I'm running a session for this
  partner next week", "build me a deck for", "prep my enablement session", or "/session-deck".
  Covers Snowflake, Databricks, BigQuery, Microsoft Fabric, and other data platforms.
---

# Session deck builder

Turn a short session brief into a branded Google Slides deck with speaker notes, grounded in internal
content and official docs, telling one continuous story adapted to the partner in the room.

## Hard rules

1. **Never invent product behaviour.** Every substantive claim about dbt, Fivetran, or a data platform
   resolves to internal content or official docs at run time. No claim from memory. If a fact can't be
   resolved, leave it out and say so.
2. **Never invent connector names, customer references, logos, or case studies.** Resolve connector names
   from Fivetran docs. Customer stories come from internal sources only.
3. **Confirm the data platforms, never infer them.** Ask even when the brief seems to state it. Partners often
   run several, the question is multi-select, and if more than one is chosen, establish which is primary.
4. **Stop at the outline gate.** Do not create or populate a deck before the user approves the outline.
5. **Duplicate the branded template.** Never build a deck from scratch and never use markdown-to-slides
   generation, both bypass the brand template.
6. **Always start from the basics.** Every deck opens at first principles regardless of audience
   seniority. Pace changes; the arc does not.
7. **Always ask the deck language, in the first round of questions.** AskUserQuestion takes at most four
   questions per call and four options per question, so a five-question round silently loses one. Follow the
   call membership in `references/intake.md` exactly; never regroup it on the fly.
8. **Reuse diagrams before drawing them, and never let an architecture slide degrade into bullets.** Search
   internal decks first, per `references/slide-library.md`. If a diagram can't be embedded, reserve the slide
   and tell the user what to paste.
9. **Text must fit the placeholder.** Per-placeholder character budgets and the Stage 4.5 fit check live in
   `references/layout-and-fit.md`. Never shrink a font, never set a font family, never truncate to fit.

## Workflow

Run these five stages in order. Announce nothing; just do the work and surface the gates.

### Stage 1: Discovery

Read `references/intake.md` and run it. Parse any brief the user already gave, ask only the gaps, and
close with the one-paragraph session profile echo for confirmation.

Use the AskUserQuestion tool, in the three calls `intake.md` defines: call 1 is session type, platforms,
**deck language**, and duration; call 2 is audience, dbt/Fivetran fluency, Fivetran source, and vertical;
call 3 is only the follow-ups that apply. Four questions per call, four options per question, recommended
option first. Target under 60 seconds of clicking.

The deck language is asked in call 1, always, and it changes Stage 2 as well as Stage 4: research the target
language first rather than translating at the end.

### Stage 2: Research, internal-first

Read `references/research-protocol.md` and follow the source hierarchy strictly: internal content before
docs, always.

Load the platform profile matching each confirmed platform from `references/platforms/`. If a platform isn't
one of the five profiles, use `references/platforms/_other-platform.md` to build an ad-hoc profile at run time.

**If more than one platform was selected**, read `references/multi-platform.md` before researching. One
platform carries the running example (the primary), and the others appear only as contrast. Research the
primary fully; for secondary platforms, research only the points that actually diverge (incremental
strategies, constraint enforcement, catalog/Iceberg support). Do not concatenate full profiles.

**If the deck language isn't English**, follow the target-language sourcing procedure in
`references/research-protocol.md`: find approved material already in that language, per block, before
translating anything. Track which blocks were reused, which came from localised docs, and which you
translated.

**Find the diagrams now, not at build time.** For the architecture anchor and any conceptual diagram, search
existing internal decks per the diagram procedure in `references/slide-library.md`. Knowing whether a diagram
exists changes the outline, because a reserved diagram slide is not a bullet slide.

Produce a research brief: key points, each with a resolved source link. Do not proceed with unresolved
platform-specific claims.

### Stage 3: Outline gate

Read `references/storytelling.md`, `references/session-recipes.md`, and `references/certifications.md`, plus
the "Out of scope" section of `references/brand-voice.md`: some features must not be built into a session at
all, and that constrains scoping, not just wording. Read `references/data-mesh.md` when the audience is
architects or tech leads, or the partner works across more than one data platform. Read
`references/wizard-and-state.md` when the session touches AI, developer productivity, low-code authoring, run
cost, or build efficiency; dbt Wizard CLI and dbt State can each carry a session on their own. Build the
outline as a table:

| # | Act | Layout | Title | Key message | Source |

Include the running example, chosen per `references/intake.md`, and show which act each slide belongs to.
Present it and wait. Accept redlines and revise the outline; never skip ahead to building.

### Stage 4: Build the deck

Read `references/slide-library.md` for the layout mapping and the diagram procedure, and
`references/layout-and-fit.md` for the placeholder budgets and visual rhythm rules. Then:

1. Duplicate the template (ID in `references/slide-library.md`) into a new file named
   `<Partner>: <Session type>, <YYYY-MM-DD>`.
2. Call `list_layouts` on the new copy and match layouts **by name**, not by hardcoded ID.
3. Delete the template's example slides.
4. Add slides against the matched layout IDs, filling placeholders within the character budgets in
   `references/layout-and-fit.md`. Delete placeholders you don't need rather than filling them.
5. Reuse or reserve the diagrams, per `references/slide-library.md`. Never substitute bullets for a diagram.
6. Write speaker notes for every slide, each opening with its bridge line. Notes carry the prose that
   doesn't fit on the slide; that is what they are for.

Apply `references/brand-voice.md` to all slide text and speaker notes.

**If the deck language isn't English**, read `references/languages.md` first and write in the target language
from the start; do not draft in English and translate. Product names, code, config keys, and official exam
names stay in English, and dbt stays lowercase in every language. Scale word budgets, and tell the user that a
native-speaker review is worth it before a high-stakes session.

For hackathons and workshops, also produce a facilitator run-of-show as a separate markdown file with
wall-clock timings, checkpoint gates, and fallbacks for a broken environment.

### Stage 4.5: Fit check

Run the fit check in `references/layout-and-fit.md` before Stage 5. `list_slides`, then `get_slide` on every
slide, and compare the text that is actually in each element against its budget. Rewrite every overflow.

This is the step whose absence produces text running over the layout, so it is not skippable and its result
is reported as a number, not as an adjective.

### Stage 5: Self-check

Verify before handing over, and report the result honestly rather than claiming success:

- Every substantive claim has a resolved source
- No invented connector names, customers, or logos
- Bridge lines read end to end as a coherent paragraph
- No product name appears before act 3
- The running example appears in every act from 2 onward
- Acts 3 and 4 within ~20% of each other in slide count, unless intake said otherwise
- Slide count matches the duration budget; timings sum to the stated length
- Brand rules applied; no placeholder text left behind, and unused placeholders deleted rather than filled
- **Fit check run on every slide**, with the count of slides checked and slides rewritten stated in the handover
- **No two Text heavy slides adjacent**, no more than two consecutive slides on one layout, and a visual or
  section break at least every fourth slide
- **The architecture anchor is a diagram**, either reused, embedded, or explicitly reserved for pasting, and
  never silently converted to bullets
- **The deck is in the language that was asked for**, with the target-language sourcing split reported

If a check fails, fix it or state plainly what's unresolved. Do not report a deck as ready when it isn't.

Finish by sharing the deck link, plus the run-of-show file for hackathons.

## Tools this skill uses

| Need | Tools |
|---|---|
| Internal content | Glean-style internal search connector |
| dbt product docs | dbt MCP `search_product_docs`, `get_product_doc_pages` |
| Fivetran docs | web fetch on `fivetran.com/docs` |
| Partner context | Notion, Google Drive, Salesforce, Slack connectors |
| Deck build | Google Slides connector: `duplicate`, `list_layouts`, `list_slides`, `add_slide`, `add_text`, `update_text`, `add_image`, `add_table`, `set_speaker_notes`, `delete_slide` |
| Diagram reuse | Google Slides `search`, `list_slides`, `get_slide` for existing internal diagrams; Drive `search_files` for exported images |
| Fit check | Google Slides `list_slides`, `get_slide` to read back what actually landed in each placeholder |

If the Google Slides connector isn't available, say so and stop; do not silently fall back to producing
a `.pptx`, since that loses the brand template. Offer the outline as a markdown file instead.

## References

- `references/intake.md`: discovery questions, skip logic, running-example assembly
- `references/storytelling.md`: five-act arc, bridge lines, continuity gates
- `references/slide-library.md`: slide blocks mapped to template layouts, template ID, diagram reuse procedure
- `references/layout-and-fit.md`: per-placeholder character budgets, the fit check, visual rhythm, prohibitions
- `references/session-recipes.md`: enablement and hackathon slide sequences
- `references/research-protocol.md`: source hierarchy, citation and verification rules
- `references/brand-voice.md`: naming and style rules, product naming currency, out-of-scope features
- `references/certifications.md`: both certifications and the partner portal (standard act 5 block)
- `references/data-mesh.md`: data mesh vs dbt Mesh, cross-platform Mesh via Iceberg catalogs
- `references/wizard-and-state.md`: dbt Wizard CLI and dbt State as standalone session subjects
- `references/pricing.md`: optional pricing block for dbt and Fivetran, with verification rules
- `references/lifecycle-and-migrations.md`: end-of-life dates and in-flight migrations, both sides
- `references/multi-platform.md`: session shapes and real divergences when a partner runs several platforms
- `references/languages.md`: building decks in French, Spanish, Italian, German, or Japanese
- `references/platforms/*.md`: per-platform narrative spine and doc lookup paths
